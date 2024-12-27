async function fetchTasks() {
    try {
        const response = await fetch("https://todo-app-nu-ebon.vercel.app/tasks");
        if (!response.ok) {
            throw new Error(`Failed to fetch tasks: ${response.statusText}`);
        }

        const tasks = await response.json();
        const todoTaskUl = document.getElementById("list");
        todoTaskUl.innerHTML = ""; // Clear the existing list

        tasks.forEach((task) => {
            const todoTaskLi = createTaskElement(task);
            todoTaskUl.appendChild(todoTaskLi);

            // Add event listener directly to the created checkbox
            const roundCheckbox = todoTaskLi.querySelector(".roundCheckbox");
            const taskText = todoTaskLi.querySelector(".text");

            roundCheckbox.addEventListener("click", function () {
                // Toggle the 'checked' class
                roundCheckbox.classList.toggle("checked");
                taskText.classList.toggle("lineThrough");

                // Determine the completed status based on the presence of the 'checked' class
                const isChecked = roundCheckbox.classList.contains("checked");

                // Update the task with the new completed value
                updateTask(task.id, {
                    id: task.id,
                    title: task.title,
                    completed: isChecked // true if checked, false if not
                });
            });

            // Add event listener to the delete button
            const deleteBtn = todoTaskLi.querySelector(".delete");
            deleteBtn.addEventListener("click", function () {
                deleteTask(task.id);
            });

            // Update the total tasks count 
            let totalTasks = document.getElementById("totalTasks");
            totalTasks.innerText = document.getElementsByClassName("listItem").length;

        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

// Helper function to create a task list item
function createTaskElement(task) {
    const todoTaskLi = document.createElement("li");
    todoTaskLi.classList.add("listItem");
    todoTaskLi.setAttribute("draggable", "true"); // Make the task draggable
    todoTaskLi.innerHTML = `
        <input type="checkbox" id="checkbox${task.id}" class="checkbox">
        <label for="checkbox${task.id}" class="roundCheckbox ${task.completed ? 'checked' : ''}"></label>
        <p class="text ${task.completed ? 'lineThrough' : ''}">${task.title}</p>
        <img src="./images/icon-cross.svg" alt="cross" class="delete">`;

    // Add drag-and-drop events
    todoTaskLi.addEventListener("dragstart", () => {
        todoTaskLi.classList.add("dragging"); // Add a class while dragging
    });

    todoTaskLi.addEventListener("dragend", () => {
        todoTaskLi.classList.remove("dragging"); // Remove the class when dragging ends
    });

    return todoTaskLi;
}

// Fetch and display tasks
fetchTasks();

async function addTask(task) {
    let response = await fetch("https://todo-app-nu-ebon.vercel.app/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });

    // Refresh the list to include the new task
    fetchTasks();
}

let input = document.getElementById("input");
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault(); // Prevent default form submission behavior

        let taskTitle = input.value.trim(); // Trim to remove extra spaces
        if (taskTitle === "") {
            alert("Task cannot be empty!");
            return;
        }

        let task = {
            title: taskTitle,
            completed: false
        };

        addTask(task);
        input.value = "";
    }
});

async function deleteTask(id) {
    let response = await fetch(`https://todo-app-nu-ebon.vercel.app/tasks/${id}`, {
        method: "DELETE"
    });
    fetchTasks(); // Refresh the task list after deletion
}

async function updateTask(id, task) {
    let response = await fetch(`https://todo-app-nu-ebon.vercel.app/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });
}

// Event listeners for the filter buttons
let allTasks = document.getElementById("allTasks");
allTasks.addEventListener("click", function () {
    fetchTasks();
});

let activeTasks = document.getElementById("activeTasks");
activeTasks.addEventListener("click", async function () {
    try {
        const response = await fetch("https://todo-app-nu-ebon.vercel.app/tasks?completed=false");
        if (!response.ok) {
            throw new Error(`Failed to fetch tasks: ${response.statusText}`);
        }

        const tasks = await response.json();
        const todoTaskUl = document.getElementById("list");
        todoTaskUl.innerHTML = ""; // Clear the existing list

        tasks.forEach((task) => {
            const todoTaskLi = createTaskElement(task);
            todoTaskUl.appendChild(todoTaskLi);

            // Add event listener directly to the created checkbox
            const roundCheckbox = todoTaskLi.querySelector(".roundCheckbox");
            const taskText = todoTaskLi.querySelector(".text");

            roundCheckbox.addEventListener("click", function () {
                // Toggle the 'checked' class
                roundCheckbox.classList.toggle("checked");
                taskText.classList.toggle("lineThrough");

                // Determine the completed status based on the presence of the 'checked' class
                const isChecked = roundCheckbox.classList.contains("checked");

                // Update the task with the new completed value
                updateTask(task.id, {
                    id: task.id,
                    title: task.title,
                    completed: isChecked // true if checked, false if not
                });
            });

            // Add event listener to the delete button
            const deleteBtn = todoTaskLi.querySelector(".delete");
            deleteBtn.addEventListener("click", function () {
                deleteTask(task.id);
            });

            // Update the total tasks count 
            let totalTasks = document.getElementById("totalTasks");
            totalTasks.innerText = document.getElementsByClassName("listItem").length;

        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
});

let completedTasks = document.getElementById("completedTasks");
completedTasks.addEventListener("click", async function () {
    try {
        const response = await fetch("https://todo-app-nu-ebon.vercel.app/tasks?completed=true");
        if (!response.ok) {
            throw new Error(`Failed to fetch tasks: ${response.statusText}`);
        }

        const tasks = await response.json();
        const todoTaskUl = document.getElementById("list");
        todoTaskUl.innerHTML = ""; // Clear the existing list

        tasks.forEach((task) => {
            const todoTaskLi = createTaskElement(task);
            todoTaskUl.appendChild(todoTaskLi);

            // Add event listener directly to the created checkbox
            const roundCheckbox = todoTaskLi.querySelector(".roundCheckbox");
            const taskText = todoTaskLi.querySelector(".text");

            roundCheckbox.addEventListener("click", function () {
                // Toggle the 'checked' class
                roundCheckbox.classList.toggle("checked");
                taskText.classList.toggle("lineThrough");

                // Determine the completed status based on the presence of the 'checked' class
                const isChecked = roundCheckbox.classList.contains("checked");

                // Update the task with the new completed value
                updateTask(task.id, {
                    id: task.id,
                    title: task.title,
                    completed: isChecked // true if checked, false if not
                });
            });

            // Add event listener to the delete button
            const deleteBtn = todoTaskLi.querySelector(".delete");
            deleteBtn.addEventListener("click", function () {
                deleteTask(task.id);
            });

            // Update the total tasks count 
            let totalTasks = document.getElementById("totalTasks");
            totalTasks.innerText = document.getElementsByClassName("listItem").length;

        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
});

let clearCompleted = document.getElementById("clearCompleted");
clearCompleted.addEventListener("click", async function () {
    try {
        const response = await fetch("https://todo-app-nu-ebon.vercel.app/tasks?completed=true");
        if (!response.ok) {
            throw new Error(`Failed to fetch tasks: ${response.statusText}`);
        }

        const tasks = await response.json();
        tasks.forEach((task) => {
            deleteTask(task.id);
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
});

allTasks.addEventListener("click", function () {
    allTasks.classList.add("active");
    activeTasks.classList.remove("active");
    completedTasks.classList.remove("active");
});

activeTasks.addEventListener("click", function () {
    allTasks.classList.remove("active");
    activeTasks.classList.add("active");
    completedTasks.classList.remove("active");
});

completedTasks.addEventListener("click", function () {
    allTasks.classList.remove("active");
    activeTasks.classList.remove("active");
    completedTasks.classList.add("active");
});

let darkmode = document.querySelector(".moon"); // Select the image with the class "moon"

// Load user preference from local storage
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("darkmode"); // Apply dark mode
    darkmode.src = "./images/icon-sun.svg";  // Set to sun icon
    darkmode.alt = "sun";
    darkmode.classList.add("active");
} else {
    darkmode.src = "./images/icon-moon.svg"; // Set to moon icon
    darkmode.alt = "moon";
}

darkmode.addEventListener("click", function () {
    // Toggle the "dark" class on the body
    document.body.classList.toggle("darkmode");
    
    // Change the src attribute based on the current class
    if (darkmode.classList.contains("active")) {
        darkmode.src = "./images/icon-moon.svg";  // Change to moon icon
        darkmode.alt = "moon";  // Optionally update the alt text
        localStorage.setItem("darkMode", "disabled"); // Save preference
    } else {
        darkmode.src = "./images/icon-sun.svg";  // Change to sun icon
        darkmode.alt = "sun";  // Optionally update the alt text
        localStorage.setItem("darkMode", "enabled"); // Save preference
    }

    // Toggle the "active" class on the img element
    darkmode.classList.toggle("active");
});

// Drag-and-drop functionality
let draggedTask;

document.addEventListener("dragstart", function (event) {
    if (event.target.classList.contains("listItem")) {
        draggedTask = event.target;
    }
});

document.addEventListener("dragover", function (event) {
    event.preventDefault();
});

document.addEventListener("drop", function (event) {
    if (event.target.classList.contains("listItem")) {
        const afterElement = getDragAfterElement(event.clientY);
        const parent = event.target.parentNode;

        if (afterElement == null) {
            parent.appendChild(draggedTask);
        } else {
            parent.insertBefore(draggedTask, afterElement);
        }
    }
});

function getDragAfterElement(y) {
    const draggableElements = [...document.querySelectorAll(".listItem:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}