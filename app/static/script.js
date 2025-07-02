// Application state
let currentLanguage = 'en';
let isRecording = false;
let conversationStep = 0;
let appointmentData = {};
let recognition;
let synthesis = window.speechSynthesis;

// Language translations
const translations = {
    en: {
        welcome: "Hello! I'm MediBook AI, your multilingual assistant for booking doctor appointments. How can I help you today?",
        status: "Ready to help you book an appointment",
        placeholder: "Or type your message here...",
        recording: "Listening...",
        processing: "Processing your request...",
        bookingConfirm: "Great! I'll help you book an appointment. Let me collect some information.",
        appointmentBooked: "Your appointment has been successfully booked! You'll receive a confirmation email shortly.",
        error: "I apologize, but I couldn't process that. Could you please try again?",
        noMicAccess: "Microphone access is required for voice functionality."
    },
    fr: {
        welcome: "Bonjour! Je suis MediBook AI, votre assistant multilingue pour prendre des rendez-vous médicaux. Comment puis-je vous aider aujourd'hui?",
        status: "Prêt à vous aider à prendre un rendez-vous",
        placeholder: "Ou tapez votre message ici...",
        recording: "J'écoute...",
        processing: "Traitement de votre demande...",
        bookingConfirm: "Parfait! Je vais vous aider à prendre un rendez-vous. Laissez-moi collecter quelques informations.",
        appointmentBooked: "Votre rendez-vous a été réservé avec succès! Vous recevrez un email de confirmation sous peu.",
        error: "Je m'excuse, mais je n'ai pas pu traiter cela. Pourriez-vous réessayer?",
        noMicAccess: "L'accès au microphone est requis pour la fonctionnalité vocale."
    },
    es: {
        welcome: "¡Hola! Soy MediBook AI, tu asistente multilingüe para reservar citas médicas. ¿Cómo puedo ayudarte hoy?",
        status: "Listo para ayudarte a reservar una cita",
        placeholder: "O escribe tu mensaje aquí...",
        recording: "Escuchando...",
        processing: "Procesando tu solicitud...",
        bookingConfirm: "¡Genial! Te ayudaré a reservar una cita. Déjame recopilar algo de información.",
        appointmentBooked: "¡Tu cita ha sido reservada exitosamente! Recibirás un email de confirmación pronto.",
        error: "Me disculpo, pero no pude procesar eso. ¿Podrías intentar de nuevo?",
        noMicAccess: "Se requiere acceso al micrófono para la funcionalidad de voz."
    },
    ar: {
        welcome: "مرحبا! أنا MediBook AI، مساعدك متعدد اللغات لحجز المواعيد الطبية. كيف يمكنني مساعدتك اليوم؟",
        status: "جاهز لمساعدتك في حجز موعد",
        placeholder: "أو اكتب رسالتك هنا...",
        recording: "أستمع...",
        processing: "معالجة طلبك...",
        bookingConfirm: "رائع! سأساعدك في حجز موعد. دعني أجمع بعض المعلومات.",
        appointmentBooked: "تم حجز موعدك بنجاح! ستتلقى رسالة تأكيد قريباً.",
        error: "أعتذر، لكنني لم أستطع معالجة ذلك. هل يمكنك المحاولة مرة أخرى؟",
        noMicAccess: "مطلوب الوصول إلى الميكروفون لوظيفة الصوت."
    }
};

// DOM elements
const chatContainer = document.getElementById('chatContainer');
const voiceBtn = document.getElementById('voiceBtn');
const stopBtn = document.getElementById('stopBtn');
const textInput = document.getElementById('textInput');
const sendBtn = document.getElementById('sendBtn');
const status = document.getElementById('status');
const appointmentForm = document.getElementById('appointmentForm');
const welcomeMessage = document.getElementById('welcomeMessage');
const langButtons = document.querySelectorAll('.lang-btn');

// Initialize speech recognition
function initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = getLanguageCode(currentLanguage);

        recognition.onresult = function(event) {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            if (finalTranscript) {
                processUserInput(finalTranscript.trim());
                stopRecording();
            }
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            updateStatus(translations[currentLanguage].error);
            stopRecording();
        };
    }
}

// Get language code for speech recognition
function getLanguageCode(lang) {
    const codes = {
        'en': 'en-US',
        'fr': 'fr-FR',
        'es': 'es-ES',
        'ar': 'ar-SA'
    };
    return codes[lang] || 'en-US';
}

// Language switching
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLanguage = btn.dataset.lang;
        updateLanguage();
        if (recognition) {
            recognition.lang = getLanguageCode(currentLanguage);
        }
    });
});

// Update UI language
function updateLanguage() {
    welcomeMessage.textContent = translations[currentLanguage].welcome;
    status.textContent = translations[currentLanguage].status;
    textInput.placeholder = translations[currentLanguage].placeholder;
    
    // Update chat container with new welcome message
    const messages = chatContainer.querySelectorAll('.message');
    if (messages.length === 1) {
        messages[0].querySelector('span').textContent = translations[currentLanguage].welcome;
    }
}

// Voice recording
voiceBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);

function startRecording() {
    if (!recognition) {
        alert(translations[currentLanguage].noMicAccess);
        return;
    }

    isRecording = true;
    voiceBtn.style.display = 'none';
    stopBtn.style.display = 'flex';
    voiceBtn.classList.add('recording');
    updateStatus(translations[currentLanguage].recording);

    try {
        recognition.start();
    } catch (error) {
        console.error('Error starting recognition:', error);
        stopRecording();
    }
}

function stopRecording() {
    if (recognition && isRecording) {
        recognition.stop();
    }
    isRecording = false;
    voiceBtn.style.display = 'flex';
    stopBtn.style.display = 'none';
    voiceBtn.classList.remove('recording');
    updateStatus(translations[currentLanguage].status);
}

// Text input
sendBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    if (text) {
        processUserInput(text);
        textInput.value = '';
    }
});

textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

// Process user input
function processUserInput(text) {
    addMessage(text, 'user');
    updateStatus(translations[currentLanguage].processing);

    // Simulate AI processing delay
    setTimeout(() => {
        const response = generateResponse(text);
        addMessage(response, 'assistant');
        speakText(response);
        updateStatus(translations[currentLanguage].status);
    }, 1000);
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<span>${text}</span>`;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Generate AI response (using backend API)
async function generateResponse(userInput) {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error:', error);
        return translations[currentLanguage].error;
    }
}

// Show appointment form
function showAppointmentForm() {
    appointmentForm.style.display = 'block';
    appointmentForm.scrollIntoView({ behavior: 'smooth' });
}

// Book appointment
document.getElementById('bookBtn').addEventListener('click', () => {
    const formData = {
        name: document.getElementById('patientName').value,
        phone: document.getElementById('patientPhone').value,
        email: document.getElementById('patientEmail').value,
        specialty: document.getElementById('specialty').value,
        date: document.getElementById('preferredDate').value,
        time: document.getElementById('preferredTime').value,
        symptoms: document.getElementById('symptoms').value
    };

    if (validateForm(formData)) {
        // Simulate booking process
        updateStatus('Booking your appointment...');
        setTimeout(() => {
            addMessage(translations[currentLanguage].appointmentBooked, 'assistant');
            speakText(translations[currentLanguage].appointmentBooked);
            appointmentForm.style.display = 'none';
            updateStatus(translations[currentLanguage].status);
        }, 2000);
    }
});

// Form validation
function validateForm(data) {
    const required = ['name', 'phone', 'email', 'specialty', 'date', 'time'];
    for (let field of required) {
        if (!data[field]) {
            alert(`Please fill in the ${field} field.`);
            return false;
        }
    }
    return true;
}

// Text-to-speech
function speakText(text) {
    if (synthesis) {
        synthesis.cancel(); // Stop any ongoing speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = getLanguageCode(currentLanguage);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        synthesis.speak(utterance);
    }
}

// Update status
function updateStatus(message) {
    status.textContent = message;
}

// Initialize the application
function init() {
    initializeSpeechRecognition();
    updateLanguage();
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('preferredDate').min = today;
}

// Start the application
init();
