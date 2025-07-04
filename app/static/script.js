document.addEventListener("DOMContentLoaded", () => {
    const voiceBtn = document.getElementById("voiceBtn");
    const stopBtn = document.getElementById("stopBtn");
    const sendBtn = document.getElementById("sendBtn");
    const textInput = document.getElementById("textInput");
    const chatContainer = document.getElementById("chatContainer");
    const appointmentForm = document.getElementById("appointmentForm");
    const bookBtn = document.getElementById("bookBtn");
    const langButtons = document.querySelectorAll(".lang-btn");
    let currentLang = "en";

    // Language selection
    langButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            langButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentLang = btn.dataset.lang;
        });
    });

    // Send message
    sendBtn.addEventListener("click", async () => {
        const message = textInput.value.trim();
        if (message) {
            addMessage("user", message);
            const response = await sendMessage(message);
            addMessage("assistant", response.response);
            if (response.action === "show_form") {
                appointmentForm.style.display = "block";
            }
        }
        textInput.value = "";
    });

    // Voice recording
    voiceBtn.addEventListener("click", () => {
        voiceBtn.style.display = "none";
        stopBtn.style.display = "inline-block";
        // Placeholder for WebRTC or audio recording
        setTimeout(() => {
            stopBtn.click();
        }, 5000);
    });

    stopBtn.addEventListener("click", () => {
        voiceBtn.style.display = "inline-block";
        stopBtn.style.display = "none";
        // Send recorded audio to /api/voice endpoint (to be implemented)
    });

    // Book appointment
    bookBtn.addEventListener("click", async () => {
        const data = {
            patientName: document.getElementById("patientName").value,
            patientPhone: document.getElementById("patientPhone").value,
            patientEmail: document.getElementById("patientEmail").value,
            specialty: document.getElementById("specialty").value,
            preferredDate: document.getElementById("preferredDate").value,
            preferredTime: document.getElementById("preferredTime").value,
            symptoms: document.getElementById("symptoms").value
        };
        const response = await bookAppointment(data);
        addMessage("assistant", response.message);
        appointmentForm.style.display = "none";
    });

    async function sendMessage(message) {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, language: currentLang })
        });
        return response.json();
    }

    async function bookAppointment(data) {
        const response = await fetch("/api/book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    function addMessage(sender, content) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = content;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});