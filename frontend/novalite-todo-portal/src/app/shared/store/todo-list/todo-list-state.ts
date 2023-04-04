import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { append, patch, removeItem, updateItem } from "@ngxs/store/operators";
import { todoAttachment } from "../../models/todo-attachment";
import { todoList } from "../../models/todo-list";
import { UserTable } from "../../models/user";
import { AddAttachmentAction, AddItemToTodoListAction, AddTodoListAction, ChangeUserRoleAction, ClearStorageAction, GetTodoListByIdAction, SelectTodoListByIdAction, SetAllAttachmentsAction, SetAllTodoListsAction, SetAllUserAction, UpdateTodoItemAction, UpdateTodoListAction } from "./todo-list-actions";

export interface TodoListStateModel{
    todolists: todoList[];
    selectedTodoList: todoList;
    users: UserTable[];
    attachments: todoAttachment[];
}

@State<TodoListStateModel>({
    name:'todo',
    defaults: {
        todolists: [],
        selectedTodoList: {
            id: "-1",
            title: '',
            description: '',
            todoItems: []
        },
        users: [],
        attachments: []
    }
})
@Injectable()
export class TodoListState{

    @Action(SetAllTodoListsAction)
    setTodoLists(ctx: StateContext<TodoListStateModel>, action: SetAllTodoListsAction)
    {
        const {todoLists} = action;

        const state = ctx.getState();

        ctx.setState({
            ...state,
            todolists: todoLists
        })
    }

    @Action(SetAllUserAction)
    setAllUsers(ctx: StateContext<TodoListStateModel>, action: SetAllUserAction) {
        const {users} = action;

        const state = ctx.getState();

        ctx.setState({
            ...state,
            users: users
        })
    }

    @Action(SetAllAttachmentsAction)
    setAllAttachments(ctx: StateContext<TodoListStateModel>, action: SetAllAttachmentsAction) {
        const {attachments} = action;

        const state = ctx.getState();

        ctx.setState({
            ...state,
            attachments: attachments as todoAttachment[]
        })

        console.log(attachments)
    }

    @Action(SelectTodoListByIdAction)
    selectTodoListById(ctx: StateContext<TodoListStateModel>, action: SelectTodoListByIdAction){
        const {todoListId} = action;

        if(!todoListId){
            return
        }

        const state = ctx.getState()
        
        ctx.setState({
            ...state,
            selectedTodoList: state.todolists.find(todoList => todoList.id === todoListId) as todoList
        })

        console.log(state);
    }

    
    @Action(GetTodoListByIdAction)
    getTodoListById(ctx: StateContext<TodoListStateModel>, action: GetTodoListByIdAction){
        const {todoListId} = action;
    }

    @Action(AddTodoListAction)
    addNewTodoList(ctx: StateContext<TodoListStateModel> , action: AddTodoListAction){
        
        const {todoList} = action;

        if(!todoList){
            return
        }

        const state = ctx.getState()
            
        ctx.setState({
            ...state,
            todolists: [...state.todolists, todoList]

        });
    }

    @Action(AddAttachmentAction)
    addNewAttachment(ctx: StateContext<TodoListStateModel> , action: AddAttachmentAction){
        const {todoAttachment} = action;

        if(!todoAttachment){
            return
        }

        const state = ctx.getState()
            
        ctx.setState({
            ...state,
            attachments: [...state.attachments, todoAttachment]

        });
    }


    @Action(AddItemToTodoListAction)
    addItemToTodoList(ctx: StateContext<TodoListStateModel>, action: AddItemToTodoListAction){
        const {todoListId, newItem} = action;
    
        if(!todoListId || !newItem){
            return
        }

        const state = ctx.getState();
        ctx.setState(
            patch<TodoListStateModel>({
                
                selectedTodoList: patch({
                    todoItems: append([newItem])
                })
            }),
        );
        const state2 = ctx.getState();
        
        const todoListIndex = state2.todolists.findIndex(
            (todo) => todo.id == todoListId);

        const updatedTodoList = [...state2.todolists];
        updatedTodoList[todoListIndex] = state2.selectedTodoList;

        ctx.setState({
            ...state2,
            todolists: updatedTodoList,
          });
    }

    @Action(UpdateTodoListAction)
    updateTodoList(ctx: StateContext<TodoListStateModel>, action: UpdateTodoListAction){
        const {todoList} = action;

        if(!todoList){
            return
        }

        const state = ctx.getState();

        const todoListIndex = state.todolists.findIndex(
            (todo) => todo.id == todoList.id);
        
        const updatedTodoList = [...state.todolists];
        updatedTodoList[todoListIndex] = todoList; 

        ctx.setState({
            ...state,
            todolists: updatedTodoList,
            selectedTodoList: todoList
        });
    }

    @Action(UpdateTodoItemAction)
    updateTodoItem(ctx: StateContext<TodoListStateModel>, action: UpdateTodoItemAction){
        const {todoItem} = action;

        if(!todoItem){
            return;
        }

        const state = ctx.getState();

        ctx.setState(
            patch<TodoListStateModel>({
                
                selectedTodoList: patch({
                    todoItems: updateItem(x => x.id == todoItem.id, todoItem)
                })
            }),
        );

        const state2 = ctx.getState();
        
        const todoListIndex = state2.todolists.findIndex(
            (todo) => todo.id == state2.selectedTodoList.id);

        const updatedTodoList = [...state2.todolists];
        updatedTodoList[todoListIndex] = state2.selectedTodoList;

        ctx.setState({
            ...state2,
            todolists: updatedTodoList,
          });
    }

    @Action(ChangeUserRoleAction)
    changeUserRole(ctx: StateContext<TodoListStateModel>, action: ChangeUserRoleAction){
        const {user} = action;

        if(!user){
            return;
        }

        const state = ctx.getState();
        const userIndex = state.users.findIndex(
            (x) => x.id == user.id);
        const updatedUsers =[...state.users];

        if(user.role != "Admin" ){
            updatedUsers[userIndex] = user;
            ctx.setState({
                ...state,
                users: updatedUsers  
            })
        }
        else{
            ctx.setState(
                patch<TodoListStateModel>({
                    users: removeItem<UserTable>((x) => x.id == user.id),
                }),
            )
        }

    }

    @Action(ClearStorageAction)
    clearStorage(ctx: StateContext<TodoListStateModel>, action: ClearStorageAction){
        
        ctx.setState({
            todolists: [],
            selectedTodoList: {
                id: "-1",
                title: '',
                description: '',
                todoItems: []
            },
            users: [],
            attachments: [],
        })
    }
}