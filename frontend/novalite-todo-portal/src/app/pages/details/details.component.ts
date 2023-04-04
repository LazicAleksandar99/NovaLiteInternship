import { Component, Input, OnInit, ElementRef  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { ItemStatus } from 'src/app/shared/enums/item-status';
import { NewItem, Status, todoItem, UpdatedItem, updateItem } from 'src/app/shared/models/todo-item';
import { todoList } from 'src/app/shared/models/todo-list';
import { TodoListService } from 'src/app/shared/services/todo-list.service';
import { AddItemToTodoListAction, SelectTodoListByIdAction } from 'src/app/shared/store/todo-list/todo-list-actions';
import { TodoListSelectors } from 'src/app/shared/store/todo-list/todo-list-selectors';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  todoList!: todoList;
  todoListId!: string;
  component: string = "Update"
  public dateValue: Date = new Date();
  private routeSub!: Subscription;
  itemForm!: FormGroup;
  dateTimeForm!: FormGroup;
  newItem: NewItem = {
    content: "",
    todoListId: "-1"

  };
  todoItems: todoItem[] = [];

  @Select(TodoListSelectors.SelectedTodoList) todolist$!: Observable<todoList>  
  @Input() new!: boolean;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private todoListServices: TodoListService,
              private store: Store,
              private toastr: ToastrService,
              private el: ElementRef) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.todoListId = params['id'];
      this.store.dispatch(new SelectTodoListByIdAction(this.todoListId));
      console.log('disppecano')
    });
    this.createItemForm();
    this.createDateTimeForm();
    this.todolist$.subscribe(todo => {
      this.todoItems = todo.todoItems;
      console.log('ovo istonesto')
    })
  }

  createItemForm(){
    this.itemForm = this.fb.group({
      content: [this.newItem.content,[Validators.required,Validators.minLength(2)]]
    });
  }

  createDateTimeForm(){
    this.dateTimeForm = this.fb.group({
      dateTime: [new Date(), Validators.required]
  });
  }

  scrollToSection(id: string): void {
    const element = this.el.nativeElement.querySelector(`#${id}`);
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  addItem(){
    if(this.itemForm.valid){
      this.newItem.content = this.itemForm.get('content')?.value;
      this.newItem.todoListId = this.todoListId
      this.todoListServices.addItemToTodoList(this.newItem).subscribe(
        data=> {
          this.store.dispatch(new AddItemToTodoListAction(this.todoListId, data as todoItem))
          this.toastr.success('Successfully added item to list', 'Success');

        }, error=>{
          this.toastr.error('Error occured while trying to add item', 'Error');
        }
      )
    }
    else{
      this.toastr.error('Bad input, please enter item content', 'Error');
    }
  }

  addReminder(){
    console.log('datum')
    console.log(this.dateTime.valid)
    if(this.dateTime.valid){
      if(this.dateTime.value < new Date()){
        this.toastr.error('The date you entered has already passed', 'Old Date');
      }
      else{
        this.todoListServices.addReminder(this.todoListId, this.dateTime.value).subscribe(
          data=> {
            if((data as string) == "Reminder_Created")
            this.toastr.success('Reminder created successfully', 'Success');
            else{
              this.toastr.info('You have already set a reminder', 'Reminder_Exists');
            }
          },
          error =>{
            this.toastr.error('Error occured while trying to add reminder', 'Error');
          }
        )
      }
    }
  }

  get content() {
    return this.itemForm.get('content') as FormControl;
  }

  get dateTime() {
    return this.dateTimeForm.get('dateTime') as UntypedFormControl;
  }

}
