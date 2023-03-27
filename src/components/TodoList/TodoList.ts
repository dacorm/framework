import {compile} from "../../core/Templator";
import Block from "../../core/Block";
import {template} from "./TodoList.tmpl";

export class TodoList extends Block {
    constructor(props) {
        super(props);
    }

    render() {
        return compile(template, this.props);
    }
}