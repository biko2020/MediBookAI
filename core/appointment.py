import json
import os
from app.config import Config
from integrations.calendar import CalendarIntegration

class AppointmentManager:
    def __init__(self):
        self.bookings_file = os.path.join(Config.DATA_DIR, "bookings.json")
        self.calendar = CalendarIntegration()

    def prepare_form(self, entities):
        return {
            "action": "show_form",
            "data": entities
        }

    def book(self, data):
        booking = {
            "name": data.get("patientName"),
            "phone": data.get("patientPhone"),
            "email": data.get("patientEmail"),
            "specialty": data.get("specialty"),
            "date": data.get("preferredDate"),
            "time": data.get("preferredTime"),
            "symptoms": data.get("symptoms")
        }
        self.save_booking(booking)
        self.calendar.add_event(booking)
        return {"status": "success", "message": "Appointment booked!"}

    def save_booking(self, booking):
        bookings = []
        if os.path.exists(self.bookings_file):
            with open(self.bookings_file, "r") as f:
                bookings = json.load(f)
        bookings.append(booking)
        with open(self.bookings_file, "w") as f:
            json.dump(bookings, f, indent=2)