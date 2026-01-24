import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Headphones, ChevronLeft, Lock, Play } from 'lucide-react';
import api from '../utils/api';

const CourseDetailPage = () => {
    const { courseId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState('free');

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await api.get(`/courses/${courseId}`);
                setCourse(res.data);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };
        fetchCourse();
    }, [courseId]);

    const hasAccess = (level) => {
        // Admin has access to everything
        if (user?.role === 'admin') return true;
        
        if (level === 'free') return true;
        if (user?.subscription_type === 'organization') return true;
        if (user?.subscription_type === 'individual' && user.selected_courses?.includes(courseId)) return true;
        return false;
    };

    if (!course) {
        return <div className="min-h-screen bg-[#09090B] flex items-center justify-center"><p>Loading...</p></div>;
    }

    return (
        <div className="min-h-screen bg-[#09090B]" data-testid="course-detail-page">
            <nav className="border-b border-white/10 backdrop-blur-lg sticky top-0 z-50 bg-[#09090B]/80">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard">
                            <Button variant="ghost" size="sm" data-testid="back-button">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Headphones className="h-8 w-8 text-[#8B5CF6]" />
                            <span className="text-2xl font-bold">{course.name}</span>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Course Header */}
                <div className="mb-12 flex items-start gap-8" data-testid="course-header">
                    <img 
                        src={course.image_url} 
                        alt={course.name}
                        className="w-64 h-48 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                        <h1 className="text-5xl font-bold mb-4" style={{ color: course.accent_color }}>{course.name}</h1>
                        <p className="text-xl text-zinc-400 mb-6">{course.description}</p>
                    </div>
                </div>

                {/* Level Selector */}
                <div className="flex gap-4 mb-8" data-testid="level-selector">
                    {Object.keys(course.levels).map((level) => (
                        <Button
                            key={level}
                            onClick={() => setSelectedLevel(level)}
                            variant={selectedLevel === level ? 'default' : 'outline'}
                            className={selectedLevel === level ? 'bg-[#8B5CF6] hover:bg-[#7C3AED]' : 'border-white/20 hover:bg-white/5'}
                            data-testid={`level-${level}-button`}
                        >
                            {level === 'free' && 'Free'}
                            {level === 'beginner' && 'Beginner (12 sessions)'}
                            {level === 'intermediate' && 'Intermediate (16 sessions)'}
                            {level === 'advanced' && 'Advanced (20 sessions)'}
                            {!hasAccess(level) && <Lock className="ml-2 h-4 w-4" />}
                        </Button>
                    ))}
                </div>

                {/* Sessions List */}
                <div className="space-y-4" data-testid="sessions-list">
                    {course.levels[selectedLevel]?.sessions.map((session) => (
                        <div key={session.session_number} className="glass-card p-6 rounded-xl hover:border-[#8B5CF6]/50 transition-all" data-testid={`session-${session.session_number}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold mb-2">
                                        Session {session.session_number}: {session.title}
                                    </h3>
                                    <p className="text-zinc-400">{session.description}</p>
                                </div>
                                {hasAccess(selectedLevel) ? (
                                    <Link to={`/learn/${courseId}/${selectedLevel}/${session.session_number}`}>
                                        <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" data-testid={`start-session-${session.session_number}-button`}>
                                            <Play className="mr-2 h-4 w-4" />
                                            Start Session
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button variant="outline" className="border-white/20" disabled data-testid={`locked-session-${session.session_number}`}>
                                        <Lock className="mr-2 h-4 w-4" />
                                        Locked
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {!hasAccess(selectedLevel) && selectedLevel !== 'free' && (
                    <div className="glass-card p-8 rounded-xl mt-8 text-center border-[#8B5CF6]/30" data-testid="upgrade-prompt">
                        <h3 className="text-2xl font-semibold mb-2">Upgrade to access {selectedLevel} level</h3>
                        <p className="text-zinc-400 mb-6">Get full access to all sessions with AI-powered feedback</p>
                        <Link to="/subscription">
                            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" data-testid="upgrade-now-button">Upgrade Now</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseDetailPage;