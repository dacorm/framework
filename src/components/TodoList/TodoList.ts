import {compile} from "../../core/Templator";
import Block from "../../core/Block";
import {template} from "./TodoList.tmpl";
import {store} from "../../store/Store";

const TODOS = [
    {
        text: 'Задача 1',
        isDone: false
    }, {
        text: 'Задача 1',
        isDone: false
    }, {
        text: 'Задача 1',
        isDone: false
    }, {
        text: 'Задача 1',
        isDone: false
    }, {
        text: 'Задача 1',
        isDone: false
    },
];

export class TodoList extends Block {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return compile(template, this.props);
    }
}