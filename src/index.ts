import {mountApp} from "./utils/mountApp";
import {TodoList} from "./components/TodoList/TodoList";

const TODOS = [
    'Задача 1',
    'Задача 2',
    'Задача 3',
];

const todoList = new TodoList({
    wrapperClassName: 'todo__wrapper',
    buttonText: 'Добавить задачу',
    chatListClassName: 'todo__list',
    chatListItems: TODOS.map(item => (
        `<li class="todo__item">${item}</li>`
    )),
    handleClick: () => {
        const el = document.querySelector('.todo__list');
        el.innerHTML += `<li class="todo__item">Задача</li>`;
    }
})

mountApp('.app', todoList);