import Templator from "./Templator";
import { template as tmpl } from "./template.tmpl";

const app = document.getElementById('app');

const CHAT_NAMES = [
    'Название чата 1',
    'Название чата 2',
    'Название чата 3',
];

const chatsTemplate = new Templator(tmpl)

const chatsMarkup = chatsTemplate.compile({
    wrapperClassName: 'chat__wrapper',
    buttonText: 'Добавить чат',
    chatListClassName: 'chat__list',
    chatListItems: CHAT_NAMES.map(item => (
        `<li class="chat__item">${item}</li>`
    )),
    handleClick: () => {
        const chat = app.querySelector('.chat__list');
        chat.innerHTML += `<li class="chat__item">Чат</li>`;
    }
});

app.innerHTML = chatsMarkup;