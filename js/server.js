const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Replace with your actual MongoDB connection string
const MONGO_URI = 'your_mongo_db_connection_string_here';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a schema and model for event links
const eventLinkSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /https:\/\/calendar\.google\.com\/event\?eid=.+/.test(v);
            },
            message: props => `${props.value} is not a valid Google Calendar event link!`
        },
    },
});

const EventLink = mongoose.model('EventLink', eventLinkSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/submit', async (req, res) => {
    try {
        const newEventLink = new EventLink({ link: req.body.link });
        await newEventLink.save();
        res.status(201).json({ success: true, message: 'Event link submitted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
