import { todoAttachment } from "../../models/todo-attachment";
import { todoItem } from "../../models/todo-item";
import { todoList } from "../../models/todo-list";
import { UserTable } from "../../models/user";

export class SetAllTodoListsAction{
    static readonly type = '[TODO LIST page] Set All Todo Lists'
    constructor(public todoLists: todoList[]) {}
}

export class SetAllUserAction{
    static readonly type = '[SET ALL User] Set All Users'
    constructor(public users: UserTable[]){}
}

export class SetAllAttachmentsAction{
    static readonly type = '[SET ALL Attachments] Set All'
    constructor(public attachments: todoAttachment[]){}
}

export class GetTodoListByIdAction {
    static readonly type = '[TODO LIST page] Get Todo List by Id'
    constructor(public todoListId: string) {}
}

export class AddTodoListAction {
    static readonly type = '[TODO LIST page] Add Todo List'
    constructor(public todoList: todoList) {}
}

export class AddItemToTodoListAction{
    static readonly type = '[TODO LIST page] Add Item to Todo List'
    constructor(public todoListId: string, public newItem: todoItem) {}
}

export class AddAttachmentAction{
    static readonly type = '[TODO LIST page] Add Attachment'
    constructor(public todoAttachment: todoAttachment) {}
}

export class SelectTodoListByIdAction {
    static readonly type = '[TODO LIST page] Select Todo List by Id'
    constructor(public todoListId: string) {}
}

export class UpdateTodoListAction {
    static readonly type = '[TODO LIST page] Update Todo List'
    constructor(public todoList: todoList){}
}

export class UpdateTodoItemAction{
    static readonly type = '[TODO item page] Update Todo Item'
    constructor(public todoItem: todoItem){}
}

export class ChangeUserRoleAction{
    static readonly type = '[TODO USER page] Update User'
    constructor (public user: UserTable) {}
}

export class ClearStorageAction {
    static readonly type = '[TODO LIST page] Clear Storage'
    constructor() {}
}
