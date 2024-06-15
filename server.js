const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/telehealth', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schemas and models
const AppointmentSchema = new mongoose.Schema({
  patientId: String,
  doctorId: String,
  time: Date,
  status: String,
});

const HealthDataSchema = new mongoose.Schema({
  patientId: String,
  vitals: {
    temperature: Number,
    bloodPressure: String,
    heartRate: Number,
  },
  timestamp: { type: Date, default: Date.now },
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
const HealthData = mongoose.model('HealthData', HealthDataSchema);

// Serve static files
app.use(express.static(path.join(__dirname, 'project')));

// API endpoints
app.post('/appointments', async (req, res) => {
  const appointment = new Appointment(req.body);
  await appointment.save();
  res.status(201).send(appointment);
});

app.post('/health-data', async (req, res) => {
  const healthData = new HealthData(req.body);
  await healthData.save();
  res.status(201).send(healthData);
});

app.get('/health-data/:patientId', async (req, res) => {
  const healthData = await HealthData.find({ patientId: req.params.patientId });
  res.status(200).send(healthData);
});

// Socket.io setup
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
