document.addEventListener('DOMContentLoaded', () => {
    // Handle Appointment Form Submission
    const appointmentForm = document.getElementById('appointment-form');
    appointmentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const time = document.getElementById('time').value;

        const appointmentData = {
            patientId: '12345', // Replace with actual patient ID
            doctorId: '67890', // Replace with actual doctor ID
            time: new Date(time),
            status: 'scheduled'
        };

        const response = await fetch('/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentData),
        });

        if (response.ok) {
            alert('Appointment scheduled successfully!');
        } else {
            alert('Failed to schedule appointment.');
        }
    });

    // Handle Health Data Form Submission
    const healthDataForm = document.getElementById('health-data-form');
    healthDataForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const temperature = document.getElementById('temperature').value;
        const bloodPressure = document.getElementById('bloodPressure').value;
        const heartRate = document.getElementById('heartRate').value;

        const healthData = {
            patientId: '12345', // Replace with actual patient ID
            vitals: {
                temperature: parseFloat(temperature),
                bloodPressure: bloodPressure,
                heartRate: parseInt(heartRate, 10),
            },
        };

        const response = await fetch('/health-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(healthData),
        });

        if (response.ok) {
            alert('Health data submitted successfully!');
        } else {
            alert('Failed to submit health data.');
        }
    });

    // Socket.io Chat Functionality
    const socket = io();
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message');
    const messagesList = document.getElementById('messages');

    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = messageInput.value;
        socket.emit('chat message', message);
        messageInput.value = '';
    });

    socket.on('chat message', (msg) => {
        const li = document.createElement('li');
        li.textContent = msg;
        messagesList.appendChild(li);
    });

    // Optimize Schedule Functionality
    appointmentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const timeInput = document.getElementById('time').value;
        const doctorId = 1; // Hardcoded for simplicity
        const patientPreference = new Date(timeInput).getHours();

        try {
            const response = await fetch('http://127.0.0.1:5000/optimize-schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    doctor_id: doctorId,
                    patient_preference: patientPreference
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            alert(`Suggested appointment time: ${result.suggested_time}`);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    });
});
