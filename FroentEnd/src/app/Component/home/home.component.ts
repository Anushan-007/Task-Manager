import { Component } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { Task } from '../../Models/Task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  task:any [] = [];

  constructor(private taskService : TaskService){

  }

  ngOnInit(){
    this.taskService.getTask().subscribe({
      next:(res:any) => {

        let response = res.map((task:any) => new Task(task));
        this.task = res;
          console.log(response);
          
      },
      complete:()=>{
        
      },
      error(error:any){
        console.log(error);
      }
    })
  }

}
