import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { todoList } from 'src/app/shared/models/todo-list';
import { TodoListService } from 'src/app/shared/services/todo-list.service';
import { SetAllTodoListsAction } from 'src/app/shared/store/todo-list/todo-list-actions';
import { TodoListSelectors } from 'src/app/shared/store/todo-list/todo-list-selectors';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

   @Select(TodoListSelectors.TodoLists) todolists$!: Observable<todoList[]>
   constructor(private todolistService: TodoListService,
               private store: Store) {
   }

   ngOnInit(){
    this.getAllTodoLists();
   }

   getAllTodoLists(){
    this.todolistService.getTodoLists().subscribe(
      data=> {
        this.store.dispatch(new SetAllTodoListsAction(data))
      }, error=>{
        console.log('Error occurred in overview.component.ts when calling for todolistService.getTodoLists()');
      }
    )
   }
}
