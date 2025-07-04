from flask import Flask, render_template, jsonify, request
from core.agent import MediBookAgent
import os
from multilingual.language_detector import LanguageDetector
language_detector = LanguageDetector()

app = Flask(__name__)
app.config.from_object("app.config.Config")
agent = MediBookAgent()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message", "")
    lang = language_detector.detect_language(user_input)
    response = agent.process_input(user_input, lang)
    return jsonify({"response": response, "language": lang})

@app.route("/api/book", methods=["POST"])
def book_appointment():
    data = request.json
    result = agent.book_appointment(data)
    return jsonify(result)
