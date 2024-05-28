document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');
    const todoList = document.getElementById('todo-list');

    const addTodo = (task, creationDate, dueDate) => {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const taskText = document.createElement('span');
        taskText.textContent = `Task: ${task}`;

        const creationDateText = document.createElement('span');
        creationDateText.textContent = `Created: ${creationDate}`;

        const dueDateText = document.createElement('span');
        dueDateText.textContent = dueDate ? `Due: ${dueDate}` : '';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(li);
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            const   taskInput = document.createElement('input');
            taskInput.type = 'text';
            taskInput.value = task;

            const dueDateInput = document.createElement('input');
            dueDateInput.type = 'date';
            dueDateInput.value = dueDate ? new Date(dueDate).toISOString().substr(0, 10) : '';

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.addEventListener('click', () => {
                if (taskInput.value.trim()) {
                    taskText.textContent = `Task: ${taskInput.value.trim()}`;
                    dueDateText.textContent = dueDateInput.value ? `Due: ${new Date(dueDateInput.value).toDateString()}` : '';
                }
                li.replaceChild(taskText, taskInput);
                li.replaceChild(dueDateText, dueDateInput);
                li.replaceChild(editButton, saveButton);
            });

            li.replaceChild(taskInput, taskText);
            li.replaceChild(dueDateInput, dueDateText);
            li.replaceChild(saveButton, editButton);
        });

        li.appendChild(taskText);
        li.appendChild(creationDateText);
        li.appendChild(dueDateText);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    };

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newTask = todoInput.value.trim();
        const creationDate = new Date().toDateString();
        const dueDate = todoDate.value ? new Date(todoDate.value).toDateString() : '';

        if (newTask) {
            addTodo(newTask, creationDate, dueDate);
            todoInput.value = '';
            todoDate.value = '';
        }
    });
});
