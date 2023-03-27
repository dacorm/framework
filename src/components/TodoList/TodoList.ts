import Templator from "../../core/Templator";
import Block from "../../core/Block";
import {template} from "./TodoList.tmpl";

export class TodoList extends Block {
    constructor(props) {
        super(props);
    }

    render() {
        const todoTemplate = new Templator(template);
        return todoTemplate.compile(this.props);
    }
}