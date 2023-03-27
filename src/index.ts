import Templator from "./Templator";
import { template as tmpl } from "./template.tmpl";

const app = document.getElementById('app');

const TODOS = [
    'Задача 1',
    'Задача 2',
    'Задача 3',
];

const chatsTemplate = new Templator(tmpl)

const chatsMarkup = chatsTemplate.compile({
    wrapperClassName: 'todo__wrapper',
    buttonText: 'Добавить задачу',
    chatListClassName: 'todo__list',
    chatListItems: TODOS.map(item => (
        `<li class="todo__item">${item}</li>`
    )),
    handleClick: () => {
        const todos = app.querySelector('.todo__list');
        todos.innerHTML += `<li class="todo__item">Задача</li>`;
    }
});

app.innerHTML = chatsMarkup;