import { ItemStatus } from "../enums/item-status";

export interface todoItem {
    id: string;
    content: string;
    status: ItemStatus;
    listId: string;
}

export interface NewItem{
    todoListId: string;
    content: string;
}

export interface Status {
    value: number;
    viewValue: string;
  }

export interface updateItem{
    id: string;
    status: ItemStatus;
}

export interface UpdatedItem{
    id: string;
    status: ItemStatus;
    content: string;
}