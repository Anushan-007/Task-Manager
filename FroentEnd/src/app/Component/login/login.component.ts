import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RegisterService } from '../../Services/register.service';
import { Login } from '../../Models/login';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm:FormGroup;
  // login!:Login;
  loginData!:Login;

  constructor(private fb:FormBuilder, private registerService:RegisterService, private router:Router){
    this.loginForm = this.fb.group({
      email:[''],
      password:['']
    })
  }

  ngLogin(){
    this.loginData = this.loginForm.value;
    console.log(this.loginData = this.loginForm.value);
    
    this.registerService.UserLogin(this.loginData).subscribe(data => {
      localStorage.setItem("token", data);
      this.router.navigate(['/admin/list-task']);
   

    }) 
  } 

}
