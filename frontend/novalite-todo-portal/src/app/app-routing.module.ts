import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from './core/route.guard';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';
import { NewComponent } from './pages/new/new.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { UsersComponent } from './pages/users/users.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { WrongUrlComponent } from './pages/wrong-url/wrong-url.component';

const routes: Routes = [
  
  {path:'', redirectTo:'/home',pathMatch:'full'},
  {path: 'home', component: HomeComponent,
  children:[
    {path:'', component: WelcomeComponent},
    {
      path:'lists', component: OverviewComponent, canActivate: [RouteGuard],
      data:{
        role1: "Admin",
        role2: "User",
      },
    },
  {
    path: 'new', component: NewComponent, canActivate: [RouteGuard],
    data:{
      role1: "Admin",
      role2: "User",
    },
  },
  {
    path: 'users', component: UsersComponent, canActivate: [RouteGuard],
    data:{
      role1: "Admin"
    },
  },
  {
    path: 'lists/:id', component: DetailsComponent, canActivate: [RouteGuard],
    data:{
      role1: "Admin",
      role2: "User",
    },
  },
  //{path:":all", component: WrongUrlComponent}
  ]},
  {path:":all", component: WrongUrlComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
