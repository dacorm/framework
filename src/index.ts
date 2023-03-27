import {mountApp} from "./utils/mountApp";
import {TodoList} from "./components/TodoList/TodoList";

const TODOS = [
    'Задача 1',
    'Задача 2',
    'Задача 3',
];

const clickHandler = (item: string = 'Задача') => {
    TODOS.push(item)
    todoList.setProps({
        chatListItems: TODOS.map(item => (
            `<li class="todo__item">${item}</li>`
        )),
    })
}

const todoList = new TodoList({
    wrapperClassName: 'todo__wrapper',
    buttonText: 'Добавить задачу',
    chatListClassName: 'todo__list',
    chatListItems: TODOS.map(item => (
        `<li class="todo__item">${item}</li>`
    )),
    handleClick: () => {
        clickHandler()
    },
})

mountApp('.app', todoList);