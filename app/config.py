import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("FLASK_SECRET_KEY", "default-secret-key")
    FLASK_ENV = os.getenv("FLASK_ENV", "production")
    DATA_DIR = os.path.join(os.path.dirname(__file__), "../data")
    MODEL_PATH = os.getenv("MODEL_PATH", "./models/phi-3-mini")