document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation button actions
    document.querySelector('.signINbtn').addEventListener('click', function() {
        alert('Sign In clicked!');
    });

    document.querySelector('.signUPbtn').addEventListener('click', function() {
        alert('Sign Up clicked!');
    });
    
    // Handle floating chat button action
    document.querySelector('.float-button').addEventListener('click', function() {
        window.location.href = 'html/live-chat.html';
    });

    // Handle section buttons navigation
    document.querySelectorAll('.section button').forEach(function(button) {
        button.addEventListener('click', function() {
            const sectionId = button.parentElement.id;
            if (sectionId === 'schedule') {
                window.location.href = 'html/schedule.html';
            } else if (sectionId === 'live-chat') {
                window.location.href = 'html/live-chat.html';
            } else if (sectionId === 'about') {
                window.location.href = 'html/about.html';
            }
        });
    });
});
