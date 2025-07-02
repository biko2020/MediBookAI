# MediBook AI
A voice-enabled multilingual AI agent for booking doctor appointments using open-source Small Language Models (SLMs). Built with privacy-first principles and designed to run on personal computers with minimal resource requirements.

## System Architecture

MediBookAI/
│
├── app/
│   ├── __init__.py
│   ├── cli.py
│   ├── config.py
│   ├── main.py
│   ├── static/
│   │   ├── script.js
│   │   └── style.css
│   └── templates/
│       └── index.html
│
├── core/
│   ├── __init__.py
│   ├── agent.py
│   ├── appointment.py
│   ├── conversation.py
│   ├── nlu.py
│   └── validators.py
│
├── data/
│   ├── bookings.json
│   ├── conversations.json
│   └── users.json
│
├── docs/
│   ├── api.md
│   ├── deployment.md
│   └── setup.md
│
├── integrations/
│   ├── __init__.py
│   ├── calendar.py
│   ├── healthcare_apis.py
│   └── notifications.py
│
├── models/
│   ├── model_manager.py
│   └── README.md
│
├── multilingual/
│   ├── __init__.py
│   ├── language_detector.py
│   ├── prompts/
│   │   ├── ar.json
│   │   ├── en.json
│   │   ├── es.json
│   │   └── fr.json
│   └── translator.py
│
├── security/
│   ├── __init__.py
│   ├── encryption.py
│   └── hipaa_compliance.py
│
├── tests/
│   ├── __init__.py
│   ├── test_core/
│   │   └── __init__.py
│   ├── test_integrations/
│   │   └── __init__.py
│   └── test_voice/
│       └── __init__.py
│
├── utils/
│   ├── __init__.py
│   ├── exceptions.py
│   ├── logging.py
│   ├── metrics.py
│   └── __init__.py
│
├── voice/
│   ├── __init__.py
│   ├── audio_utils.py
│   ├── recorder.py
│   ├── stt.py
│   └── tts.py
│
├── .env.example
├── .gitignore
├── README.md
├── requirements-dev.txt
├── requirements.txt
└── run.py

## Tech Stack
*   Python
*   Flask
*   HTML
*   CSS
*   JavaScript

### System Architecture
The system architecture consists of a Flask web application that serves a front-end implemented using HTML, CSS, and JavaScript. The front-end allows users to interact with the AI agent through a chat interface. The backend uses open-source Small Language Models (SLMs) for natural language understanding. The `app` directory contains the main application logic, including the Flask routes and the chat API endpoint. The `app/static` directory contains static files such as CSS and JavaScript. The `app/templates` directory contains HTML templates. The `core` directory likely contains the AI agent and conversation management logic. The `voice` directory handles voice input/output. The `integrations` directory connects to external services such as healthcare APIs, calendar, and notifications. The `multilingual` directory provides language support. The `data` directory stores application data. The `models` directory manages the AI models. The `tests` directory contains the test suite. The `docs` directory contains documentation. The `utils` directory provides utility functions. The `security` directory handles security aspects.

### NLP Techniques
The application uses open-source Small Language Models (SLMs) for natural language understanding. The NLP logic is likely implemented in the `core/nlu.py` file.

### Libraries and Tools
*   Flask
*   Other libraries specified in `requirements.txt` and `requirements-dev.txt`

## Front-end Implementation
The front-end is implemented using HTML, CSS, and JavaScript. It includes the following features:

*   Voice-enabled appointment booking
*   Multilingual support with language selection
*   Integration placeholders for healthcare APIs, calendar, and notifications

## Contact
For questions or contributions, please contact:

Repository: git@github.com:biko2020/MediBookAI.git
Email: aitoufkirbrahimab@gmail.com

## Running the Application

1.  **Install Flask:**

    ```bash
    pip install flask
    ```

2.  **Set the `FLASK_APP` environment variable:**

    ```bash
    export FLASK_APP=app
    ```

    (On Windows, use `set FLASK_APP=app`)

3.  **Run the app:**

    ```bash
    flask run
    ```

    or

    ```bash
    python -m flask run
    ```

4.  **Access the app in your browser:**

    Open your web browser and go to `http://localhost:5000/`.
