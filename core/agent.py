from core.nlu import NLUProcessor
from core.appointment import AppointmentManager
from multilingual.translator import Translator

class MediBookAgent:
    def __init__(self):
        self.nlu = NLUProcessor()
        self.appointment_manager = AppointmentManager()
        self.translator = Translator()

    def process_input(self, user_input, lang):
        # Translate input to English if not already
        if lang != "en":
            user_input = self.translator.translate_to_english(user_input, lang)
        intent, entities = self.nlu.process(user_input)
        if intent == "book_appointment":
            return self.appointment_manager.prepare_form(entities)
        return self.nlu.generate_response(intent, entities, lang)

    def book_appointment(self, data):
        return self.appointment_manager.book(data)