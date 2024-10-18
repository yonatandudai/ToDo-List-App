const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const taskTitle = inputBox.value;
    const taskDeadline = document.getElementById("deadline").value;

    if (taskTitle === '') {
        alert("You have to write a task");
    } else {
        const task = {
            title: taskTitle,
            completed: false,
            deadline: taskDeadline // Include deadline in the task object
        };

        console.log("Task data being sent:", task); // Log the task data to verify it includes deadline

        fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(response => response.json())
        .then(data => {
            renderTask(data); // Render the task in the UI after it’s saved to the database
            inputBox.value = '';
            document.getElementById("deadline").value = ''; // Clear the deadline field
        })
        .catch(error => console.error('Error:', error));
    }
}

function renderTask(task) {
    console.log("Rendering Task:", task); // Log each task to confirm details

    // Create the main list item
    let li = document.createElement("li");
    li.dataset.id = task._id; // Assign unique ID for each task

    // Create the task content (title and deadline)
    let taskContent = createTaskContent(task);
    li.appendChild(taskContent);

    // Create the Edit, Save, and Delete buttons
    let { editBtn, saveBtn, deleteBtn } = createButtons();
    li.appendChild(editBtn);
    li.appendChild(saveBtn);
    li.appendChild(deleteBtn);

    // Add event listeners for editing, saving, and deleting
    editTask(editBtn, saveBtn, taskContent);
    saveTask(saveBtn, editBtn, taskContent, task);
    deleteTask(deleteBtn, li, task);

    // Apply the 'checked' class if the task is completed
    if (task.completed) {
        li.classList.add("checked");
    }

    listContainer.appendChild(li); // Append the task to the list container
    }


// Function to create the task content (title and deadline)
function createTaskContent(task) {
    let taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    let taskTitle = document.createElement("input");
    taskTitle.type = "text";
    taskTitle.value = task.title;
    taskTitle.disabled = true; // Disable input initially
    taskContent.appendChild(taskTitle);

    let taskDeadline = document.createElement("input");
    taskDeadline.type = "date";
    taskDeadline.value = task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : '';
    taskDeadline.disabled = true; // Disable input initially
    taskContent.appendChild(taskDeadline);

    return taskContent;
}

// Function to create the Edit, Save, and Delete buttons
function createButtons() {
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";

    let saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Save";
    saveBtn.style.display = "none"; // Initially hidden

    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00d7";

    return { editBtn, saveBtn, deleteBtn };
}

// Function to handle editing
function editTask(editBtn, saveBtn, taskContent) {
    let taskTitle = taskContent.querySelector("input[type='text']");
    let taskDeadline = taskContent.querySelector("input[type='date']");

    editBtn.addEventListener("click", () => {
        taskTitle.disabled = false; // Enable task title input
        taskDeadline.disabled = false; // Enable task deadline input
        taskTitle.focus(); // Focus on the title input for editing
        editBtn.style.display = "none"; // Hide Edit button
        saveBtn.style.display = "inline"; // Show Save button
    });
}

// Function to handle saving
function saveTask(saveBtn, editBtn, taskContent, task) {
    let taskTitle = taskContent.querySelector("input[type='text']");
    let taskDeadline = taskContent.querySelector("input[type='date']");

    saveBtn.addEventListener("click", () => {
        taskTitle.disabled = true; // Disable task title input
        taskDeadline.disabled = true; // Disable task deadline input
        editBtn.style.display = "inline"; // Show Edit button again
        saveBtn.style.display = "none"; // Hide Save button

        const updatedTask = {
            title: taskTitle.value,
            deadline: taskDeadline.value // Send the updated deadline
        };

        // Send PUT request to update the task
        fetch(`http://localhost:5000/api/tasks/${task._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Task updated:', data);
        })
        .catch(error => console.error('Error:', error));
    });
}

// Function to handle deleting
function deleteTask(deleteBtn, li, task) {
    deleteBtn.addEventListener("click", () => {
        fetch(`http://localhost:5000/api/tasks/${task._id}`, {
            method: 'DELETE',
        })
        .then(() => {
            li.remove(); // Remove the task from the UI
        })
        .catch(error => console.error('Error:', error));
    });
}


function loadTasks() {
    fetch('http://localhost:5000/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                renderTask(task);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Load tasks on page load
loadTasks();

// Combined event listener for toggling and deleting tasks
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        // Toggle task completion
        e.target.classList.toggle("checked");
        const taskId = e.target.dataset.id;
        const completed = e.target.classList.contains("checked");

        fetch(`http://localhost:5000/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: completed })
        })
        .catch(error => console.error('Error:', error));

    } else if (e.target.tagName === "SPAN") {
        // Delete task
        const taskElement = e.target.parentElement;
        const taskId = taskElement.dataset.id;
        console.log("Deleting Task ID:", taskId); // Confirm the ID format

        fetch(`http://localhost:5000/api/tasks/${taskId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                taskElement.remove(); // Remove from the DOM if delete succeeds
            } else {
                console.error("Failed to delete task:", response.statusText);
            }
        })
        .catch(error => console.error('Error:', error));
    }
}, false);

// Add task on Enter key press
inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents form submission or other default actions
        addTask(); // Calls the addTask function directly
    }
});
