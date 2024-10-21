import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../Services/task.service';
import { Router, Routes } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

  addTaskForm: FormGroup;

  constructor(private fb:FormBuilder , private taskService :TaskService, private router:Router, private toastr:ToastrService){

    this.addTaskForm = this.fb.group({
      title: ['',[Validators.required]],
      description: ['',[Validators.required]],
      dueDate: ['',[Validators.required]],
      priority: ['Medium',[Validators.required]]
    })

  }


  onSubmit(){
    let task = this.addTaskForm.value;
    this.taskService.createTask(task).subscribe(data => {
      this.router.navigate (['list-task'])
      this.toastr.success("Task is Created Successfully", "Created")
    })

  }

  onCancel(){
      
      this.toastr.warning("Cancel Add Task item", "Cancelled"), {
        setTimeout : 5000 , 
      }
      this.router.navigate(['list-task'])   
  }

}
