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
  