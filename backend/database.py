from motor.motor_asyncio import AsyncIOMotorClient
from config import get_settings
import logging

settings = get_settings()
logger = logging.getLogger(__name__)

class Database:
    client: AsyncIOMotorClient = None
    
db = Database()

async def connect_to_mongo():
    logger.info("Connecting to MongoDB...")
    db.client = AsyncIOMotorClient(settings.mongo_url)
    logger.info("Connected to MongoDB!")

async def close_mongo_connection():
    logger.info("Closing MongoDB connection...")
    db.client.close()
    logger.info("MongoDB connection closed!")

def get_database():
    return db.client[settings.db_name]