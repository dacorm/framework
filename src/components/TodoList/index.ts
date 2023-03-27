import {TodoList} from "./TodoList";
import {connect} from "../../store/Store";

const todoListWithStore = connect((state) => ({
    todos: state.todoList || [],
}));

export const TodoListConnected =  todoListWithStore(TodoList);