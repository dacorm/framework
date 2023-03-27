import {mountApp} from "./utils/mountApp";
import { TodoListConnected } from "./components/TodoList";
import {store} from "./store/Store";

const todos = store.getState().todoList;

const clickHandler = (item: string = 'Задача') => {
    todos.push({
        text: item,
        isDone: false
    })
    todoList.setProps({
        chatListItems: todos.map(item => (
            `<li class="todo__item">${item.text}</li>`
        )),
    })
}

const toggleDone = (todoText) => {
    const newTodos = store.getState().todoList.map((todo) => {
        if (todo.text === todoText) {
            todo.isDone = !todo.isDone;
        };
    })

    store.set('todoList', newTodos)
}

const todoList = new TodoListConnected({
    wrapperClassName: 'todo__wrapper',
    buttonText: 'Добавить задачу',
    chatListClassName: 'todo__list',
    inputClassName: 'todo__input',
    chatListItems: todos.map(item => (
        `<li class="todo__item"><p>${item.text}</p><input type="checkbox"></li>`
    )),
    handleClick: () => {
        clickHandler((store.getState()?.inputValue as string) || '')
    },
    changeHandler: () => {
        store.set('inputValue', (document.querySelector(`.${todoList.props.inputClassName}`) as HTMLInputElement).value);
    }
})

mountApp('.app', todoList);