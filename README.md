# MediBook AI
A voice-enabled multilingual AI agent for booking doctor appointments using open-source Small Language Models (SLMs). Built with privacy-first principles and designed to run on personal computers with minimal resource requirements.

MediBookAI/
│
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── config.py
│   └── cli.py               # Command-line interface
│
├── core/
│   ├── __init__.py
│   ├── agent.py
│   ├── nlu.py
│   ├── appointment.py
│   ├── conversation.py      # Conversation state management
│   └── validators.py        # Input validation logic
│
├── voice/
│   ├── __init__.py
│   ├── stt.py
│   ├── tts.py
│   ├── recorder.py
│   └── audio_utils.py       # Audio processing utilities
│
├── integrations/            # NEW: External service integrations
│   ├── __init__.py
│   ├── healthcare_apis.py   # Doctor booking APIs
│   ├── calendar.py          # Calendar integrations
│   └── notifications.py     # SMS/Email notifications
│
├── multilingual/            # NEW: Language support
│   ├── __init__.py
│   ├── translator.py        # Translation logic
│   ├── prompts/             # Language-specific prompts
│   │   ├── en.json
│   │   ├── fr.json
│   │   ├── es.json
│   │   └── ar.json
│   └── language_detector.py
│
├── data/
│   ├── bookings.json
│   ├── users.json           # User profiles
│   └── conversations.json   # Conversation history
│
├── models/
│   ├── README.md
│   └── model_manager.py     # Model loading and management
│
├── tests/                   # NEW: Test suite
│   ├── __init__.py
│   ├── test_core/
│   ├── test_voice/
│   └── test_integrations/
│
├── docs/                    # NEW: Documentation
│   ├── setup.md
│   ├── api.md
│   └── deployment.md
│
│
├── utils/
│   ├── __init__.py
│   ├── logging.py
│   ├── metrics.py
│   └── exceptions.py
│
├── security/
│   ├── __init__.py
│   ├── encryption.py
│   └── hipaa_compliance.py
│
├── requirements.txt
├── requirements-dev.txt     # NEW: Development dependencies
├── .env.example            # NEW: Environment variables template
├── README.md
└── run.py

## Front-end Implementation
The front-end is implemented using HTML, CSS, and JavaScript. It includes the following features:

*   Voice-enabled appointment booking
*   Multilingual support with language selection
*   Integration placeholders for healthcare APIs, calendar, and notifications

## Contact
For questions or contributions, please contact:

Repository: git@github.com:biko2020/MediBookAI.git
Email: aitoufkirbrahimab@gmail.com
