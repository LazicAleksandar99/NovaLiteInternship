import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { ItemStatus } from 'src/app/shared/enums/item-status';
import { Status, todoItem, UpdatedItem, updateItem } from 'src/app/shared/models/todo-item';
import { TodoListService } from 'src/app/shared/services/todo-list.service';
import { UpdateTodoItemAction } from 'src/app/shared/store/todo-list/todo-list-actions';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  
  updatedItemsStatus: updateItem[] = [];
  itemForm!: FormGroup;
  statusCodes: Status[] =[
    {value: 0, viewValue: "Open"},
    {value: 1, viewValue: "Active"},
    {value: 2, viewValue: "Closed"},
  ];

  

  @Input() item!: todoItem; 
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private todoListServices: TodoListService,
              private store: Store,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.createItemForm()
  } 

  createItemForm(){
    this.itemForm = this.fb.group({
      content: [this.item.content,[Validators.required,Validators.minLength(2)]]
    });
  }

  onSelected(statusCode: string, id: string){
    console.log(statusCode);
    var itemIndex = this.updatedItemsStatus.findIndex(x => x.id == id);
      if(itemIndex == -1){
        let newItem: updateItem = {
          id : id,
          status : Number(statusCode)
        }
        this.updatedItemsStatus.push(newItem);
      }
      else{ 
        this.updatedItemsStatus[itemIndex].status = Number(statusCode);
      }
  }

  UpdateTodoItem(id: string, status: ItemStatus, todoListId: string){
    if(this.itemForm.valid){
      var itemIndex = this.updatedItemsStatus.findIndex(x => x.id == id);
      console.log(this.content.value)
      if(itemIndex == -1){
        this.callUpdateService(id, status, this.content.value, todoListId);
      }
      else{
        this.callUpdateService(id, this.updatedItemsStatus[itemIndex].status, this.content.value, todoListId);
      }
    }
    else{
      this.toastr.error('Error updating item, please enter correct input','Error');
    }
  }

  callUpdateService(id: string, status: ItemStatus, content: string, todoListId: string){
    let item: UpdatedItem = {
      id: id,
      status: status,
      content: content,
    }

    let storeItem: todoItem = {
      id: id,
      status: status,
      content: content,
      listId: todoListId
    }

    this.todoListServices.updateTodoItem(item).subscribe(
      data => {
        this.toastr.success('Successfully updated item', 'Successfully update')
        this.store.dispatch(new UpdateTodoItemAction(storeItem))
      },
      error => {
        this.toastr.error('Error updating item','Error');
      }
    )
  }

  get content() {
    return this.itemForm.get('content') as FormControl;
  }
}
