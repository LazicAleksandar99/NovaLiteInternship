import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MtxMomentDatetimeModule } from '@ng-matero/extensions-moment-adapter';
import {MatCardModule} from '@angular/material/card';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { MatInputModule } from '@angular/material/input';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent  } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { CardComponent } from './components/card/card.component';
import { DetailsComponent } from './pages/details/details.component';
import { NewComponent } from './pages/new/new.component';
import { TodoListState } from './shared/store/todo-list/todo-list-state';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HasRoleDirective } from './directives/has-role.directive';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { BlobStorageComponent } from './components/blob-storage/blob-storage.component';
import { UsersComponent } from './pages/users/users.component';
import { ItemComponent } from './components/item/item.component';
import { WrongUrlComponent } from './pages/wrong-url/wrong-url.component';
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    CardComponent,
    DetailsComponent,
    NewComponent,
    TodoDetailsComponent,
    HomeComponent,
    NavbarComponent,
    HasRoleDirective,
    WelcomeComponent,
    BlobStorageComponent,
    UsersComponent,
    ItemComponent,
    WrongUrlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([TodoListState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot(),
    BrowserAnimationsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatInputModule,
    MtxMomentDatetimeModule,
    MtxDatetimepickerModule,
    CommonModule,
    ToastrModule.forRoot(),
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: '33e5695b-7e44-4ac2-87fa-6ec31a06a42e',
        authority: 'https://login.microsoftonline.com/common',
        redirectUri: 'http://localhost:4200'
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE
      }
    }), null!, {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
        [
          'https://localhost:7152/lists', null
        ],
        ['https://localhost:7152/',
          [
            'openid', //api://33e5695b-7e44-4ac2-87fa-6ec31a06a42e/to-do-lists.read
            'profile', // api://33e5695b-7e44-4ac2-87fa-6ec31a06a42e/to-do-lists.write
            'User.profile',
            'Mail.Read'
          ]]
      ])
    }),
    CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard,
  ],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
