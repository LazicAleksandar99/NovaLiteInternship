import { Selector } from "@ngxs/store";
import { todoAttachment } from "../../models/todo-attachment";
import { todoList } from "../../models/todo-list";
import { UserTable } from "../../models/user";
import { TodoListState, TodoListStateModel } from "./todo-list-state";

export class TodoListSelectors{

    @Selector([TodoListState])
    static TodoLists(state: TodoListStateModel): todoList[]{
        return state.todolists;
    }

    @Selector([TodoListState])
    static SelectedTodoList(state: TodoListStateModel): todoList{
        return state.selectedTodoList;
    }

    @Selector([TodoListState])
    static Users(state: TodoListStateModel): UserTable[]{
        return state.users;
    }

    @Selector([TodoListState])
    static Attachments(state: TodoListStateModel): todoAttachment[]{
        return state.attachments;
    }
}