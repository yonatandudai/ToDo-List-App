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
   npm install
   ```

4. **Set up MongoDB**:
   - If you're using MongoDB Atlas, replace the connection string in the server code with your MongoDB URI.
   - For local MongoDB, ensure MongoDB is running locally and replace the URI with your local MongoDB connection string.

5. **Run the server**:
   ```bash
   node server.js
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
├── index.html           # The main HTML file
├── style.css            # Styling for the frontend
├── script.js            # JavaScript for the frontend logic
├── server.js            # Node.js/Express server code
├── package.json         # Project metadata and dependencies
├── routes
│   └── tasks.js         # Backend routes for handling task-related operations
├── models
│   └── Task.js          # Mongoose model for tasks
└── README.md            # Project documentation
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
