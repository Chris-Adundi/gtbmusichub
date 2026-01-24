from fastapi import FastAPI, APIRouter, Depends, HTTPException, Header, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from database import connect_to_mongo, close_mongo_connection, get_database
from config import get_settings
from models import *
from auth_utils import hash_password, verify_password, create_access_token, decode_access_token
from ai_service import ai_service
from payment_service import payment_service, SUBSCRIPTION_PRICES
from courses_data import get_all_courses
import logging
from datetime import datetime, timedelta, timezone
from typing import Optional, List
import uuid

settings = get_settings()
logger = logging.getLogger(__name__)

app = FastAPI(title="GTB Music Hub API", version="1.0.0")
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=settings.cors_origins.split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get current user
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    db = get_database()
    user_data = await db.users.find_one({"email": payload.get("sub")}, {"_id": 0})
    if not user_data:
        raise HTTPException(status_code=401, detail="User not found")
    
    return User(**user_data)

# Auth Routes
@api_router.post("/auth/register", response_model=Token)
async def register(user_data: UserCreate):
    db = get_database()
    
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_dict = {
        "id": str(uuid.uuid4()),
        "email": user_data.email,
        "full_name": user_data.full_name,
        "role": user_data.role,
        "password_hash": hash_password(user_data.password),
        "created_at": datetime.now(timezone.utc),
        "subscription_type": SubscriptionType.FREE,
        "selected_courses": [],
        "subscription_expires_at": None
    }
    
    await db.users.insert_one(user_dict)
    
    user = User(
        id=user_dict["id"],
        email=user_dict["email"],
        full_name=user_dict["full_name"],
        role=user_dict["role"],
        created_at=user_dict["created_at"],
        subscription_type=user_dict["subscription_type"],
        selected_courses=user_dict["selected_courses"],
        subscription_expires_at=user_dict["subscription_expires_at"]
    )
    
    access_token = create_access_token({"sub": user.email})
    return Token(access_token=access_token, user=user)

@api_router.post("/auth/login", response_model=Token)
async def login(credentials: UserLogin):
    db = get_database()
    
    user_data = await db.users.find_one({"email": credentials.email})
    if not user_data or not verify_password(credentials.password, user_data["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    user = User(
        id=user_data["id"],
        email=user_data["email"],
        full_name=user_data["full_name"],
        role=user_data["role"],
        created_at=user_data["created_at"],
        subscription_type=user_data.get("subscription_type", SubscriptionType.FREE),
        selected_courses=user_data.get("selected_courses", []),
        subscription_expires_at=user_data.get("subscription_expires_at")
    )
    
    access_token = create_access_token({"sub": user.email})
    return Token(access_token=access_token, user=user)

@api_router.get("/auth/me", response_model=User)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user

# Course Routes
@api_router.get("/courses", response_model=List[Course])
async def get_courses():
    return get_all_courses()

@api_router.get("/courses/{course_id}", response_model=Course)
async def get_course(course_id: str):
    courses = get_all_courses()
    course = next((c for c in courses if c.id == course_id), None)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

# Progress Routes
@api_router.get("/progress/{course_id}")
async def get_progress(course_id: str, current_user: User = Depends(get_current_user)):
    db = get_database()
    progress_list = await db.user_progress.find(
        {"user_id": current_user.id, "course_id": course_id},
        {"_id": 0}
    ).to_list(1000)
    return progress_list

@api_router.post("/progress")
async def update_progress(progress: UserProgress, current_user: User = Depends(get_current_user)):
    db = get_database()
    progress.user_id = current_user.id
    progress_dict = progress.model_dump()
    
    await db.user_progress.update_one(
        {"user_id": progress.user_id, "course_id": progress.course_id, "level": progress.level, "session_number": progress.session_number},
        {"$set": progress_dict},
        upsert=True
    )
    return {"success": True}

# AI Routes
@api_router.post("/ai/start-lesson")
async def start_ai_lesson(
    request: dict,
    current_user: User = Depends(get_current_user)
):
    try:
        course_id = request.get("course_id")
        level = request.get("level")
        session_number = request.get("session_number")
        
        # Get the actual session content
        courses = get_all_courses()
        course = next((c for c in courses if c.id == course_id), None)
        
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")
        
        session = course.levels[level].sessions[session_number - 1]
        
        # AI teaches the session
        lesson = await ai_service.start_teaching_session(
            course.name,
            session.title,
            session.content
        )
        
        return {
            "lesson_text": lesson["lesson_text"],
            "has_audio": lesson["has_audio"],
            "session_title": session.title
        }
        
    except Exception as e:
        logger.error(f"Start lesson error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to start lesson")

@api_router.get("/ai/lesson-audio/{course_id}/{level}/{session_number}")
async def get_lesson_audio(
    course_id: str,
    level: str,
    session_number: int,
    current_user: User = Depends(get_current_user)
):
    try:
        # Get session content
        courses = get_all_courses()
        course = next((c for c in courses if c.id == course_id), None)
        session = course.levels[level].sessions[session_number - 1]
        
        # Generate audio
        lesson = await ai_service.start_teaching_session(
            course.name,
            session.title,
            session.content
        )
        
        from fastapi.responses import Response
        return Response(
            content=lesson["audio_data"],
            media_type="audio/mpeg",
            headers={"Content-Disposition": f"inline; filename=lesson.mp3"}
        )
        
    except Exception as e:
        logger.error(f"Audio generation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate audio")

@api_router.post("/ai/transcribe-question")
async def transcribe_voice_question(
    audio: UploadFile = File(...),
    course_id: str = Header(...),
    session_id: str = Header(...),
    current_user: User = Depends(get_current_user)
):
    try:
        audio_data = await audio.read()
        transcription = await ai_service.transcribe_audio(audio_data, audio.filename)
        
        return {"transcription": transcription}
    except Exception as e:
        logger.error(f"Voice transcription error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to transcribe voice")

@api_router.post("/ai/voice-response")
async def get_voice_response(
    request: dict,
    current_user: User = Depends(get_current_user)
):
    try:
        course_id = request.get("course_id")
        session_id = request.get("session_id")
        question = request.get("question")
        
        session_key = f"{current_user.id}_{course_id}_{session_id}"
        system_message = f"""You are an expert music instructor teaching {course_id}. 

A student just asked you a question DURING your lesson. Answer naturally as a teacher would:
- Acknowledge the question
- Provide a thorough, detailed answer
- Use examples and analogies
- Be encouraging
- Relate to what you're teaching
- Keep answer conversational (you're SPEAKING, not writing)

Answer length: 30-60 seconds of speech (conversational, not too long)."""
        
        chat = await ai_service.create_chat_session(session_key, system_message)
        response = await ai_service.send_message(chat, question)
        
        # Save to database
        db = get_database()
        await db.ai_conversations.update_one(
            {"user_id": current_user.id, "course_id": course_id, "session_id": session_id},
            {
                "$push": {
                    "messages": [
                        {"role": "user", "content": question, "timestamp": datetime.now(timezone.utc).isoformat(), "type": "voice"},
                        {"role": "assistant", "content": response, "timestamp": datetime.now(timezone.utc).isoformat(), "type": "voice"}
                    ]
                },
                "$setOnInsert": {"created_at": datetime.now(timezone.utc)}
            },
            upsert=True
        )
        
        return {"response": response}
    except Exception as e:
        logger.error(f"Voice response error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate response")

@api_router.post("/ai/speak-answer")
async def speak_answer(
    request: dict,
    current_user: User = Depends(get_current_user)
):
    try:
        text = request.get("text")
        audio_bytes = await ai_service.generate_lesson_audio(text)
        
        from fastapi.responses import Response
        return Response(
            content=audio_bytes,
            media_type="audio/mpeg",
            headers={"Content-Disposition": "inline; filename=answer.mp3"}
        )
    except Exception as e:
        logger.error(f"Speak answer error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate speech")

@api_router.post("/ai/chat")
async def chat_with_ai(
    request: dict,
    current_user: User = Depends(get_current_user)
):
    try:
        course_id = request.get("course_id")
        session_id = request.get("session_id")
        message = request.get("message")
        
        session_key = f"{current_user.id}_{course_id}_{session_id}"
        system_message = f"""You are an expert music instructor teaching {course_id}. 

Your role: Answer student questions during the lesson with patience and clarity.

Teaching approach:
- Give thorough, detailed explanations
- Use examples and analogies
- Break down complex concepts
- Encourage practice
- Relate to real music applications
- Be supportive and motivating

When students ask questions, expand beyond just answering - TEACH the concept deeply."""
        
        chat = await ai_service.create_chat_session(session_key, system_message)
        response = await ai_service.send_message(chat, message)
        
        # Save conversation
        db = get_database()
        await db.ai_conversations.update_one(
            {"user_id": current_user.id, "course_id": course_id, "session_id": session_id},
            {
                "$push": {
                    "messages": [
                        {"role": "user", "content": message, "timestamp": datetime.now(timezone.utc).isoformat()},
                        {"role": "assistant", "content": response, "timestamp": datetime.now(timezone.utc).isoformat()}
                    ]
                },
                "$setOnInsert": {"created_at": datetime.now(timezone.utc)}
            },
            upsert=True
        )
        
        return {"response": response}
    except Exception as e:
        logger.error(f"AI chat error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get AI response")

@api_router.post("/ai/analyze-audio")
async def analyze_audio(
    audio: UploadFile = File(...),
    course_id: str = Header(...),
    session_id: str = Header(...),
    current_user: User = Depends(get_current_user)
):
    try:
        audio_data = await audio.read()
        
        # Transcribe audio
        transcription = await ai_service.transcribe_audio(audio_data, audio.filename)
        
        # Get feedback
        feedback = await ai_service.analyze_performance(transcription, course_id, session_id)
        
        # Save feedback
        db = get_database()
        feedback_doc = {
            "user_id": current_user.id,
            "course_id": course_id,
            "session_id": session_id,
            "audio_url": "",
            "transcription": transcription,
            "feedback": feedback,
            "created_at": datetime.now(timezone.utc)
        }
        await db.audio_feedback.insert_one(feedback_doc)
        
        return {"transcription": transcription, "feedback": feedback}
    except Exception as e:
        logger.error(f"Audio analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to analyze audio")

# Payment Routes
@api_router.post("/payments/stripe/checkout")
async def create_stripe_checkout(
    request: StripeCheckoutRequest,
    current_user: User = Depends(get_current_user)
):
    try:
        session = await payment_service.create_stripe_checkout(
            request.subscription_type,
            request.origin_url
        )
        
        # Create payment transaction record
        db = get_database()
        transaction = {
            "user_id": current_user.id,
            "amount": SUBSCRIPTION_PRICES[request.subscription_type],
            "currency": "USD",
            "payment_method": PaymentMethod.STRIPE,
            "payment_status": PaymentStatus.PENDING,
            "session_id": session.session_id,
            "subscription_type": request.subscription_type,
            "metadata": {},
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        }
        await db.payment_transactions.insert_one(transaction)
        
        return {"url": session.url, "session_id": session.session_id}
    except Exception as e:
        logger.error(f"Stripe checkout error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create checkout session")

@api_router.get("/payments/stripe/status/{session_id}")
async def get_stripe_status(
    session_id: str,
    current_user: User = Depends(get_current_user)
):
    try:
        status = await payment_service.get_stripe_checkout_status(session_id)
        
        # Update transaction in database
        db = get_database()
        transaction = await db.payment_transactions.find_one({"session_id": session_id})
        
        if transaction and status.payment_status == "paid" and transaction["payment_status"] != "completed":
            # Update subscription
            expires_at = datetime.now(timezone.utc) + timedelta(days=30)
            await db.users.update_one(
                {"id": current_user.id},
                {
                    "$set": {
                        "subscription_type": transaction["subscription_type"],
                        "subscription_expires_at": expires_at
                    }
                }
            )
            
            # Update transaction status
            await db.payment_transactions.update_one(
                {"session_id": session_id},
                {
                    "$set": {
                        "payment_status": PaymentStatus.COMPLETED,
                        "updated_at": datetime.now(timezone.utc)
                    }
                }
            )
        
        return status
    except Exception as e:
        logger.error(f"Stripe status check error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to check payment status")

@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    try:
        body = await request.body()
        signature = request.headers.get("Stripe-Signature")
        
        webhook_response = await payment_service.handle_stripe_webhook(body, signature)
        return {"success": True}
    except Exception as e:
        logger.error(f"Stripe webhook error: {str(e)}")
        return {"success": False}

@api_router.post("/payments/mpesa/initiate")
async def initiate_mpesa_payment(
    request: MpesaPaymentRequest,
    current_user: User = Depends(get_current_user)
):
    try:
        amount = SUBSCRIPTION_PRICES[request.subscription_type]
        account_ref = f"GTB{current_user.id[:8]}"
        
        response = await payment_service.initiate_mpesa_payment(
            request.phone_number,
            amount,
            account_ref
        )
        
        if response.get("ResponseCode") != "0":
            raise HTTPException(status_code=400, detail=response.get("ResponseDescription"))
        
        # Create payment transaction record
        db = get_database()
        transaction = {
            "user_id": current_user.id,
            "amount": amount,
            "currency": "KES",
            "payment_method": PaymentMethod.MPESA,
            "payment_status": PaymentStatus.PENDING,
            "checkout_request_id": response.get("CheckoutRequestID"),
            "subscription_type": request.subscription_type,
            "metadata": {"phone_number": request.phone_number},
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        }
        await db.payment_transactions.insert_one(transaction)
        
        return {
            "success": True,
            "message": "Payment prompt sent to your phone",
            "checkout_request_id": response.get("CheckoutRequestID")
        }
    except Exception as e:
        logger.error(f"M-Pesa payment error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to initiate M-Pesa payment")

@api_router.post("/webhook/mpesa")
async def mpesa_callback(request: Request):
    try:
        body = await request.json()
        callback_data = body.get("Body", {}).get("stkCallback", {})
        checkout_request_id = callback_data.get("CheckoutRequestID")
        result_code = callback_data.get("ResultCode")
        
        db = get_database()
        update_data = {
            "payment_status": PaymentStatus.COMPLETED if result_code == 0 else PaymentStatus.FAILED,
            "updated_at": datetime.now(timezone.utc)
        }
        
        if result_code == 0:
            metadata = callback_data.get("CallbackMetadata", {}).get("Item", [])
            for item in metadata:
                if item.get("Name") == "MpesaReceiptNumber":
                    update_data["mpesa_receipt_number"] = item.get("Value")
            
            # Get transaction and update user subscription
            transaction = await db.payment_transactions.find_one({"checkout_request_id": checkout_request_id})
            if transaction:
                expires_at = datetime.now(timezone.utc) + timedelta(days=30)
                await db.users.update_one(
                    {"id": transaction["user_id"]},
                    {
                        "$set": {
                            "subscription_type": transaction["subscription_type"],
                            "subscription_expires_at": expires_at
                        }
                    }
                )
        
        await db.payment_transactions.update_one(
            {"checkout_request_id": checkout_request_id},
            {"$set": update_data}
        )
        
        return {"ResultCode": 0, "ResultDesc": "Accepted"}
    except Exception as e:
        logger.error(f"M-Pesa callback error: {str(e)}")
        return {"ResultCode": 1, "ResultDesc": str(e)}

# Subscription Routes
@api_router.post("/subscription/select-courses")
async def select_courses(
    request: dict,
    current_user: User = Depends(get_current_user)
):
    selected_courses = request.get("course_ids", [])
    
    if current_user.subscription_type == SubscriptionType.INDIVIDUAL and len(selected_courses) > 2:
        raise HTTPException(status_code=400, detail="Individual plan allows only 2 courses")
    
    db = get_database()
    await db.users.update_one(
        {"id": current_user.id},
        {"$set": {"selected_courses": selected_courses}}
    )
    
    return {"success": True, "selected_courses": selected_courses}

# Include router
app.include_router(api_router)

# Startup and shutdown events
@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()
    logger.info("GTB Music Hub API started")

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()
    logger.info("GTB Music Hub API stopped")

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "GTB Music Hub API"}

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)