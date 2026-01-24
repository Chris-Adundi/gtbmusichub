import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Headphones, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(email, password);
            toast.success('Welcome back!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-6" data-testid="login-page">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6">
                        <Headphones className="h-10 w-10 text-[#8B5CF6]" />
                        <span className="text-3xl font-bold">GTB Music Hub</span>
                    </Link>
                    <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-zinc-400">Continue your musical journey</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-card p-8 rounded-xl" data-testid="login-form">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="your@email.com"
                                className="bg-[#09090B] border-white/10 focus:border-[#8B5CF6]/50"
                                data-testid="email-input"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="bg-[#09090B] border-white/10 focus:border-[#8B5CF6]/50"
                                data-testid="password-input"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] h-11"
                            data-testid="submit-button"
                        >
                            {loading ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...</>
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </div>
                </form>

                <p className="text-center mt-6 text-zinc-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-[#8B5CF6] hover:underline" data-testid="register-link">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;