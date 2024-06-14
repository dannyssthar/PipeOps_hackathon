// This is for Appointment Form Submission
document.getElementById('appointment-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const time = document.getElementById('time').value;
  const response = await fetch('http://localhost:5000/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ patientId: 'patient123', time, status: 'Scheduled' })
  });
  const data = await response.json();
  console.log(data);
});

//This is for Health Data Form Submission
document.getElementById('health-data-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const temperature = document.getElementById('temperature').value;
  const bloodPressure = document.getElementById('bloodPressure').value;
  const heartRate = document.getElementById('heartRate').value;
  const response = await fetch('http://localhost:5000/health-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ patientId: 'patient123', vitals: { temperature, bloodPressure, heartRate } })
  });
  const data = await response.json();
  console.log(data);
});

//This Initializes Socket.IO Client 
const socket = io('http://localhost:5000');

socket.on('chat message', (msg) => {
  const messageList = document.getElementById('messages');
  const newMessage = document.createElement('li');
  newMessage.textContent = msg;
  messageList.appendChild(newMessage);
});


document.getElementById('chat-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const message = document.getElementById('message').value;
  socket.emit('chat message', message);
  document.getElementById('message').value = '';
});
