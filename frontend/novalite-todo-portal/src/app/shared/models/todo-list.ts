import { todoItem } from "./todo-item";

export interface todoList {
    id: string;
    title: string;
    description: string;
    todoItems: todoItem[]
}

export interface updateTodoList{
    id: string;
    title: string;
    description: string;
}

export interface newTodoList{
    title:string;
    description:string;
    todoUserId: string;
}