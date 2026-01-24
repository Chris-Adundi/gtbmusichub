from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionResponse, CheckoutStatusResponse, CheckoutSessionRequest
from config import get_settings
import base64
import requests
import logging
from datetime import datetime
from models import SubscriptionType, PaymentMethod

settings = get_settings()
logger = logging.getLogger(__name__)

SUBSCRIPTION_PRICES = {
    SubscriptionType.INDIVIDUAL: 30.00,
    SubscriptionType.ORGANIZATION: 100.00
}

class PaymentService:
    def __init__(self):
        self.stripe_api_key = settings.stripe_api_key
    
    async def create_stripe_checkout(self, subscription_type: SubscriptionType, origin_url: str) -> CheckoutSessionResponse:
        """Create Stripe checkout session"""
        try:
            webhook_url = f"{origin_url}/api/webhook/stripe"
            stripe_checkout = StripeCheckout(api_key=self.stripe_api_key, webhook_url=webhook_url)
            
            amount = SUBSCRIPTION_PRICES[subscription_type]
            success_url = f"{origin_url}/payment/success?session_id={{{{CHECKOUT_SESSION_ID}}}}"
            cancel_url = f"{origin_url}/payment/cancel"
            
            checkout_request = CheckoutSessionRequest(
                amount=amount,
                currency="usd",
                success_url=success_url,
                cancel_url=cancel_url,
                metadata={
                    "subscription_type": subscription_type.value,
                    "source": "gtb_music_hub"
                }
            )
            
            session = await stripe_checkout.create_checkout_session(checkout_request)
            return session
        except Exception as e:
            logger.error(f"Stripe checkout error: {str(e)}")
            raise
    
    async def get_stripe_checkout_status(self, session_id: str) -> CheckoutStatusResponse:
        """Get Stripe checkout status"""
        try:
            stripe_checkout = StripeCheckout(api_key=self.stripe_api_key, webhook_url="")
            status = await stripe_checkout.get_checkout_status(session_id)
            return status
        except Exception as e:
            logger.error(f"Stripe status check error: {str(e)}")
            raise
    
    async def handle_stripe_webhook(self, body: bytes, signature: str):
        """Handle Stripe webhook"""
        try:
            stripe_checkout = StripeCheckout(api_key=self.stripe_api_key, webhook_url="")
            webhook_response = await stripe_checkout.handle_webhook(body, signature)
            return webhook_response
        except Exception as e:
            logger.error(f"Stripe webhook error: {str(e)}")
            raise
    
    async def initiate_mpesa_payment(self, phone_number: str, amount: float, account_reference: str) -> dict:
        """Initiate M-Pesa STK Push"""
        try:
            # Generate timestamp and password
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            password_string = f"{settings.mpesa_shortcode}{settings.mpesa_passkey}{timestamp}"
            password = base64.b64encode(password_string.encode()).decode()
            
            # Get access token
            access_token = await self._get_mpesa_token()
            
            headers = {
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "BusinessShortCode": settings.mpesa_shortcode,
                "Password": password,
                "Timestamp": timestamp,
                "TransactionType": "CustomerPayBillOnline",
                "Amount": int(amount),
                "PartyA": phone_number,
                "PartyB": settings.mpesa_shortcode,
                "PhoneNumber": phone_number,
                "CallBackURL": settings.callback_url,
                "AccountReference": account_reference[:12],
                "TransactionDesc": "GTB Music Hub"[:13]
            }
            
            response = requests.post(
                settings.stk_push_url,
                json=payload,
                headers=headers,
                timeout=30
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"M-Pesa payment error: {str(e)}")
            raise
    
    async def _get_mpesa_token(self) -> str:
        """Get M-Pesa OAuth access token"""
        auth_string = f"{settings.mpesa_consumer_key}:{settings.mpesa_consumer_secret}"
        encoded_auth = base64.b64encode(auth_string.encode()).decode()
        
        headers = {
            "Authorization": f"Basic {encoded_auth}"
        }
        
        response = requests.get(
            settings.auth_url,
            headers=headers,
            timeout=30
        )
        response.raise_for_status()
        return response.json().get("access_token")

payment_service = PaymentService()