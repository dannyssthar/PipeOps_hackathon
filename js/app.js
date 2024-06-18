document.addEventListener('DOMContentLoaded', () => {
    // Simulate user data
    const user = {
        firstName: "Chibuzor",
        lastName: "Daniel"
    };

    // Update hero text with user's first name
    const heroNameElement = document.getElementById('hero-name');
    heroNameElement.textContent = `Hello, ${user.firstName}`;

    // Floating button click event
    const floatButton = document.querySelector('.float-button');
    floatButton.addEventListener('click', () => {
        window.location.href = 'HTML/live-chat.html';
    });
});
