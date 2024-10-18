# ToDo List App

A simple ToDo List application built using **HTML**, **CSS**, **JavaScript** for the frontend and **Node.js**, **Express**, and **MongoDB** for the backend. This app allows users to create, edit, delete, and manage tasks with deadlines.

## Features

- Add tasks with deadlines
- Edit tasks and deadlines
- Mark tasks as completed
- Delete tasks
- Persist tasks in a MongoDB database
- Simple and intuitive UI

## Technologies Used

### Frontend
- **HTML**
- **CSS**
- **JavaScript**

### Backend
- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose** (for defining and managing database models)

## Getting Started

### Prerequisites

To run this project, you will need:

- **Node.js** (v22.6.0 or higher)
- **MongoDB** (You can use MongoDB Atlas or a local MongoDB server)
- **Git** (to clone the repository)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yonatandudai/ToDo-List-App.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd ToDo-List-App
   ```

3. **Install dependencies**:
   ```bash
   npm install -g nodemon
   ```

4. **Set up MongoDB**:
   - If you're using MongoDB Atlas, replace the connection string in the server code with your MongoDB URI.
   - For local MongoDB, ensure MongoDB is running locally and replace the URI with your local MongoDB connection string.

5. **Run the server**:
   ```bash
   nodemon server.js
   ```

6. **Open the app in the browser**:
   - Open your browser and navigate to `http://localhost:5000`.

## Usage

1. **Add a Task**:
   - Enter the task title and deadline in the input fields and click "Add Task".
  
2. **Edit a Task**:
   - Click the "Edit" button next to the task to enable editing. Once done, click "Save" to update the task.

3. **Delete a Task**:
   - Click the `×` button next to the task to delete it.

## Project Structure

```
.
├── controllers
│   └── taskController.js  # Controller for tasks
├── models
│   └── Task.js            # Mongoose model for tasks
├── routes
│   └── tasks.js           # Routes for tasks
├── public                 # Static assets folder
│   ├── images             # Static images folder
│   └── index.html         # Main HTML file
│   └── style.css          # CSS styles file
│   └── script.js          # Frontend JavaScript logic file
├── .env                   # Environment variables (e.g., MongoDB URI)
├── server.js              # Node.js/Express server code
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

## API Endpoints

- `GET /api/tasks` - Retrieve all tasks
- `POST /api/tasks` - Add a new task
- `PUT /api/tasks/:id` - Update a task (e.g., title or deadline)
- `DELETE /api/tasks/:id` - Delete a task

## Task Model (Task.js)

The `Task.js` file defines the schema for the task in MongoDB using Mongoose. It includes fields such as `title`, `deadline`, `completed`, and timestamps.

```javascript
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: false
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
```

## License

This project is licensed under the MIT License.

## Author

- **Yonatan Dudai** - [GitHub Profile](https://github.com/yonatandudai)
