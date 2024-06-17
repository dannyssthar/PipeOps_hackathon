document.addEventListener("DOMContentLoaded", function() {
    const liveChatButton = document.getElementById("liveChatButton");

    if (liveChatButton) {
        liveChatButton.addEventListener("click", function() {
            // Implement live chat functionality here
            alert("Live chat functionality will be implemented here.");
        });
    }

    const chatForm = document.getElementById("chat-form");
    if (chatForm) {
        chatForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const messageInput = document.getElementById("message");
            const messages = document.getElementById("messages");

            if (messageInput.value.trim() !== "") {
                const newMessage = document.createElement("li");
                newMessage.textContent = messageInput.value;
                messages.appendChild(newMessage);
                messageInput.value = "";
            }
        });
    }
});
