import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { AddTaskComponent } from './Component/add-task/add-task.component';
import { NgModule } from '@angular/core';
import { EditTaskComponent } from './Component/edit-task/edit-task.component';
import { UserListComponent } from './Component/user-list/user-list.component';
import { UserAddComponent } from './Component/user-add/user-add.component';
import { RegisterComponent } from './Component/register/register.component';
import { LoginComponent } from './Component/login/login.component';

export const routes: Routes = [
   { path: 'list-task', component:HomeComponent  },
  { path: 'add-task', component: AddTaskComponent },
  {path: 'edit/:id', component:EditTaskComponent},
  {path:'user-list', component:UserListComponent},
  {path: 'user-add', component:UserAddComponent},
  {path : 'user-edit/:id', component:UserAddComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent}
];
