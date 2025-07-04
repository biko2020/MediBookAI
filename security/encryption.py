from cryptography.fernet import Fernet
import os

class DataEncryptor:
    def __init__(self):
        key = os.getenv("ENCRYPTION_KEY", Fernet.generate_key())
        self.cipher = Fernet(key)

    def encrypt(self, data):
        return self.cipher.encrypt(data.encode())

    def decrypt(self, encrypted_data):
        return self.cipher.decrypt(encrypted_data).decode()