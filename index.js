const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
let sortFunction = sortByDueDate;
renderTodoList();

function renderTodoList() {
    let todoListHTML = '';
    const sortedTodoList = [...todoList];

    sortedTodoList.sort(sortFunction);

    for(let i = 0; i < sortedTodoList.length; i++){
        const { name, dueDate, priority, status } = sortedTodoList[i];
        const html =`
            <div>${name}</div>
            <div>
                <input type="date" class="js-dueDate-input due-date-input" data-index="${i}" value="${dueDate}">
            </div>
            <div>
                <select class="js-priority-input priority-input" data-index="${i}">
                    <option value="1" ${priority === 'High' ? 'selected' : ''}>High</option>
                    <option value="2" ${priority === 'Medium' ? 'selected' : ''}>Medium</option>
                    <option value="3" ${priority === 'Low' ? 'selected' : ''}>Low</option>
                </select>
            </div>
            <div>
                <select class="js-status-input status-input" data-index="${i}">
                    <option value="Not Started" ${status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="In Progress" ${status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Completed" ${status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
            </div>
            <button class="delete-todo-button js-delete-button">Delete</button>
        `;
        todoListHTML += html;
    }  
    document.querySelector('.js-todo-list').innerHTML = todoListHTML;  
    document.querySelectorAll('.js-delete-button').forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            todoList.splice(index, 1);
            renderTodoList();
        })
    })
    document.querySelector('.js-sort-input').style.display = todoList.length ? 'block' : 'none';
    document.querySelectorAll('.js-dueDate-input').forEach((dueDateInput) => {
        dueDateInput.addEventListener('change', (e) => {
            const index = e.target.getAttribute('data-index');
            todoList[index].dueDate = e.target.value;
            renderTodoList();
        });
    });
    document.querySelectorAll('.js-priority-input').forEach((priorityInput) => {
        priorityInput.addEventListener('change', (e) => {
            const index = e.target.getAttribute('data-index');
            todoList[index].priority = e.target.value;
            renderTodoList();
        });
    });
    document.querySelectorAll('.js-status-input').forEach((statusInput) => {
        statusInput.addEventListener('change', (e) => {
            const index = e.target.getAttribute('data-index');
            todoList[index].status = e.target.value;
            renderTodoList();
        });
    });
}
            
function addTodo() {
    const name = capitalizeFirstLetter(document.querySelector('.js-name-input').value);
    const dueDate = document.querySelector('.js-dueDate-input').value;
    const priority = document.querySelector('.js-priority-input').value;
    const status = document.querySelector('.js-status-input').value;

    todoList.push({name, dueDate, priority, status});
    document.querySelector('.js-name-input').value = '';
    document.querySelector('.js-dueDate-input').value = '';
    document.querySelector('.js-priority-input').value = '';
    document.querySelector('.js-status-input').value = '';
    renderTodoList();
    saveToStorage();
    document.querySelector('.js-sort-input').style.display = 'block';
}   

function sortByDueDate(a, b) {
    return new Date(a.dueDate) - new Date(b.dueDate);
}

function sortByName(a, b) {
    return a.name.localeCompare(b.name);
}

function sortByStatus(a, b) {
    return a.status.localeCompare(b.status);
}

function sortByPriority(a, b) {
    return a.priority - b.priority;
}

function capitalizeFirstLetter(string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

document.querySelector('.js-sort-input').addEventListener('change', function(e) {
    if (e.target.value === 'dueDate') {
        sortFunction = sortByDueDate;
    } 
    else if (e.target.value === 'name') {
        sortFunction = sortByName;
    } 
    else if (e.target.value === 'status') {
        sortFunction = sortByStatus;
    } 
    else if (e.target.value === 'priority') {
        sortFunction = sortByPriority;
    }
    renderTodoList();
});

function saveToStorage(){
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

document.querySelector('.js-add-button')
    .addEventListener('click', () => {
        addTodo();
    })