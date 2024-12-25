async function fetchTasks() {
    try {
        const response = await fetch("http://localhost:3000/tasks");
        if (!response.ok) {
            throw new Error(`Failed to fetch tasks: ${response.statusText}`);
        }

        const tasks = await response.json();
        const todoTaskUl = document.getElementById("list");

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

        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

// Helper function to create a task list item
function createTaskElement(task) {
    const todoTaskLi = document.createElement("li");
    todoTaskLi.classList.add("listItem");
    todoTaskLi.innerHTML = `
        <input type="checkbox" id="checkbox${task.id}" class="checkbox">
        <label for="checkbox${task.id}" class="roundCheckbox ${task.completed ? 'checked' : ''}"></label>
        <p class="text ${task.completed ? 'lineThrough' : ''}">${task.title}</p>
        <img src="./images/icon-cross.svg" alt="cross" class="cross">`;
    return todoTaskLi;
}

// Fetch and display tasks
fetchTasks();

async function addTask(task) {
    let response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });

    let data = await response.json();
    console.log(data);
}

async function deleteTask(id) {
    let response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE"
    });

    let data = await response.json();
    console.log(data);
}

async function updateTask(id, task) {
    let response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });
}