import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { todoList } from 'src/app/shared/models/todo-list';
import { SelectTodoListByIdAction } from 'src/app/shared/store/todo-list/todo-list-actions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() todoList!: todoList; 
  constructor(private route: Router,
              private store: Store) { }

  ShowDetails(){
    console.log('Error occurred at show-user-profile.component.ts')
    //this.store.dispatch(new SelectTodoListByIdAction(this.todoList.id));
    this.route.navigateByUrl('home/lists/' + this.todoList.id);//Treba podesiti da uzme id od itema
  }

}
