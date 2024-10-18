const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');

const app = express();

const my_mongo_db = "mongodb+srv://yonatandudai:cQQqcOg5kOTVDhyC@todoappcluster.zfbvd.mongodb.net/?retryWrites=true&w=majority&appName=ToDoAppCluster"

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api', taskRoutes);

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect(my_mongo_db, {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a simple route
app.get('/', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
