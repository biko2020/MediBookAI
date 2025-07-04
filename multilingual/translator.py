from transformers import pipeline

class Translator:
    def __init__(self):
        self.translator = pipeline("translation", model="Helsinki-NLP/opus-mt-mul-en")

    def translate_to_english(self, text, source_lang):
        return self.translator(text, src=source_lang, tgt="en")[0]["translation_text"]

    def translate_from_english(self, text, target_lang):
        return self.translator(text, src="en", tgt=target_lang)[0]["translation_text"]