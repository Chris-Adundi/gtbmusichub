import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Headphones, Music, LogOut, CreditCard, User } from 'lucide-react';
import api from '../utils/api';

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [progress, setProgress] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesRes = await api.get('/courses');
                setCourses(coursesRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getAccessibleCourses = () => {
        if (user?.subscription_type === 'free') {
            return courses;
        } else if (user?.subscription_type === 'individual') {
            return courses.filter(c => user.selected_courses?.includes(c.id));
        } else if (user?.subscription_type === 'organization') {
            return courses;
        }
        return [];
    };

    const accessibleCourses = getAccessibleCourses();

    return (
        <div className="min-h-screen bg-[#09090B]" data-testid="dashboard-page">
            {/* Navigation */}
            <nav className="border-b border-white/10 backdrop-blur-lg sticky top-0 z-50 bg-[#09090B]/80" data-testid="dashboard-navigation">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Headphones className="h-8 w-8 text-[#8B5CF6]" />
                        <span className="text-2xl font-bold">GTB Music Hub</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {user?.role === 'admin' && (
                            <Link to="/admin">
                                <Button variant="ghost" size="sm" data-testid="admin-button">
                                    \ud83d\udd27 Admin Panel
                                </Button>
                            </Link>
                        )}
                        <Link to="/subscription">
                            <Button variant="ghost" size="sm" data-testid="subscription-button">
                                <CreditCard className="mr-2 h-4 w-4" />
                                {user?.subscription_type || 'Free'}
                            </Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={handleLogout} data-testid="logout-button">
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Welcome Section */}
                <div className="mb-12" data-testid="welcome-section">
                    <h1 className="text-5xl font-bold mb-2">Welcome back, {user?.full_name}!</h1>
                    <p className="text-xl text-zinc-400">Continue your musical journey</p>
                </div>

                {/* Subscription Notice */}
                {user?.subscription_type === 'free' && (
                    <div className="glass-card p-6 rounded-xl mb-12 border-[#8B5CF6]/30" data-testid="upgrade-notice">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Upgrade to unlock full access</h3>
                                <p className="text-zinc-400 mb-4">Get unlimited access to all sessions, AI feedback, and audio analysis</p>
                            </div>
                            <Link to="/subscription">
                                <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" data-testid="upgrade-button">Upgrade Now</Button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* My Courses */}
                <div className="mb-12" data-testid="my-courses-section">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold">My Courses</h2>
                        <Link to="/courses">
                            <Button variant="outline" className="border-white/20 hover:bg-white/5" data-testid="browse-all-button">
                                <Music className="mr-2 h-4 w-4" />
                                Browse All Courses
                            </Button>
                        </Link>
                    </div>

                    {accessibleCourses.length === 0 ? (
                        <div className="text-center py-12 glass-card rounded-xl" data-testid="no-courses-message">
                            <Music className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
                            <p className="text-xl text-zinc-400 mb-4">No courses selected yet</p>
                            <Link to="/courses">
                                <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]">Explore Courses</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {accessibleCourses.map((course) => (
                                <Link key={course.id} to={`/course/${course.id}`} data-testid={`course-card-${course.id}`}>
                                    <div className="glass-card rounded-xl overflow-hidden hover:border-[#8B5CF6]/50 transition-all group">
                                        <div className="aspect-video relative overflow-hidden">
                                            <img 
                                                src={course.image_url} 
                                                alt={course.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-2xl font-semibold mb-2" style={{ color: course.accent_color }}>
                                                {course.name}
                                            </h3>
                                            <p className="text-zinc-400 mb-4">{course.description}</p>
                                            <Button size="sm" variant="ghost" className="text-[#8B5CF6] hover:text-[#7C3AED] hover:bg-white/5">
                                                Continue Learning →
                                            </Button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;