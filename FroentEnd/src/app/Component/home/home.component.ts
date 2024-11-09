import { Component, TemplateRef } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { Task } from '../../Models/Task';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgStyle } from '@angular/common';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FilterTaskPipe } from '../../Pipes/filter-task.pipe';
import { ToastrService } from 'ngx-toastr';
import { ITask } from '../../Interfaces/ITask';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet, NgStyle, FilterTaskPipe],
  providers: [BsModalService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})


export class HomeComponent {

  SearchTerm:string='' ;

  task: ITask[] = [];
  modalRef?: BsModalRef;
  message?: string;
  deleteId: number=0;

  constructor(private taskService: TaskService , private routes:Router, private toastr:ToastrService, private modalService: BsModalService) {
  
  }

  ngOnInit() {
    this.loadTask();
  }

  onDelete(taskId: number , template: TemplateRef<void>) {

    this.deleteId = taskId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });

    // if (confirm("Do you want to Delete...")) {
    //   this.taskService.deleteTask(taskId).subscribe((data) => {
    //     this.toastr.success("Successfully Deleted","Deleted", {
    //       positionClass: 'toast-top-center'
    //     });
       
    //     this.loadTask();
    //   });
    //}
   
  }

  loadTask() {
    this.taskService.getTask().subscribe({
      next: (res: any) => {
        let response = res.map((task: any) => new Task(task));
        this.task = res;
        console.log( res);
      },
      complete: () => {},
      error(error: any) {
        console.log(error);      
      },
    });
  }


  onEdit(taskId:number){
    this.routes.navigate(['/admin/edit',taskId ])
  }


  confirm(): void {
    this.message = 'Confirmed!';
   
      this.taskService.deleteTask(this.deleteId).subscribe((data) => {
        this.toastr.success("Successfully Deleted","Deleted", {
          positionClass: 'toast-top-center'
        });
       
        this.loadTask();
      });
    
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

}