import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { NewItem } from 'src/app/shared/models/todo-item';
import { newTodoList, todoList, updateTodoList } from 'src/app/shared/models/todo-list';
import { TodoListService } from 'src/app/shared/services/todo-list.service';
import { AddTodoListAction, UpdateTodoListAction } from 'src/app/shared/store/todo-list/todo-list-actions';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})

export class TodoDetailsComponent implements OnInit {
  
  todoForm!: FormGroup;
  itemForm!: FormGroup;
  newItem: NewItem = {
    content: "",
    todoListId: "-1"

  };
  @Input() todoList!: todoList | null;
  @Input() component!: string; 
  @Input() todoListId!: string;
  constructor(private fb: FormBuilder,
              private todolistService: TodoListService,
              private toastr: ToastrService,
              private store: Store) { 
  }

  ngOnInit() {
    this.createTodoForm();
  }

  createTodoForm() {
    this.todoForm = this.fb.group({
      title: [this.todoList?.title,[Validators.required,Validators.minLength(2)]],
      description: [this.todoList?.description,[Validators.required,Validators.minLength(2)]]
    });
  }

  execute(){
    if(this.todoForm.valid){ 
      if(this.component == "Update"){
        this.updatedTodoList();    
      }else{
        this.addTodoList();
      }
    }
    else{
      this.toastr.error('Please enter valid inputs', 'Error');
    }
  }

  updatedTodoList(){
    let todoLIst: updateTodoList = {
      title: this.title.value,
      description: this.description.value,
      id: this.todoListId
    }
    this.todolistService.updateTodoList(todoLIst).subscribe(
      data=> {
        this.toastr.success('Successfully updated TodoList', 'Success');
        this.store.dispatch(new UpdateTodoListAction(data as todoList))

      },
      error =>{
        this.toastr.error('Error occured while trying to update TodoList', 'Error');
      }
    )
  }

  addTodoList(){
    let todoLIst: newTodoList = {
      title: this.title.value,
      description: this.description.value,
      todoUserId: localStorage.getItem("id") as string
    }
    this.todolistService.addTodoList(todoLIst).subscribe(
      data=> {
        this.toastr.success('Successfully added TodoList', 'Success');
        console.log(data);
        this.store.dispatch(new AddTodoListAction(data as todoList))
      },
      error =>{
        this.toastr.error('Error occured while trying to add TodoList', 'Error');
      }
    )
  }

  get title() {
    return this.todoForm.get('title') as FormControl;
  }
  get description() {
    return this.todoForm.get('description') as FormControl;
  }
}
