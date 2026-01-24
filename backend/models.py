from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    STUDENT = "student"
    ADMIN = "admin"

class SubscriptionType(str, Enum):
    INDIVIDUAL = "individual"
    ORGANIZATION = "organization"
    FREE = "free"

class PaymentMethod(str, Enum):
    STRIPE = "stripe"
    MPESA = "mpesa"
    PAYPAL = "paypal"

class PaymentStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    EXPIRED = "expired"

# User Models
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: UserRole = UserRole.STUDENT

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: str
    created_at: datetime
    subscription_type: SubscriptionType = SubscriptionType.FREE
    selected_courses: List[str] = []
    subscription_expires_at: Optional[datetime] = None

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: User

# Course Models
class Session(BaseModel):
    session_number: int
    title: str
    description: str
    duration_minutes: int = 30
    video_url: Optional[str] = None
    content: str

class Level(BaseModel):
    name: str
    sessions: List[Session]

class Course(BaseModel):
    id: str
    name: str
    slug: str
    description: str
    image_url: str
    accent_color: str
    levels: Dict[str, Level]
    
# Progress Models
class UserProgress(BaseModel):
    user_id: str
    course_id: str
    level: str
    session_number: int
    completed: bool = False
    completed_at: Optional[datetime] = None
    notes: str = ""

# AI Models
class ChatMessage(BaseModel):
    role: str
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class AIConversation(BaseModel):
    user_id: str
    course_id: str
    session_id: str
    messages: List[ChatMessage] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AudioFeedback(BaseModel):
    user_id: str
    course_id: str
    session_id: str
    audio_url: str
    transcription: str
    feedback: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Payment Models
class SubscriptionPlan(BaseModel):
    type: SubscriptionType
    price: float
    duration_days: int = 30
    max_courses: Optional[int] = None
    features: List[str]

class PaymentTransaction(BaseModel):
    user_id: str
    amount: float
    currency: str = "USD"
    payment_method: PaymentMethod
    payment_status: PaymentStatus = PaymentStatus.PENDING
    session_id: Optional[str] = None
    checkout_request_id: Optional[str] = None
    mpesa_receipt_number: Optional[str] = None
    subscription_type: SubscriptionType
    metadata: Dict[str, Any] = {}
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class StripeCheckoutRequest(BaseModel):
    subscription_type: SubscriptionType
    origin_url: str

class MpesaPaymentRequest(BaseModel):
    phone_number: str
    subscription_type: SubscriptionType