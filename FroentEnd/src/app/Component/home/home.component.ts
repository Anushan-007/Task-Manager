import { Component } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { Task } from '../../Models/Task';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgStyle } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

 

  task: any[] = [];


  constructor(private taskService: TaskService ) {
  
  }

  ngOnInit() {
    this.loadTask();
  }

  onDelete(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe((data) => {
      this.loadTask();
    });
  }

  loadTask() {
    this.taskService.getTask().subscribe({
      next: (res: any) => {
        let response = res.map((task: any) => new Task(task));
        this.task = res;
        console.log(response);
      },
      complete: () => {},
      error(error: any) {
        console.log(error);
      },
    });
  }
}
