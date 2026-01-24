from emergentintegrations.llm.chat import LlmChat, UserMessage
from config import get_settings
import logging
import httpx
import base64

settings = get_settings()
logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        self.api_key = settings.emergent_llm_key
    
    async def create_chat_session(self, session_id: str, system_message: str):
        """Create a new AI chat session"""
        chat = LlmChat(
            api_key=self.api_key,
            session_id=session_id,
            system_message=system_message
        )
        chat.with_model("openai", "gpt-4o")
        return chat
    
    async def generate_lesson_audio(self, text: str) -> bytes:
        """Generate speech audio from text using OpenAI TTS"""
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(
                    'https://api.openai.com/v1/audio/speech',
                    headers={
                        'Authorization': f'Bearer {self.api_key}',
                        'Content-Type': 'application/json'
                    },
                    json={
                        'model': 'tts-1',
                        'voice': 'alloy',
                        'input': text
                    }
                )
                response.raise_for_status()
                return response.content
        except Exception as e:
            logger.error(f"TTS generation error: {str(e)}")
            return b""
    
    async def start_teaching_session(self, course: str, session_title: str, session_content: str) -> dict:
        """AI starts teaching the session proactively"""
        try:
            system_msg = f"""You are an expert music instructor teaching {course}. 

Your role is to deliver a comprehensive, well-structured 25-30 MINUTE LESSON.

CRITICAL FORMATTING RULES:
- Use clear section titles WITHOUT hashtags or markdown
- Write "SECTION ONE:" not "## Section 1"
- Write "Introduction:" not "# Introduction"
- Use numbers: "Point 1.", "Point 2." not "- Point 1"
- Write naturally as if SPEAKING, not writing markdown
- Use "First," "Second," "Next," not bullet points
- Write complete sentences that flow naturally

Teaching Structure (25-30 minutes of teaching):

INTRODUCTION (3-4 minutes)
- Warm welcome and what we'll cover today
- Why this topic is important
- What students will be able to do by the end

SECTION ONE: Foundation (5-6 minutes)
- Core concept explained in depth
- Real-world examples and applications
- Why this matters for musicians
- Connection to previous learning

SECTION TWO: Technique (6-7 minutes)
- Step-by-step breakdown
- Detailed explanation of each step
- Common mistakes and how to avoid them
- Tips from professional musicians

SECTION THREE: Practice Application (6-7 minutes)
- Specific exercises with clear instructions
- How to practice this at home
- Practice schedule recommendations
- What to focus on first

SECTION FOUR: Advanced Insights (4-5 minutes)
- Taking it to the next level
- Professional applications
- How masters use this technique
- Preparing for next session

CONCLUSION (2-3 minutes)
- Review key points
- Practice goals for the week
- Encouragement and motivation
- Preview of next session

Remember: Write as if you're SPEAKING to the student. No hashtags, no markdown, just natural teaching language."""

            chat = await self.create_chat_session(f"teaching_{course}_{session_title}", system_msg)
            
            prompt = f"""Today's Lesson: {session_title}

Session Overview:
{session_content[:800]}

Now deliver a comprehensive 25-30 MINUTE teaching lesson. 

Follow the structure exactly:
- Use clear section headings (write them out, no symbols)
- Write naturally as if speaking
- Include stories and examples
- Make smooth transitions between sections
- Be thorough and detailed
- Maintain enthusiasm throughout

Start teaching now. Remember: NO markdown symbols, write as if you're speaking out loud."""

            lesson_text = await self.send_message(chat, prompt)
            
            # No need for audio generation - using browser speech
            return {
                "lesson_text": lesson_text,
                "has_audio": False,
                "audio_data": b""
            }
            
        except Exception as e:
            logger.error(f"Teaching session error: {str(e)}")
            return {
                "lesson_text": "Welcome! Let's begin this session. Feel free to ask any questions!",
                "has_audio": False,
                "audio_data": b""
            }
    
    async def send_message(self, chat: LlmChat, message: str) -> str:
        """Send a message and get response"""
        try:
            user_message = UserMessage(text=message)
            response = await chat.send_message(user_message)
            return response
        except Exception as e:
            logger.error(f"AI chat error: {str(e)}")
            return "I apologize, but I'm having trouble responding right now. Please try again."
    
    async def transcribe_audio(self, audio_data: bytes, filename: str) -> str:
        """Transcribe audio using Whisper API"""
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                files = {
                    'file': (filename, audio_data, 'audio/webm')
                }
                data = {
                    'model': 'whisper-1'
                }
                headers = {
                    'Authorization': f'Bearer {self.api_key}'
                }
                
                response = await client.post(
                    'https://api.openai.com/v1/audio/transcriptions',
                    files=files,
                    data=data,
                    headers=headers
                )
                response.raise_for_status()
                result = response.json()
                return result.get('text', '')
        except Exception as e:
            logger.error(f"Audio transcription error: {str(e)}")
            return ""
    
    async def analyze_performance(self, transcription: str, course: str, session: str) -> str:
        """Analyze musical performance from transcription"""
        try:
            system_msg = f"You are a music instructor providing feedback on a student's practice session for {course} - {session}. Provide constructive, encouraging feedback."
            chat = await self.create_chat_session(f"feedback_{course}_{session}", system_msg)
            
            prompt = f"""The student just practiced and here's what I heard:
            
            {transcription}
            
            Please provide:
            1. What they did well
            2. Areas to improve
            3. Specific practice tips
            4. Encouragement
            
            Keep it concise, supportive, and actionable."""
            
            feedback = await self.send_message(chat, prompt)
            return feedback
        except Exception as e:
            logger.error(f"Performance analysis error: {str(e)}")
            return "Great job practicing! Keep up the good work and remember to focus on your technique."

ai_service = AIService()