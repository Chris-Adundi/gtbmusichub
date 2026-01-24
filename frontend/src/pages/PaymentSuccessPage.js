import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../utils/api';

const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const sessionId = searchParams.get('session_id');
    const [status, setStatus] = React.useState('loading');

    useEffect(() => {
        const checkPaymentStatus = async () => {
            if (!sessionId) {
                setStatus('error');
                return;
            }

            let attempts = 0;
            const maxAttempts = 5;
            const interval = setInterval(async () => {
                try {
                    const res = await api.get(`/payments/stripe/status/${sessionId}`);
                    
                    if (res.data.payment_status === 'paid') {
                        setStatus('success');
                        toast.success('Payment successful! Your subscription is now active.');
                        clearInterval(interval);
                    } else if (attempts >= maxAttempts) {
                        setStatus('pending');
                        clearInterval(interval);
                    }
                    attempts++;
                } catch (error) {
                    console.error('Payment status check error:', error);
                    if (attempts >= maxAttempts) {
                        setStatus('error');
                        clearInterval(interval);
                    }
                    attempts++;
                }
            }, 2000);

            return () => clearInterval(interval);
        };

        checkPaymentStatus();
    }, [sessionId]);

    return (
        <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-6" data-testid="payment-success-page">
            <div className="text-center max-w-md">
                {status === 'loading' && (
                    <>
                        <Loader2 className="h-16 w-16 text-[#8B5CF6] mx-auto mb-6 animate-spin" />
                        <h1 className="text-3xl font-bold mb-2">Processing Payment...</h1>
                        <p className="text-zinc-400">Please wait while we confirm your payment</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                        <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
                        <p className="text-zinc-400 mb-8">Your subscription is now active. Start learning today!</p>
                        <Button onClick={() => navigate('/dashboard')} className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
                            Go to Dashboard
                        </Button>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <h1 className="text-3xl font-bold mb-2">Payment Error</h1>
                        <p className="text-zinc-400 mb-8">Something went wrong. Please contact support.</p>
                        <Button onClick={() => navigate('/subscription')} className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
                            Try Again
                        </Button>
                    </>
                )}

                {status === 'pending' && (
                    <>
                        <h1 className="text-3xl font-bold mb-2">Payment Pending</h1>
                        <p className="text-zinc-400 mb-8">Your payment is being processed. Check back shortly.</p>
                        <Button onClick={() => navigate('/dashboard')} className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
                            Go to Dashboard
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccessPage;