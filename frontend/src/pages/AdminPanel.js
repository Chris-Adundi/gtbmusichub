import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Headphones, ChevronLeft, Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../utils/api';

const AdminPanel = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState('free');
    const [editingSession, setEditingSession] = useState(null);
    const [sessionData, setSessionData] = useState({
        title: '',
        description: '',
        content: '',
        video_url: '',
        duration_minutes: 30
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await api.get('/courses');
            setCourses(res.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleSessionEdit = (course, level, session) => {
        setSelectedCourse(course);
        setSelectedLevel(level);
        setEditingSession(session);
        setSessionData({
            title: session.title,
            description: session.description,
            content: session.content,
            video_url: session.video_url || '',
            duration_minutes: session.duration_minutes
        });
    };

    const handleSave = () => {
        toast.info('Content editing will be implemented in backend');
        console.log('Save session:', sessionData);
        // TODO: Implement save endpoint
    };

    return (
        <div className="min-h-screen bg-[#09090B]" data-testid="admin-panel">
            <nav className="border-b border-white/10 backdrop-blur-lg sticky top-0 z-50 bg-[#09090B]/80">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard">
                            <Button variant="ghost" size="sm">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back to Dashboard
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Headphones className="h-8 w-8 text-[#8B5CF6]" />
                            <span className="text-2xl font-bold">Admin Panel</span>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Course List */}
                    <div className="glass-card p-6 rounded-xl">
                        <h2 className="text-2xl font-bold mb-4">Courses</h2>
                        <div className="space-y-2">
                            {courses.map((course) => (
                                <div
                                    key={course.id}
                                    onClick={() => {
                                        setSelectedCourse(course);
                                        setEditingSession(null);
                                    }}
                                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                                        selectedCourse?.id === course.id
                                            ? 'bg-[#8B5CF6]/20 border border-[#8B5CF6]'
                                            : 'hover:bg-white/5 border border-transparent'
                                    }`}
                                >
                                    <p className="font-semibold" style={{ color: course.accent_color }}>
                                        {course.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Level & Session List */}
                    {selectedCourse && (
                        <div className="glass-card p-6 rounded-xl">
                            <h2 className="text-2xl font-bold mb-4">{selectedCourse.name} Sessions</h2>
                            
                            <div className="flex gap-2 mb-6 flex-wrap">
                                {Object.keys(selectedCourse.levels).map((level) => (
                                    <Button
                                        key={level}
                                        size="sm"
                                        variant={selectedLevel === level ? 'default' : 'outline'}
                                        onClick={() => setSelectedLevel(level)}
                                        className={selectedLevel === level ? 'bg-[#8B5CF6]' : ''}
                                    >
                                        {level}
                                    </Button>
                                ))}
                            </div>

                            <div className="space-y-2 max-h-[600px] overflow-y-auto">
                                {selectedCourse.levels[selectedLevel]?.sessions.map((session) => (
                                    <div
                                        key={session.session_number}
                                        onClick={() => handleSessionEdit(selectedCourse, selectedLevel, session)}
                                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                                            editingSession?.session_number === session.session_number
                                                ? 'bg-[#8B5CF6]/20 border border-[#8B5CF6]'
                                                : 'hover:bg-white/5 border border-white/10'
                                        }`}
                                    >
                                        <p className="font-semibold text-sm">
                                            Session {session.session_number}: {session.title}
                                        </p>
                                        <p className="text-xs text-zinc-400 mt-1">
                                            {session.description}
                                        </p>
                                        {session.video_url && (
                                            <p className="text-xs text-[#8B5CF6] mt-1">📹 Video attached</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Session Editor */}
                    {editingSession && (
                        <div className="glass-card p-6 rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold">Edit Session {editingSession.session_number}</h2>
                                <Button onClick={handleSave} className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
                                    <Save className="mr-2 h-4 w-4" />
                                    Save
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Title</label>
                                    <Input
                                        value={sessionData.title}
                                        onChange={(e) => setSessionData({...sessionData, title: e.target.value})}
                                        className="bg-[#09090B] border-white/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Description</label>
                                    <Input
                                        value={sessionData.description}
                                        onChange={(e) => setSessionData({...sessionData, description: e.target.value})}
                                        className="bg-[#09090B] border-white/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">YouTube Video URL</label>
                                    <Input
                                        value={sessionData.video_url}
                                        onChange={(e) => setSessionData({...sessionData, video_url: e.target.value})}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        className="bg-[#09090B] border-white/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                                    <Input
                                        type="number"
                                        value={sessionData.duration_minutes}
                                        onChange={(e) => setSessionData({...sessionData, duration_minutes: parseInt(e.target.value)})}
                                        className="bg-[#09090B] border-white/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Content (Markdown supported)</label>
                                    <Textarea
                                        value={sessionData.content}
                                        onChange={(e) => setSessionData({...sessionData, content: e.target.value})}
                                        rows={15}
                                        className="bg-[#09090B] border-white/10 font-mono text-sm"
                                    />
                                </div>

                                <div className="bg-[#18181B] p-4 rounded-lg">
                                    <p className="text-sm text-zinc-400 mb-2">Content Preview:</p>
                                    <div className="prose prose-invert prose-sm max-w-none">
                                        <pre className="whitespace-pre-wrap text-xs">{sessionData.content}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Instructions when nothing selected */}
                    {!selectedCourse && (
                        <div className="col-span-2 flex items-center justify-center h-[400px]">
                            <div className="text-center text-zinc-500">
                                <Headphones className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                <p className="text-lg">Select a course to view and edit content</p>
                            </div>
                        </div>
                    )}

                    {selectedCourse && !editingSession && (
                        <div className="flex items-center justify-center h-[400px]">
                            <div className="text-center text-zinc-500">
                                <p className="text-lg">Select a session to edit</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-4 gap-6 mt-12">
                    <div className="glass-card p-6 rounded-xl">
                        <p className="text-zinc-400 text-sm">Total Courses</p>
                        <p className="text-3xl font-bold">{courses.length}</p>
                    </div>
                    <div className="glass-card p-6 rounded-xl">
                        <p className="text-zinc-400 text-sm">Total Sessions</p>
                        <p className="text-3xl font-bold">
                            {courses.reduce((acc, c) => {
                                return acc + Object.values(c.levels).reduce((sum, l) => sum + l.sessions.length, 0);
                            }, 0)}
                        </p>
                    </div>
                    <div className="glass-card p-6 rounded-xl">
                        <p className="text-zinc-400 text-sm">Videos Attached</p>
                        <p className="text-3xl font-bold">
                            {courses.reduce((acc, c) => {
                                return acc + Object.values(c.levels).reduce((sum, l) => 
                                    sum + l.sessions.filter(s => s.video_url).length, 0
                                );
                            }, 0)}
                        </p>
                    </div>
                    <div className="glass-card p-6 rounded-xl">
                        <p className="text-zinc-400 text-sm">Content Status</p>
                        <p className="text-lg font-bold text-yellow-500">📝 In Development</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;