document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get the event link from the input
    var eventLink = document.getElementById('eventLink').value;
    
    // Display the submitted link
    var submittedLinkSection = document.getElementById('submittedLink');
    var eventLinkDisplay = document.getElementById('eventLinkDisplay');
    
    eventLinkDisplay.href = eventLink;
    eventLinkDisplay.textContent = eventLink;
    
    submittedLinkSection.style.display = 'block';
});
