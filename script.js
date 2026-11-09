const taskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const completedCountEl = document.getElementById('completed-count');

function render () {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', task.id);

        const leftDiv = document.createElement('div');
        leftDiv.className = 'task-left';

        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'toggle-btn';
        toggleBtn.setAttribute('aria-label', task.completed ? 'Mark incomplete' : 'Mark complete');
        toggleBtn.addEventListener('click', () => toggleTask(task.id));

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;
        span.addEventListener('click', () => toggleTask(task.id));

        leftDiv.appendChild(toggleBtn);
        leftDiv.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'delete-btn';
        deleteBtn.setAttribute('aria-label', `Delete task: ${task.text}`);
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(leftDiv);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    const count = tasks.filter(t => t.completed).length;
    completedCountEl.textContent = count;
}

function handleAddTask (event) {
    event.preventDefault();

    const text = taskInput.value.trim();
    if (!text) return;
    
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = '';
    taskInput.focus();
    render();
}

function toggleTask (id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    render();
}

function deleteTask (id) {
    tasks = tasks.filter(task => task.id !== id);
    render();
}

taskForm.addEventListener('submit', handleAddTask);

document.addEventListener('DOMContentLoaded', render);
