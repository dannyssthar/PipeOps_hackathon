const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const chatRoutes = require('./routes/chat');
const scheduleRoutes = require('./routes/schedule');

app.use('/api/chat', chatRoutes);
app.use('/api/schedule', scheduleRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Theta Backend');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
