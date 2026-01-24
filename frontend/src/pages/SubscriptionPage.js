import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Headphones, ChevronLeft, Check, Loader2, CreditCard } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { toast } from 'sonner';
import api from '../utils/api';

const SubscriptionPage = () => {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('stripe');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const plans = [
        {
            id: 'individual',
            name: 'Individual',
            price: 30,
            features: [
                'Access to 2 courses of your choice',
                'All skill levels (Beginner to Advanced)',
                'AI-powered real-time feedback',
                'Audio analysis and coaching',
                'Progress tracking',
                'Monthly subscription'
            ]
        },
        {
            id: 'organization',
            name: 'Organization',
            price: 100,
            features: [
                'Access to all 10 courses',
                'All skill levels (Beginner to Advanced)',
                'AI-powered real-time feedback',
                'Audio analysis and coaching',
                'Progress tracking',
                'Perfect for churches, schools, groups'
            ]
        }
    ];

    const handleStripePayment = async () => {
        setLoading(true);
        try {
            const originUrl = window.location.origin;
            const res = await api.post('/payments/stripe/checkout', {
                subscription_type: selectedPlan,
                origin_url: originUrl
            });
            
            window.location.href = res.data.url;
        } catch (error) {
            console.error('Stripe payment error:', error);
            toast.error('Failed to create payment session');
            setLoading(false);
        }
    };

    const handleMpesaPayment = async () => {
        if (!phoneNumber || !phoneNumber.startsWith('254')) {
            toast.error('Please enter a valid Kenyan phone number');
            return;
        }

        setLoading(true);
        try {
            const res = await api.post('/payments/mpesa/initiate', {
                phone_number: phoneNumber,
                subscription_type: selectedPlan
            });
            
            toast.success('Payment prompt sent to your phone!');
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
        } catch (error) {
            console.error('M-Pesa payment error:', error);
            toast.error(error.response?.data?.detail || 'Failed to initiate M-Pesa payment');
        } finally {
            setLoading(false);
        }
    };

    const handlePayPalPayment = () => {
        toast.info('PayPal integration coming soon!');
    };

    const handlePayment = () => {
        if (paymentMethod === 'stripe') {
            handleStripePayment();
        } else if (paymentMethod === 'mpesa') {
            handleMpesaPayment();
        } else if (paymentMethod === 'paypal') {
            handlePayPalPayment();
        }
    };

    return (
        <div className="min-h-screen bg-[#09090B]" data-testid="subscription-page">
            <nav className="border-b border-white/10 backdrop-blur-lg sticky top-0 z-50 bg-[#09090B]/80">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard">
                            <Button variant="ghost" size="sm" data-testid="back-button">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4">Choose Your Plan</h1>
                    <p className="text-xl text-zinc-400">Unlock full access to structured music learning with AI guidance</p>
                </div>

                {/* Plan Selection */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12" data-testid="plan-selection">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan.id)}
                            className={`glass-card p-8 rounded-xl cursor-pointer transition-all ${
                                selectedPlan === plan.id ? 'border-[#8B5CF6] glow-border' : 'hover:border-white/20'
                            }`}
                            data-testid={`plan-${plan.id}`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                    <p className="text-4xl font-bold">${plan.price}<span className="text-lg text-zinc-400">/mo</span></p>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    selectedPlan === plan.id ? 'border-[#8B5CF6] bg-[#8B5CF6]' : 'border-white/20'
                                }`}>
                                    {selectedPlan === plan.id && <Check className="h-4 w-4 text-white" />}
                                </div>
                            </div>
                            <ul className="space-y-3">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-zinc-300">
                                        <Check className="h-5 w-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Payment Method Selection */}
                {selectedPlan && (
                    <div className="max-w-2xl mx-auto" data-testid="payment-method-section">
                        <div className="glass-card p-8 rounded-xl mb-8">
                            <h3 className="text-2xl font-semibold mb-6">Choose Payment Method</h3>
                            <div className="space-y-4 mb-6">
                                <div
                                    onClick={() => setPaymentMethod('stripe')}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                        paymentMethod === 'stripe' ? 'border-[#8B5CF6] bg-[#8B5CF6]/10' : 'border-white/20 hover:border-white/30'
                                    }`}
                                    data-testid="payment-method-stripe"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                            paymentMethod === 'stripe' ? 'border-[#8B5CF6] bg-[#8B5CF6]' : 'border-white/20'
                                        }`}>
                                            {paymentMethod === 'stripe' && <div className="w-2 h-2 bg-white rounded-full" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">Credit/Debit Card</p>
                                            <p className="text-sm text-zinc-400">Secure payment via Stripe</p>
                                        </div>
                                        <CreditCard className="h-6 w-6 text-zinc-400" />
                                    </div>
                                </div>

                                <div
                                    onClick={() => setPaymentMethod('mpesa')}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                        paymentMethod === 'mpesa' ? 'border-[#8B5CF6] bg-[#8B5CF6]/10' : 'border-white/20 hover:border-white/30'
                                    }`}
                                    data-testid="payment-method-mpesa"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                            paymentMethod === 'mpesa' ? 'border-[#8B5CF6] bg-[#8B5CF6]' : 'border-white/20'
                                        }`}>
                                            {paymentMethod === 'mpesa' && <div className="w-2 h-2 bg-white rounded-full" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">M-Pesa (Kenya)</p>
                                            <p className="text-sm text-zinc-400">Pay with M-Pesa mobile money</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    onClick={() => setPaymentMethod('paypal')}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                        paymentMethod === 'paypal' ? 'border-[#8B5CF6] bg-[#8B5CF6]/10' : 'border-white/20 hover:border-white/30'
                                    }`}
                                    data-testid="payment-method-paypal"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                            paymentMethod === 'paypal' ? 'border-[#8B5CF6] bg-[#8B5CF6]' : 'border-white/20'
                                        }`}>
                                            {paymentMethod === 'paypal' && <div className="w-2 h-2 bg-white rounded-full" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">PayPal</p>
                                            <p className="text-sm text-zinc-400">Pay with PayPal account</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {paymentMethod === 'mpesa' && (
                                <div className="mb-6" data-testid="mpesa-phone-input">
                                    <label className="block text-sm font-medium mb-2">Phone Number (254XXXXXXXXX)</label>
                                    <PhoneInput
                                        defaultCountry="KE"
                                        value={phoneNumber}
                                        onChange={setPhoneNumber}
                                        placeholder="Enter phone number"
                                        className="w-full"
                                    />
                                </div>
                            )}

                            <Button
                                onClick={handlePayment}
                                disabled={loading}
                                className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] h-12"
                                data-testid="proceed-payment-button"
                            >
                                {loading ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                                ) : (
                                    `Pay $${plans.find(p => p.id === selectedPlan)?.price} / month`
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubscriptionPage;