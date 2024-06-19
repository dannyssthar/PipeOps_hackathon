document.addEventListener('DOMContentLoaded', function() {
    // Live chat functionality
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    function appendMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'user-message' : 'bot-message';
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendButton.addEventListener('click', async function() {
        const message = chatInput.value.trim();
        if (message) {
            appendMessage(message, true);
            chatInput.value = '';

            try {
                const response = await fetch('http://localhost:3000/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message })
                });
                const data = await response.json();
                appendMessage(data.reply, false);
            } catch (error) {
                console.error('Error:', error);
                appendMessage('Failed to get response from server.', false);
            }
        }
    });

    // Schedule appointment functionality
    const scheduleButton = document.querySelector('.signUPbtn');
    scheduleButton.addEventListener('click', async function() {
        const date = new Date().toISOString().split('T')[0]; // Just for example
        const time = '10:00';

        try {
            const response = await fetch('http://localhost:3000/api/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date, time })
            });
            const data = await response.json();
            alert(`Appointment scheduled on ${data.date} at ${data.time}`);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to schedule appointment.');
        }
    });
});
