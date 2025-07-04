from transformers import pipeline

class LanguageDetector:
    def __init__(self):
        self.detector = pipeline("text-classification", model="papluca/xlm-roberta-base-language-detection")

    def detect_language(self, text):
        result = self.detector(text)
        return result[0]["label"]  # e.g., "en", "fr", "es", "ar"