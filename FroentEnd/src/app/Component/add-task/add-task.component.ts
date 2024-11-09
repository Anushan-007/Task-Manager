import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../Services/task.service';
import { Router, Routes } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../Interfaces/IUser';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, BsDatepickerModule],
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
      UserId: [''],
      checks:this.fb.array([])
    })

  }

  get MyCheckList(): FormArray{
    return this.addTaskForm.get('checks') as FormArray
  }

  addCheckList(){
    this.MyCheckList.push(
      this.fb.group({
        name:[''],
        isDone:[false]
      })
    );
  }

  removeCheckList(index:number){
    this.MyCheckList.removeAt(index);
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
      this.router.navigate(['/admin/list-task'])   
  }

}
