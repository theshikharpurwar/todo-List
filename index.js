const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
renderTodoList();

function renderTodoList() {
    let todoListHTML = '';
    const sortedTodoList = [...todoList];

    sortedTodoList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    for(let i = 0; i < sortedTodoList.length; i++){
        const { name, dueDate, priority, status } = sortedTodoList[i];
        const html =`
            <div>${name}</div>
            <div>${dueDate}</div>
            <div>${priority}</div>
            <div>${status}</div>
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
}
            
function addTodo() {
    const name = document.querySelector('.js-name-input').value;
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
}            

function saveToStorage(){
    localStorage.setItem('todoList', JSON.stringify(todoList));
}


document.querySelector('.js-add-button')
    .addEventListener('click', () => {
        addTodo();
    })