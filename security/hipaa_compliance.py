import logging

class HIPAACompliance:
    def __init__(self):
        logging.basicConfig(filename="hipaa_audit.log", level=logging.INFO)

    def log_access(self, user_id, data_accessed):
        logging.info(f"User {user_id} accessed data: {data_accessed}")