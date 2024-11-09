import { Component } from '@angular/core';
import {  RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { HttpClientModule , HttpClient} from '@angular/common/http';
import { AddTaskComponent } from "./Component/add-task/add-task.component";
import { EditTaskComponent } from './Component/edit-task/edit-task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, AddTaskComponent ,EditTaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularNoStandAlone';
}

