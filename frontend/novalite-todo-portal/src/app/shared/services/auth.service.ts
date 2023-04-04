import { Injectable } from '@angular/core';
import { UserAuthorization } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!: UserAuthorization
  theToken: any;

constructor() { }

  getUser(token: string): UserAuthorization {
    if(token){
      return JSON.parse(atob(token.split('.')[1])) as UserAuthorization;
    }
    else {
      let fakeUser: UserAuthorization = {
        unique_name: "fake",
        nameid: "fake",
        role: "fake"
      }
      return fakeUser
    }
  }

  hasRole(role: string[]): boolean {
    this.user = this.getUser(localStorage.getItem('token') as string);
    if(this.user.role =="fake"){
      return false;
    }
    else{
      for (let i = 0; i < role.length; i++) {
        if (this.user.role.includes(role[i])) {
          return true;
        }    
      }
      return false;
    }
  }

}
