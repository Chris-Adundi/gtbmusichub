import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Headphones, ChevronLeft, Send, Mic, Square, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../utils/api';

const LearningSessionPage = () => {
    const { courseId, level, sessionNumber } = useParams();
    const { user } = useAuth();
    const [course, setCourse] = useState(null);
    const [session, setSession] = useState(null);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [audioFeedback, setAudioFeedback] = useState(null);
    const [aiTeaching, setAiTeaching] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [aiSpeaking, setAiSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentSection, setCurrentSection] = useState(0);
    const [lessonSections, setLessonSections] = useState([]);
    const [currentAudio, setCurrentAudio] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const chatEndRef = useRef(null);
    const audioPlayerRef = useRef(null);
    const currentUtteranceRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const courseRes = await api.get(`/courses/${courseId}`);
                setCourse(courseRes.data);
                const foundSession = courseRes.data.levels[level]?.sessions.find(
                    s => s.session_number === parseInt(sessionNumber)
                );
                setSession(foundSession);
                
                // Auto-start AI voice teaching
                if (foundSession) {
                    setTimeout(() => startVoiceLesson(foundSession), 1000);
                }
            } catch (error) {
                console.error('Error fetching course:', error);
                toast.error('Failed to load session');
            }
        };
        fetchData();
    }, [courseId, level, sessionNumber]);

    const cleanTextForSpeech = (text) => {
        // Remove all markdown formatting for clean speech
        return text
            .replace(/#{1,6}\s/g, '') // Remove hashtags
            .replace(/\*\*/g, '') // Remove bold markers
            .replace(/\*/g, '') // Remove italic markers
            .replace(/`/g, '') // Remove code markers
            .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
            .replace(/[-•]/g, '') // Remove bullet points
            .replace(/\n{3,}/g, '\n\n') // Max 2 line breaks
            .replace(/^\s+/gm, '') // Remove leading spaces
            .trim();
    };

    const startVoiceLesson = async (sessionData) => {
        setAiTeaching(true);
        toast.info('🎓 Your AI instructor is preparing your lesson...');
        
        try {
            const res = await api.post('/ai/start-lesson', {
                course_id: courseId,
                level: level,
                session_number: parseInt(sessionNumber)
            });
            
            // Display lesson in chat for reference
            const aiMsg = { 
                role: 'assistant', 
                content: res.data.lesson_text 
            };
            setChatHistory([aiMsg]);
            
            // Teach continuously without sections
            teachContinuously(res.data.lesson_text);
            
        } catch (error) {
            console.error('AI lesson start error:', error);
            toast.error('Failed to start lesson');
            setChatHistory([{
                role: 'assistant',
                content: 'Hello! I\'m having trouble starting the lesson, but I\'m here to help!'
            }]);
        } finally {
            setAiTeaching(false);
        }
    };

    const teachContinuously = (lessonText) => {
        const cleanText = cleanTextForSpeech(lessonText);
        
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.rate = 0.75; // Slow and clear
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            
            currentUtteranceRef.current = utterance;
            
            utterance.onstart = () => {
                setAiSpeaking(true);
                setIsPaused(false);
                toast.success('🎓 AI Teacher is now teaching. Use pause button anytime.');
            };
            
            utterance.onend = () => {
                setAiSpeaking(false);
                toast.success('✅ Lesson complete! Click microphone to ask questions.');
            };
            
            utterance.onerror = (e) => {
                setAiSpeaking(false);
                console.error('Speech error:', e);
                toast.error('Speech error - but you can read the text below');
            };
            
            window.speechSynthesis.speak(utterance);
        } else {
            toast.info('Voice not available - please read the lesson text below');
        }
    };

    const pauseTeaching = () => {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
            window.speechSynthesis.pause();
            setIsPaused(true);
            toast.info('⏸️ Lesson paused');
        }
    };

    const resumeTeaching = () => {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
            toast.success('▶️ Lesson resumed');
        }
    };

    const nextSection = () => {
        if (currentSection < lessonSections.length - 1) {
            const nextIdx = currentSection + 1;
            setCurrentSection(nextIdx);
            teachSection(lessonSections[nextIdx], nextIdx);
        }
    };

    const previousSection = () => {
        if (currentSection > 0) {
            const prevIdx = currentSection - 1;
            setCurrentSection(prevIdx);
            teachSection(lessonSections[prevIdx], prevIdx);
        }
    };

    const playAIVoice = (audioUrl, message) => {
        setAiSpeaking(true);
        const audio = new Audio(audioUrl);
        audioPlayerRef.current = audio;
        
        audio.onended = () => {
            setAiSpeaking(false);
            toast.success('✅ Lesson complete! Ask questions by clicking the microphone.');
        };
        
        audio.onerror = () => {
            setAiSpeaking(false);
            toast.error('Audio playback error');
        };
        
        audio.play();
        toast.success(message);
    };

    const startVoiceQuestion = async () => {
        if (aiSpeaking) {
            toast.info('Please wait for AI to finish speaking');
            return;
        }

        // Use browser's Web Speech API for recognition
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            
            recognition.onstart = () => {
                setIsListening(true);
                toast.success('🎤 Listening... Speak your question!');
            };
            
            recognition.onresult = async (event) => {
                const transcript = event.results[0][0].transcript;
                setIsListening(false);
                
                if (transcript && transcript.length > 3) {
                    await processTextQuestion(transcript);
                } else {
                    toast.error('Could not hear your question. Please try again.');
                }
            };
            
            recognition.onerror = (event) => {
                setIsListening(false);
                toast.error('Speech recognition error. Please try again.');
                console.error('Speech recognition error:', event.error);
            };
            
            recognition.onend = () => {
                setIsListening(false);
            };
            
            recognition.start();
        } else {
            toast.error('Voice recognition not supported in this browser. Try Chrome or Edge.');
        }
    };

    const stopVoiceQuestion = () => {
        // Not needed for Web Speech API
        setIsListening(false);
    };

    const processTextQuestion = async (question) => {
        try {
            // Add student question to chat
            const userMsg = { role: 'user', content: question };
            setChatHistory(prev => [...prev, userMsg]);
            toast.success(`You asked: "${question}"`);

            // Get AI text response
            const responseRes = await api.post('/ai/voice-response', {
                course_id: courseId,
                session_id: `${level}-${sessionNumber}`,
                question: question
            });

            const aiResponse = { role: 'assistant', content: responseRes.data.response };
            setChatHistory(prev => [...prev, aiResponse]);

            // Speak the response using browser speech
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(responseRes.data.response);
                utterance.rate = 0.9;
                utterance.pitch = 1.0;
                
                utterance.onstart = () => {
                    setAiSpeaking(true);
                    toast.success('🎓 AI is answering...');
                };
                
                utterance.onend = () => {
                    setAiSpeaking(false);
                    toast.success('✅ Answer complete! Ask another question anytime.');
                };
                
                window.speechSynthesis.speak(utterance);
            } else {
                toast.info('Voice not available - please read the answer below');
            }

        } catch (error) {
            console.error('Voice question error:', error);
            toast.error(error.response?.data?.detail || 'Failed to process question');
        }
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const userMsg = { role: 'user', content: message };
        setChatHistory(prev => [...prev, userMsg]);
        setMessage('');

        try {
            const res = await api.post('/ai/chat', {
                course_id: courseId,
                session_id: `${level}-${sessionNumber}`,
                message: message
            });
            
            const aiMsg = { role: 'assistant', content: res.data.response };
            setChatHistory(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error('AI chat error:', error);
            toast.error('Failed to get AI response');
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                await analyzeAudio(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            toast.success('Recording started');
        } catch (error) {
            console.error('Recording error:', error);
            toast.error('Failed to start recording');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            toast.info('Processing your recording...');
        }
    };

    const analyzeAudio = async (audioBlob) => {
        setIsAnalyzing(true);
        try {
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.webm');

            const res = await api.post('/ai/analyze-audio', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'course_id': courseId,
                    'session_id': `${level}-${sessionNumber}`
                }
            });

            setAudioFeedback(res.data);
            toast.success('Audio analyzed successfully!');
        } catch (error) {
            console.error('Audio analysis error:', error);
            toast.error('Failed to analyze audio');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const markComplete = async () => {
        try {
            await api.post('/progress', {
                course_id: courseId,
                level: level,
                session_number: parseInt(sessionNumber),
                completed: true
            });
            toast.success('Session marked as complete!');
        } catch (error) {
            console.error('Progress update error:', error);
        }
    };

    if (!course || !session) {
        return <div className="min-h-screen bg-[#09090B] flex items-center justify-center"><p>Loading...</p></div>;
    }

    return (
        <div className="min-h-screen bg-[#09090B]" data-testid="learning-session-page">
            <nav className="border-b border-white/10 backdrop-blur-lg sticky top-0 z-50 bg-[#09090B]/80">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to={`/course/${courseId}`}>
                            <Button variant="ghost" size="sm" data-testid="back-button">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back to Course
                            </Button>
                        </Link>
                    </div>
                    <Button onClick={markComplete} className="bg-[#8B5CF6] hover:bg-[#7C3AED]" data-testid="mark-complete-button">
                        Mark Complete
                    </Button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left: Session Content */}
                    <div data-testid="session-content">
                        <div className="glass-card p-8 rounded-xl mb-6">
                            <h1 className="text-3xl font-bold mb-4">{session.title}</h1>
                            <p className="text-zinc-400 mb-6">{session.description}</p>
                            
                            {session.video_url && (
                                <div className="aspect-video bg-zinc-900 rounded-lg mb-6 flex items-center justify-center">
                                    <p className="text-zinc-500">Video Player</p>
                                </div>
                            )}

                            <div className="prose prose-invert max-w-none">
                                <p className="text-zinc-300">{session.content}</p>
                            </div>
                        </div>

                        {/* Audio Recording */}
                        <div className="glass-card p-6 rounded-xl" data-testid="audio-recording-section">
                            <h3 className="text-xl font-semibold mb-4">Practice Recording</h3>
                            <p className="text-zinc-400 mb-4">Record yourself practicing and get AI-powered feedback</p>
                            
                            <div className="flex gap-4 mb-6">
                                {!isRecording ? (
                                    <Button 
                                        onClick={startRecording} 
                                        className="bg-red-600 hover:bg-red-700"
                                        disabled={isAnalyzing}
                                        data-testid="start-recording-button"
                                    >
                                        <Mic className="mr-2 h-4 w-4" />
                                        Start Recording
                                    </Button>
                                ) : (
                                    <Button 
                                        onClick={stopRecording} 
                                        className="bg-zinc-800 hover:bg-zinc-700"
                                        data-testid="stop-recording-button"
                                    >
                                        <Square className="mr-2 h-4 w-4" />
                                        Stop Recording
                                    </Button>
                                )}
                            </div>

                            {isAnalyzing && (
                                <div className="flex items-center gap-2 text-[#8B5CF6]">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Analyzing your performance...</span>
                                </div>
                            )}

                            {audioFeedback && (
                                <div className="bg-[#18181B] p-4 rounded-lg" data-testid="audio-feedback">
                                    <h4 className="font-semibold mb-2">AI Feedback:</h4>
                                    <p className="text-zinc-300 mb-3">{audioFeedback.feedback}</p>
                                    {audioFeedback.transcription && (
                                        <div className="text-sm text-zinc-500 border-t border-white/10 pt-2">
                                            <strong>Transcription:</strong> {audioFeedback.transcription}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: AI Voice Teacher */}
                    <div className="glass-card rounded-xl flex flex-col h-[600px]" data-testid="ai-assistant">
                        <div className="p-6 border-b border-white/10">
                            <h3 className="text-xl font-semibold">🎓 AI Voice Instructor</h3>
                            <p className="text-sm text-zinc-400">Listen and speak naturally</p>
                            
                            {/* Lesson Controls */}
                            <div className="mt-4 space-y-2">
                                {/* Status */}
                                {aiSpeaking && !isPaused && (
                                    <div className="p-3 bg-[#8B5CF6]/20 rounded-lg border border-[#8B5CF6] flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin text-[#8B5CF6]" />
                                            <span className="text-sm text-[#8B5CF6]">
                                                🔊 Teaching Section {currentSection + 1} of {lessonSections.length}
                                            </span>
                                        </div>
                                        <Button size="sm" onClick={pauseTeaching} className="bg-yellow-600 hover:bg-yellow-700" data-testid="pause-button">
                                            ⏸️ Pause
                                        </Button>
                                    </div>
                                )}
                                
                                {isPaused && (
                                    <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500 flex items-center justify-between">
                                        <span className="text-sm text-yellow-500">⏸️ Lesson paused</span>
                                        <Button size="sm" onClick={resumeTeaching} className="bg-[#8B5CF6] hover:bg-[#7C3AED]" data-testid="resume-button">
                                            ▶️ Resume
                                        </Button>
                                    </div>
                                )}
                                
                                {isListening && (
                                    <div className="p-3 bg-red-500/20 rounded-lg border border-red-500 flex items-center gap-2">
                                        <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm text-red-500">🎤 Listening to your question...</span>
                                    </div>
                                )}
                                
                                {!aiSpeaking && !isListening && !aiTeaching && lessonSections.length > 0 && (
                                    <div className="p-3 bg-green-500/20 rounded-lg border border-green-500">
                                        <span className="text-sm text-green-500">✅ Ready - Section {currentSection + 1} of {lessonSections.length}</span>
                                    </div>
                                )}
                                
                                {/* Section Navigation */}
                                {lessonSections.length > 1 && !aiTeaching && (
                                    <div className="flex gap-2">
                                        <Button 
                                            onClick={previousSection}
                                            disabled={currentSection === 0 || aiSpeaking}
                                            size="sm"
                                            variant="outline"
                                            className="flex-1"
                                            data-testid="previous-section-button"
                                        >
                                            ⬅️ Previous
                                        </Button>
                                        <Button 
                                            onClick={nextSection}
                                            disabled={currentSection >= lessonSections.length - 1 || aiSpeaking}
                                            size="sm"
                                            className="flex-1 bg-[#8B5CF6] hover:bg-[#7C3AED]"
                                            data-testid="next-section-button"
                                        >
                                            Next Section ➡️
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4" data-testid="chat-history">
                            {aiTeaching && (
                                <div className="flex justify-start">
                                    <div className="max-w-[80%] p-4 rounded-lg bg-[#18181B]">
                                        <div className="flex items-center gap-2 text-[#8B5CF6]">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span>Preparing your voice lesson...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {chatHistory.length === 0 && !aiTeaching ? (
                                <div className="text-center text-zinc-500 mt-12">
                                    <Mic className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                    <p>Loading your voice instructor...</p>
                                </div>
                            ) : (
                                chatHistory.map((msg, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        data-testid={`chat-message-${idx}`}
                                    >
                                        <div className={`max-w-[80%] p-4 rounded-lg ${
                                            msg.role === 'user' 
                                                ? 'bg-[#8B5CF6] text-white' 
                                                : 'bg-[#18181B] text-zinc-300'
                                        }`}>
                                            {msg.role === 'assistant' && (
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="h-2 w-2 bg-[#8B5CF6] rounded-full"></div>
                                                    <span className="text-xs text-[#8B5CF6]">AI Instructor</span>
                                                </div>
                                            )}
                                            {msg.content}
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="p-4 border-t border-white/10">
                            <div className="flex flex-col gap-3">
                                <p className="text-sm text-zinc-400 text-center">
                                    {isListening ? 'Speak now... (will auto-stop)' : 'Click microphone to ask question'}
                                </p>
                                <Button
                                    onClick={startVoiceQuestion}
                                    disabled={aiSpeaking || aiTeaching || isListening}
                                    className={`w-full h-20 text-lg ${
                                        isListening 
                                            ? 'bg-red-600 hover:bg-red-700' 
                                            : 'bg-[#8B5CF6] hover:bg-[#7C3AED]'
                                    }`}
                                    data-testid="voice-button"
                                >
                                    <Mic className={`mr-2 h-6 w-6 ${isListening ? 'animate-pulse' : ''}`} />
                                    {isListening ? 'Listening...' : 'Click to Ask Question'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningSessionPage;