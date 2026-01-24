import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Play, Users, Award, Mic, Headphones } from 'lucide-react';
import { Button } from '../components/ui/button';

const LandingPage = () => {
    const courses = [
        { name: 'Piano', image: 'https://images.unsplash.com/photo-1655018751074-90776f8fd6f0', color: '#3B82F6' },
        { name: 'Guitar', image: 'https://images.unsplash.com/photo-1619558041249-0523903712e1', color: '#EF4444' },
        { name: 'Drums', image: 'https://images.unsplash.com/photo-1571327073757-71d13c24de30', color: '#F59E0B' },
        { name: 'Saxophone', image: 'https://images.unsplash.com/photo-1751831091483-dfa578888e32', color: '#10B981' },
        { name: 'Trumpet', image: 'https://images.unsplash.com/photo-1615841192234-b773038eee7f', color: '#EC4899' },
        { name: 'Violin', image: 'https://images.unsplash.com/photo-1767998569881-003f30728849', color: '#6366F1' },
        { name: 'Voice & Harmony', image: 'https://images.unsplash.com/photo-1561446289-4112a4f79116', color: '#EC4899' },
        { name: 'Music Production', image: 'https://images.unsplash.com/photo-1598847873329-ed1608fb858b', color: '#10B981' },
        { name: 'Music Theory', image: 'https://images.unsplash.com/photo-1762008510357-90b8c10d53ea', color: '#6366F1' },
        { name: 'Sound Engineering', image: 'https://images.unsplash.com/photo-1615268734097-12b6b02ca8ff', color: '#F59E0B' },
    ];

    const features = [
        { icon: Music, title: 'Structured Learning', desc: 'From free basics to advanced mastery' },
        { icon: Mic, title: 'AI-Powered Feedback', desc: 'Real-time audio analysis and guidance' },
        { icon: Users, title: 'Expert Instruction', desc: 'Learn from professional musicians' },
        { icon: Award, title: 'Track Progress', desc: 'Monitor your musical journey' },
    ];

    return (
        <div className="min-h-screen bg-[#09090B]">
            {/* Navigation */}
            <nav className="border-b border-white/10 backdrop-blur-lg fixed w-full z-50 bg-[#09090B]/80" data-testid="main-navigation">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Headphones className="h-8 w-8 text-[#8B5CF6]" />
                        <span className="text-2xl font-bold">GTB Music Hub</span>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/login">
                            <Button variant="ghost" data-testid="login-button">Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" data-testid="get-started-button">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-24 px-6 relative" data-testid="hero-section">
                <div className="absolute inset-0 hero-glow" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                            Master Your Sound.<br />From Studio to Stage.
                        </h1>
                        <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
                            Learn music the right way with structured courses, AI-powered feedback, and real-time guidance from beginner to professional.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link to="/register">
                                <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] shadow-[0_0_20px_rgba(139,92,246,0.3)] h-12 px-8" data-testid="start-learning-button">
                                    <Play className="mr-2 h-5 w-5" />
                                    Start Learning Free
                                </Button>
                            </Link>
                            <Link to="/courses">
                                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/5 h-12 px-8" data-testid="explore-courses-button">
                                    Explore Courses
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 px-6 bg-[#18181B]/50" data-testid="features-section">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">Why GTB Music Hub?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div key={idx} className="glass-card p-6 rounded-xl hover:border-[#8B5CF6]/50 transition-all" data-testid={`feature-${idx}`}>
                                    <Icon className="h-12 w-12 text-[#8B5CF6] mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-zinc-400">{feature.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="py-24 px-6" data-testid="courses-section">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">Choose Your Instrument</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course, idx) => (
                            <Link key={idx} to="/register" className="group">
                                <div className="glass-card rounded-xl overflow-hidden hover:border-[#8B5CF6]/50 transition-all relative" data-testid={`course-${course.name.toLowerCase()}`}>
                                    <div className="aspect-video relative overflow-hidden">
                                        <img 
                                            src={course.image} 
                                            alt={course.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-semibold mb-2" style={{ color: course.color }}>{course.name}</h3>
                                        <p className="text-zinc-400">Free → Beginner → Advanced</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-24 px-6 bg-[#18181B]/50" data-testid="pricing-section">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">Simple, Transparent Pricing</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="glass-card p-8 rounded-xl" data-testid="pricing-free">
                            <h3 className="text-2xl font-bold mb-2">Free</h3>
                            <p className="text-4xl font-bold mb-4">$0<span className="text-lg text-zinc-400">/month</span></p>
                            <ul className="space-y-3 mb-6 text-zinc-300">
                                <li>✓ 2 sessions per course</li>
                                <li>✓ All 10 instruments</li>
                                <li>✓ Demo videos</li>
                                <li>✗ AI assistance</li>
                            </ul>
                            <Link to="/register">
                                <Button className="w-full" variant="outline">Start Free</Button>
                            </Link>
                        </div>
                        <div className="glass-card p-8 rounded-xl border-[#8B5CF6]/50 relative" data-testid="pricing-individual">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8B5CF6] text-white px-4 py-1 rounded-full text-sm">Most Popular</div>
                            <h3 className="text-2xl font-bold mb-2">Individual</h3>
                            <p className="text-4xl font-bold mb-4">$30<span className="text-lg text-zinc-400">/month</span></p>
                            <ul className="space-y-3 mb-6 text-zinc-300">
                                <li>✓ 2 courses of choice</li>
                                <li>✓ All skill levels</li>
                                <li>✓ AI-powered feedback</li>
                                <li>✓ Progress tracking</li>
                            </ul>
                            <Link to="/register">
                                <Button className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED]">Get Started</Button>
                            </Link>
                        </div>
                        <div className="glass-card p-8 rounded-xl" data-testid="pricing-organization">
                            <h3 className="text-2xl font-bold mb-2">Organization</h3>
                            <p className="text-4xl font-bold mb-4">$100<span className="text-lg text-zinc-400">/month</span></p>
                            <ul className="space-y-3 mb-6 text-zinc-300">
                                <li>✓ All 10 courses</li>
                                <li>✓ All skill levels</li>
                                <li>✓ AI-powered feedback</li>
                                <li>✓ Team management</li>
                            </ul>
                            <Link to="/register">
                                <Button className="w-full" variant="outline">Contact Us</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12 px-6" data-testid="footer">
                <div className="max-w-7xl mx-auto text-center text-zinc-400">
                    <p>&copy; 2025 GTB Music Hub. Master your sound from studio to stage.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;