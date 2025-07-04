import json
import os
from transformers import pipeline
from app.config import Config
import re

class NLUProcessor:
    def __init__(self):
        model_path = Config.MODEL_PATH
        try:
            self.model = pipeline(
                "text-classification",
                model=model_path,
                local_files_only=os.path.isdir(model_path),
                clean_up_tokenization_spaces=True
            )
        except Exception as e:
            raise Exception(f"Failed to load model: {e}")
        self.prompts = {}
        for lang in ["en", "fr", "es", "ar"]:
            try:
                with open(f"multilingual/prompts/{lang}.json", "r") as f:
                    self.prompts[lang] = json.load(f)
            except FileNotFoundError:
                raise FileNotFoundError(f"Prompt file for {lang} not found")

    def process(self, text):
        try:
            result = self.model(text)
            intent = result[0]["label"] if result else "unknown"
            entities = self.extract_entities(text)
            return intent, entities
        except Exception as e:
            return "error", {"error": stran(e)}

    def extract_entities(self, text):
        # Basic regex-based entity extraction
        entities = {"date": None, "time": None, "specialty": None}
        date_pattern = r"\b(\d{1,2}[/-]\d{1,2}[/-]\d{4})\b"
        time_pattern = r"\b(\d{1,2}:\d{2}\s*(?:AM|PM)?)\b"
        specialty_keywords = {
            "general": ["general", "family", "primary"],
            "cardiology": ["heart", "cardiology", "cardiologist"],
            "dermatology": ["skin", "dermatology", "dermatologist"],
            "orthopedics": ["bone", "orthopedics", "orthopedic"],
            "neurology": ["brain", "neurology", "neurologist"],
            "pediatrics": ["child", "pediatrics", "pediatrician"]
        }
        if date_match := re.search(date_pattern, text):
            entities["date"] = date_match.group(1)
        if time_match := re.search(time_pattern, text):
            entities["time"] = time_match.group(1)
        for specialty, keywords in specialty_keywords.items():
            if any(keyword.lower() in text.lower() for keyword in keywords):
                entities["specialty"] = specialty
        return entities

    def generate_response(self, intent, entities, lang):
        return self.prompts[lang].get(intent, "How can I assist you?")