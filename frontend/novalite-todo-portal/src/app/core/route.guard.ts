import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { MsalService } from "@azure/msal-angular";
import { Observable } from "rxjs";
import { UserAuthorization } from "../shared/models/user";
import { AuthService } from "../shared/services/auth.service";

@Injectable({
    'providedIn': 'root'
})
export class RouteGuard implements CanActivate {

    user!: UserAuthorization;
    constructor(private readonly msalService: MsalService,
                private router: Router,
                private authService: AuthService) { }

    canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       
        if (localStorage.getItem('token')){

            this.user = this.authService.getUser(localStorage.getItem('token') as string);

            if(this.user.role.includes(_route.data['role1']) || 
               this.user.role.includes(_route.data['role2'])){
               return true; 
            }
            else{
            this.router.navigate(['']);
            return false;
            }
        }
        else {
           this.router.navigate(['']);
           return false;
        }
    }

}