to-list

https://theshikharpurwar.github.io/todo-List/


# Todo List Application

This is a simple Todo List application built with JavaScript. It allows users to add, delete, and sort todo items.

## Features

- Add a new todo item with a name, due date, priority, and status.
- Delete a todo item.
- Sort todo items by due date, name, status, or priority.

## How It Works

The application uses JavaScript to manipulate the DOM and handle user interactions. The todo items are stored in an array, and the application re-renders the todo list whenever an item is added, deleted, or the sort order is changed.

When a new todo item is added, the application creates a new object with the provided name, due date, priority, and status, and adds it to the todo list array.

When a todo item is deleted, the application removes the corresponding object from the todo list array.

The application sorts the todo list based on the selected sort order. It uses different comparison functions for each sort order to sort the todo list array.

The sorted todo list is then converted to HTML and inserted into the DOM.

## How to Run

1. Open `index.html` in your web browser.
2. Add, delete, and sort todo items using the provided controls.
