import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/sonner';
import './App.css';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LearningSessionPage from './pages/LearningSessionPage';
import SubscriptionPage from './pages/SubscriptionPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        
                        {/* Protected Routes */}
                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/courses" element={
                            <ProtectedRoute>
                                <CoursesPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/course/:courseId" element={
                            <ProtectedRoute>
                                <CourseDetailPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/learn/:courseId/:level/:sessionNumber" element={
                            <ProtectedRoute>
                                <LearningSessionPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/subscription" element={
                            <ProtectedRoute>
                                <SubscriptionPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/payment/success" element={
                            <ProtectedRoute>
                                <PaymentSuccessPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/payment/cancel" element={
                            <ProtectedRoute>
                                <Navigate to="/subscription" replace />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin" element={
                            <ProtectedRoute>
                                <AdminPanel />
                            </ProtectedRoute>
                        } />
                        
                        {/* Fallback */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                    <Toaster position="top-right" richColors />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;