document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('calendar-container');

    document.getElementById('schedule-button').addEventListener('click', function() {
        toggleCalendar();
    });

    function toggleCalendar() {
        if (calendarContainer.style.display === 'none' || calendarContainer.style.display === '') {
            calendarContainer.style.display = 'block';
            if (!calendarContainer.dataset.initialized) {
                initializeCalendar();
                calendarContainer.dataset.initialized = 'true';
            }
        } else {
            calendarContainer.style.display = 'none';
        }
    }

    function initializeCalendar() {
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth'
        });
        calendar.render();
    }
});
