const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
renderTodoList();

function renderTodoList() {
    let todoListHTML = '';
    for(let i = 0; i < todoList.length; i++){
        const todoObject = todoList[i];
        const { name, dueDate} = todoObject;
        const html =`
        
            <div>${name}</div>
            <div>${dueDate}</div>
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
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    const dateInputElement = document.querySelector('.js-dueDate-input');
    const dueDate = dateInputElement.value;

    todoList.push({name, dueDate});
    inputElement.value = '';
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