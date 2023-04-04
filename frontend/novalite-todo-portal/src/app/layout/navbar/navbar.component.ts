import { Component, OnInit, SimpleChanges , OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { Store } from '@ngxs/store';
import { filter, Subject, takeUntil } from 'rxjs';
import { UserToken } from 'src/app/shared/models/user';
import { TodoListService } from 'src/app/shared/services/todo-list.service';
import { ClearStorageAction } from 'src/app/shared/store/todo-list/todo-list-actions';
import  {HasRoleDirective} from 'src/app/directives/has-role.directive'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    roles: string[] = ['Admin', 'User'];
    rolesRestricted: string[] = ['Admin'];
    isIframe = false;
    loginDisplay = false;
    private readonly _destroying$ = new Subject<void>();
    email!: string

    constructor(private broadcastService: MsalBroadcastService, 
                private authService: MsalService, 
                private msalBroadcastService: MsalBroadcastService,
                private route: Router,
                private service: TodoListService,
                private store: Store) { }

    ngOnInit() {

        this.msalBroadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
            )
            .subscribe((result: EventMessage) => {
                console.log(result);
            });

        this.isIframe = window !== window.parent && !window.opener;

        this.broadcastService.inProgress$
            .pipe(
                filter((status: InteractionStatus) => status === InteractionStatus.None),
                takeUntil(this._destroying$)
            )
            .subscribe(() => {
                this.setLoginDisplay();
            })
        }

    ngOnChanges(changes: SimpleChanges): void {
        if ('loginDisplay' in changes) {
            console.log('cangi')
            // Run the appHasRole directive to show/hide the Users button
            this.rolesRestricted = ['Admin'];
        }
        }

    login() {
        this.authService.loginPopup()
            .subscribe({
                next: (result) => {
                    this.setLoginDisplay();
                    localStorage.setItem('tokenAzure', result.accessToken);
                    let k = result.idTokenClaims as UserToken;
                    localStorage.setItem('id' ,k.oid)
                    localStorage.setItem('email' ,k.preferred_username)
                        this.service.signin(localStorage.getItem('tokenAzure') as string, k.oid, k.preferred_username)
                        .subscribe(
                            data=> {
                            localStorage.setItem('token', data.toString())
                            console.log(data.toString())
                            this.roles= ['Admin', 'User'];
                            this.rolesRestricted = ['Admin'];
                            }, error=>{
                            console.log('Error occurred in overview.component.ts when calling for todolistService.getTodoLists()');
                            })
                    },
                       error: (error) => console.log(error)
            });
        
    }

    logout() {
        this.authService.logoutPopup({
            mainWindowRedirectUri: "/",
        });

        localStorage.clear();
        sessionStorage.clear();
        this.store.dispatch(new ClearStorageAction());
    }

    setLoginDisplay() {
        this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    }

    ngOnDestroy(): void {
        this._destroying$.next(undefined);
        this._destroying$.complete();
    }

}
