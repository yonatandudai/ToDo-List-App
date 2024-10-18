require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api', taskRoutes);

// Connect to MongoDB (replace with your MongoDB URI)
console.log('MongoDB URI:', process.env.MONGO_URI); 
mongoose.connect(process.env.MY_MONGO_DB  , {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a simple route
app.get('/', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
