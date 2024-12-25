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

    let data = await response.json();
    console.log(data);
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