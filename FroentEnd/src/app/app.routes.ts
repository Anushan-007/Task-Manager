import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { AddTaskComponent } from './Component/add-task/add-task.component';
import { NgModule } from '@angular/core';
import { EditTaskComponent } from './Component/edit-task/edit-task.component';
import { UserListComponent } from './Component/user-list/user-list.component';
import { UserAddComponent } from './Component/user-add/user-add.component';
import { RegisterComponent } from './Component/register/register.component';
import { LoginComponent } from './Component/login/login.component';
import { BlankLayoutComponent } from './Auth/blank-layout/blank-layout.component';
import { AdminLayoutComponent } from './Admin/admin-layout/admin-layout.component';
import { AuthGuard } from './Guard/auth.guard';

export const routes: Routes = [

  {
    path:'admin',
    component:AdminLayoutComponent,
    canActivate:[AuthGuard],
    children:[
      { path: 'list-task', component:HomeComponent  },
      { path: 'add-task', component: AddTaskComponent },
      {path: 'edit/:id', component:EditTaskComponent},
      {path:'user-list', component:UserListComponent},
      {path: 'user-add', component:UserAddComponent},
      {path : 'user-edit/:id', component:UserAddComponent},
    ]
  },
  {
    path:'', 
    component:BlankLayoutComponent,
    children:[
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'register',
        component:RegisterComponent
      },{path:'**', redirectTo:'login', pathMatch:'full'}
    ]
  },
];
