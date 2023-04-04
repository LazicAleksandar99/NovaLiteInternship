import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { newTodoList, todoList, updateTodoList } from '../models/todo-list';
import { Observable } from 'rxjs';
import { NewItem, UpdatedItem } from '../models/todo-item';
import { NewReminder } from '../models/reminder';
import { User, UserTable } from '../models/user';
import { todoAttachment } from '../models/todo-attachment';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  email!: string;
  id!: string;
  token: string = "";
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getTodoLists() {
    console.log(localStorage.getItem('token'))
    this.email = localStorage.getItem("email") as string;
    this.id = localStorage.getItem("id") as string;
    return this.http.get<todoList[]>(`${this.baseUrl}/lists/` + this.email + "/" + this.id , this.getHttpHeader());
  }

  getTodoListById(id: number) : Observable<todoList>{
    return this.http.get<todoList>(`${this.baseUrl}/lists/` + id, this.getHttpHeader());
  }
  
  getAllUsersExceptAdmins(){
    return this.http.get<UserTable[]>(`${this.baseUrl}/lists/users`, this.getHttpHeader());
  }

  getAllAttachmentsForTodoList(id: string) {
    return this.http.get<todoAttachment[]>(`${this.baseUrl}/lists/attachments/${id}`, this.getHttpHeader());
  }

  addItemToTodoList(item: NewItem){
    return this.http.post(`${this.baseUrl}/lists/new/item`, item, this.getHttpHeader());
  }

  addReminder(id: string,date: Date){
    var reminder : NewReminder = { 
      todoListId : id,
      timeStamp : date
    };
    return this.http.post(`${this.baseUrl}/lists/new/reminder`, reminder, this.getHttpHeader());
  }

  addTodoList(todoList: newTodoList){
    return this.http.post(`${this.baseUrl}/lists/new`, todoList, this.getHttpHeader());
  }

  addTodoAttachments(todoAttachment: todoAttachment) {
    return this.http.post(`${this.baseUrl}/lists/new/attachment`, todoAttachment, this.getHttpHeader());
  }

  updateTodoList(todoList: updateTodoList){
    return this.http.put(`${this.baseUrl}/lists/update`, todoList, this.getHttpHeader());
  }

  updateTodoUserRole(user: UserTable){
    return this.http.patch(`${this.baseUrl}/lists/user/role`, user, this.getHttpHeader());
  }

  updateTodoItem(item: UpdatedItem){
    return this.http.patch(`${this.baseUrl}/lists/update/item`, item, this.getHttpHeader());
  }

  signin(token: string , id: string, email: string){
    let theUser : User = {
      email : email,
      id : id
    }
    return this.http.post(`${this.baseUrl}/lists/signin`, theUser, this.getHttpHeaderAzure(token));
  }

  getSas(){
    return this.http.get(`${this.baseUrl}/lists/attachments/upload`, this.getHttpHeader())
  }

  getSasDownload(){
    return this.http.get(`${this.baseUrl}/lists/attachments/download`, this.getHttpHeader())
  }

  getHttpHeader(): { headers: HttpHeaders; }{
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        Authorization: 'Bearer '+ localStorage.getItem('token')
      })
    };
    return httpOptions;
  }

  getHttpHeaderAzure(token: string): { headers: HttpHeaders; }{
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        Authorization: 'Bearer '+ token
      })
    };
    return httpOptions;
  }
}
