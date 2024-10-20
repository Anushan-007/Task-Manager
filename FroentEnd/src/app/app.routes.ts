import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { AddTaskComponent } from './Component/add-task/add-task.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component:HomeComponent  },
  { path: 'add-task', component: AddTaskComponent }

];
