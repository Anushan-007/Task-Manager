import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../Services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Task } from '../../Models/Task';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit {
  
  addTaskForm: FormGroup;
  currentID : number;
  currenTask! : any ;

  constructor(private fb:FormBuilder , private taskService :TaskService, private router:Router, private route:ActivatedRoute, private toastr : ToastrService)  {
    this.currentID =  (Number)(this.route.snapshot.paramMap.get("id"));
    this.addTaskForm = this.fb.group({
      id: ['',[]],
      title: ['',[Validators.required]],
      description: ['',[Validators.required]],
      dueDate: ['',[Validators.required]],
      priority: ['Medium',[Validators.required]],
    })

  }
  ngOnInit(): void {
    this.taskService.getTaskById(this.currentID).subscribe(data => {
      this.currenTask = data;
      this.currenTask.dueDate = new Date (this.currenTask.dueDate).toISOString().slice(0,10);
      this.addTaskForm.patchValue(data);
    })
  }


    onSubmit(){
      
      const task = this.addTaskForm.value;
      this.taskService.updateTask(task, this.currentID).subscribe(data => {
        this.toastr.success("Task is Updated Successfully", "Success");
        this.router.navigate(['list-task']);
      })


      }

      onCancel(){
        this.router.navigate(['list-task'])
    }


  
    }

    

 


