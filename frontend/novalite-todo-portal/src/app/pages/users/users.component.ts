import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Role, UserRolesUpdate, UserTable } from 'src/app/shared/models/user';
import { TodoListService } from 'src/app/shared/services/todo-list.service';
import { ChangeUserRoleAction, SetAllUserAction } from 'src/app/shared/store/todo-list/todo-list-actions';
import { TodoListSelectors } from 'src/app/shared/store/todo-list/todo-list-selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userRoles: UserRolesUpdate[] = [];
  roles: Role[] =[
    {value: "User", viewValue: "User"},
    {value: "Moderator", viewValue: "Moderator"},
    {value: "Admin", viewValue: "Admin"},
    
  ];

  @Select(TodoListSelectors.Users) users$!: Observable<UserTable[]>
  constructor(private todoService: TodoListService,
              private toastr: ToastrService,
              private store: Store) { }

  ngOnInit() {
    this.getAllUsers();
  }

  onSelected(role:string, id: string): void {
    var userIndex = this.userRoles.findIndex(x => x.id == id);
    if(userIndex == -1){
      let newUser: UserRolesUpdate = {
        id : id,
        role : role
      }
      this.userRoles.push(newUser);
    }
    else{ 
      this.userRoles[userIndex].role = role;
    }

    console.log(this.userRoles);
	}

  getAllUsers(): void {
    this.todoService.getAllUsersExceptAdmins().subscribe(
      data=> {
        this.store.dispatch(new SetAllUserAction(data))
        //data.forEach(user => this.userRoles.push());
        
      },
      error => {
        this.toastr.error('Error occurred while retrieving users', 'Error')
      }
    )
  }

  ChangeRole(id: string, email: string, currentRole: string){
    var userIndex = this.userRoles.findIndex(x => x.id == id);
    if(userIndex == -1){
      this.toastr.info('User already has that role','Update')
    }
    else{
      let user: UserTable ={
        id: id,
        email: email,
        role: this.userRoles[userIndex].role
      }
      if(this.userRoles[userIndex].role == currentRole){
        this.toastr.info('User already has that role','Update')
      }
      else{
        this.todoService.updateTodoUserRole(user).subscribe(
          data => {
            this.store.dispatch(new ChangeUserRoleAction(user))
            this.toastr.success('Successfully changed user role', 'Successfully changed');
          },
          error => {
            this.toastr.error('Error occurred while tring to change user role', 'Error')
          }
        )
      }
    }
    
  }
}
