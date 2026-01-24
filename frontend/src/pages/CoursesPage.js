import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Headphones, ChevronLeft } from 'lucide-react';
import api from '../utils/api';

const CoursesPage = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await api.get('/courses');
                setCourses(res.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="min-h-screen bg-[#09090B]" data-testid="courses-page">
            <nav className="border-b border-white/10 backdrop-blur-lg sticky top-0 z-50 bg-[#09090B]/80">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard">
                            <Button variant="ghost" size="sm" data-testid="back-button">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back to Dashboard
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Headphones className="h-8 w-8 text-[#8B5CF6]" />
                            <span className="text-2xl font-bold">All Courses</span>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h1 className="text-5xl font-bold mb-4">Explore All Courses</h1>
                    <p className="text-xl text-zinc-400">Master your favorite instruments with structured learning paths</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="courses-grid">
                    {courses.map((course) => (
                        <Link key={course.id} to={`/course/${course.id}`} data-testid={`course-${course.id}`}>
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
                                    <div className="flex gap-2 text-sm text-zinc-500">
                                        <span>Free</span>
                                        <span>•</span>
                                        <span>Beginner</span>
                                        <span>•</span>
                                        <span>Intermediate</span>
                                        <span>•</span>
                                        <span>Advanced</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;