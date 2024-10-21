import { Component } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { Task } from '../../Models/Task';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgStyle } from '@angular/common';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FilterTaskPipe } from '../../Pipes/filter-task.pipe';
import { ToastrService } from 'ngx-toastr';
import { ITask } from '../../Interfaces/ITask';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet, NgStyle, FilterTaskPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  SearchTerm:string='' ;

  task: ITask[] = [];


  constructor(private taskService: TaskService , private routes:Router, private toastr:ToastrService) {
  
  }

  ngOnInit() {
    this.loadTask();
  }

  onDelete(taskId: number) {
    if (confirm("Do you want to Delete...")) {
      this.taskService.deleteTask(taskId).subscribe((data) => {
        this.toastr.success("Successfully Deleted","Deleted", {
          positionClass: 'toast-top-center'
        });
       
        this.loadTask();
      });
    }
   
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


  onEdit(taskId:number){
    this.routes.navigate(['/edit',taskId ])
  }
}
