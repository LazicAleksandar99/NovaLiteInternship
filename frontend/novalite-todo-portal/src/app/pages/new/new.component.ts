import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { todoList } from 'src/app/shared/models/todo-list';
import { TodoListService } from 'src/app/shared/services/todo-list.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  todoListForm!: FormGroup;
  component: string = 'Add New';
  
  todoList: todoList = {
    id: "-2",
    title: '',
    description: '',
    todoItems: [],
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.todoListForm = this.fb.group({
      parent: [null]
    })
  }
}

