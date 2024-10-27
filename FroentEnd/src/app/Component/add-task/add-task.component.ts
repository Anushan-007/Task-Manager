import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../Services/task.service';
import { Router, Routes } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../Interfaces/IUser';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit{

  addTaskForm: FormGroup;
  Users:IUser[] = [];

  constructor(private fb:FormBuilder , private taskService :TaskService, private router:Router, private toastr:ToastrService, private userService:UserService) {

    this.addTaskForm = this.fb.group({
      title: ['',[Validators.required]],
      description: ['',[Validators.required]],
      dueDate: ['',[Validators.required]],
      priority: ['Medium',[Validators.required]],
      UserId: ['']
    })

  }
  ngOnInit(): void {
    this.userService.getUser().subscribe(data => {
      this.Users = data;
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
