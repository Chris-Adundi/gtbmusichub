# GTB Music Hub - Comprehensive Music Learning Platform

## Overview

GTB Music Hub is a full-stack music learning platform that provides structured courses for 10 instruments, AI-powered real-time feedback, audio analysis, and multiple payment options. The platform is designed to take students from complete beginners to professional-level musicians.

## Features

### 🎵 10 Instrument Courses
- Piano
- Guitar
- Drums
- Saxophone
- Trumpet
- Violin
- Voice and Harmony
- Music Production
- Music Theory
- Sound Engineering

### 📚 Structured Learning Levels
Each course includes:
- **Free Mode**: 2 introductory sessions + 2 demo videos
- **Beginner**: 12 comprehensive sessions
- **Intermediate**: 16 advanced technique sessions
- **Advanced**: 20 professional mastery sessions

### 🤖 AI-Powered Features
- **Real-time Chat Assistant**: Ask questions during learning sessions
- **Audio Recording & Analysis**: Record yourself practicing and get AI-powered feedback
- **Performance Evaluation**: Transcription and personalized coaching tips
- **Contextual Guidance**: AI understands your course and session context

### 💳 Multiple Payment Options
- **Stripe**: Credit/Debit card payments (International)
- **M-Pesa**: Mobile money payments (Kenya)
- **PayPal**: PayPal account payments

### 📊 Subscription Plans
1. **Free**: Access to 2 free sessions per course across all 10 instruments
2. **Individual ($30/month)**: Choose 2 courses, access all levels with AI features
3. **Organization ($100/month)**: All 10 courses, all levels, perfect for schools/churches

### ✨ Additional Features
- Progress tracking across all courses
- Session completion markers
- User dashboard with course overview
- Responsive modern dark theme design
- Glass-morphism UI effects

## Tech Stack

### Backend
- **FastAPI**: High-performance async Python web framework
- **MongoDB**: NoSQL database with Motor async driver
- **JWT Authentication**: Secure token-based auth
- **OpenAI GPT-4o**: AI chat assistant
- **OpenAI Whisper**: Audio transcription
- **Emergent Integrations**: Unified LLM key system
- **Stripe**: Payment processing
- **M-Pesa Daraja API**: Mobile payments

### Frontend
- **React 19**: Latest React with hooks
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Shadcn UI**: Modern component library
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **Sonner**: Toast notifications
- **React Phone Input**: International phone number input
- **WaveSurfer.js**: Audio waveform visualization

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/{course_id}` - Get specific course details

### Progress
- `GET /api/progress/{course_id}` - Get user progress for a course
- `POST /api/progress` - Update session progress

### AI Features
- `POST /api/ai/chat` - Send message to AI instructor
- `POST /api/ai/analyze-audio` - Analyze recorded audio

### Payments
- `POST /api/payments/stripe/checkout` - Create Stripe checkout session
- `GET /api/payments/stripe/status/{session_id}` - Check payment status
- `POST /api/webhook/stripe` - Stripe webhook handler
- `POST /api/payments/mpesa/initiate` - Initiate M-Pesa payment
- `POST /api/webhook/mpesa` - M-Pesa callback handler

## M-Pesa Setup (IMPORTANT)

To enable M-Pesa payments, you need to:

1. **Get Safaricom Developer Account**: Visit https://developer.safaricom.co.ke and create an account
2. **Create App**: Create a new app and select "Lipa Na M-Pesa Online" API
3. **Get Credentials**: Note down your Consumer Key and Consumer Secret
4. **Update Backend .env**:
   ```
   MPESA_CONSUMER_KEY=your_actual_consumer_key
   MPESA_CONSUMER_SECRET=your_actual_consumer_secret
   CALLBACK_URL=https://your-domain.com/api/webhook/mpesa
   ```
5. **For Development**: Use ngrok to create HTTPS tunnel: `ngrok http 8001`
6. **Test**: Use test phone numbers provided by Safaricom for sandbox testing

## Subscription Flow

1. User registers (Free account by default)
2. User browses courses (can access 2 free sessions per course)
3. User clicks "Upgrade" to access paid content
4. User selects Individual ($30) or Organization ($100) plan
5. User chooses payment method (Stripe/M-Pesa/PayPal)
6. Payment processed and subscription activated
7. User gains access to all levels of selected courses

## AI Features Usage

### AI Chat Assistant
- Available during learning sessions
- Ask questions about the material
- Get practice tips and guidance
- Context-aware based on current course/session

### Audio Recording & Analysis
1. Click "Start Recording" during practice
2. Play your instrument or sing
3. Click "Stop Recording"
4. AI transcribes your performance
5. AI provides constructive feedback
6. Save feedback for future reference

## License

Copyright © 2025 GTB Music Hub. All rights reserved.

---

**Built with passion for music education** 🎵
