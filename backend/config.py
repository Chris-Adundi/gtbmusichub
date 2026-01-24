from pydantic_settings import BaseSettings
from functools import lru_cache
from pathlib import Path
from dotenv import load_dotenv
import os

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

class Settings(BaseSettings):
    mongo_url: str
    db_name: str
    cors_origins: str
    emergent_llm_key: str
    stripe_api_key: str
    mpesa_consumer_key: str = ""
    mpesa_consumer_secret: str = ""
    mpesa_passkey: str
    mpesa_shortcode: str
    mpesa_environment: str
    auth_url: str
    stk_push_url: str
    callback_url: str = ""
    paypal_client_id: str = ""
    paypal_client_secret: str = ""
    jwt_secret_key: str
    jwt_algorithm: str
    jwt_expiration_hours: int

    class Config:
        env_file = ".env"
        case_sensitive = False

@lru_cache()
def get_settings():
    return Settings(
        mongo_url=os.environ['MONGO_URL'],
        db_name=os.environ['DB_NAME'],
        cors_origins=os.environ.get('CORS_ORIGINS', '*'),
        emergent_llm_key=os.environ['EMERGENT_LLM_KEY'],
        stripe_api_key=os.environ['STRIPE_API_KEY'],
        mpesa_consumer_key=os.environ.get('MPESA_CONSUMER_KEY', ''),
        mpesa_consumer_secret=os.environ.get('MPESA_CONSUMER_SECRET', ''),
        mpesa_passkey=os.environ['MPESA_PASSKEY'],
        mpesa_shortcode=os.environ['MPESA_SHORTCODE'],
        mpesa_environment=os.environ['MPESA_ENVIRONMENT'],
        auth_url=os.environ['AUTH_URL'],
        stk_push_url=os.environ['STK_PUSH_URL'],
        callback_url=os.environ.get('CALLBACK_URL', ''),
        paypal_client_id=os.environ.get('PAYPAL_CLIENT_ID', ''),
        paypal_client_secret=os.environ.get('PAYPAL_CLIENT_SECRET', ''),
        jwt_secret_key=os.environ['JWT_SECRET_KEY'],
        jwt_algorithm=os.environ['JWT_ALGORITHM'],
        jwt_expiration_hours=int(os.environ['JWT_EXPIRATION_HOURS'])
    )