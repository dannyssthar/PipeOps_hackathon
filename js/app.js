document.addEventListener("DOMContentLoaded", function() {
    const profileIcon = document.getElementById('profileIcon');
    const helloText = document.getElementById('helloText');

    // Simulate fetching user data from Google
    const user = {
        firstName: "Chibuzor",
        initials: "CD"
    };

    if (profileIcon) {
        profileIcon.textContent = user.initials;
    }

    if (helloText) {
        helloText.textContent = `Hello, ${user.firstName}`;
    }

    // Floating button animation
    const floatingButton = document.querySelector('.floating-button');
    if (floatingButton) {
        floatingButton.addEventListener('click', () => {
            // Open live chat
            window.location.href = "live-chat.html";
        });
    }

    // Handle form submission
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(appointmentForm);
            const data = {
                doctor_id: formData.get('doctor_id'),
                patient_preference: formData.get('patient_preference')
            };

            try {
                const response = await fetch('/optimize-schedule', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                if (response.ok) {
                    alert(`Suggested time slot: ${result.suggested_time}`);
                } else {
                    alert(`Error: ${result.error}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while scheduling the appointment.');
            }
        });
    }
});
