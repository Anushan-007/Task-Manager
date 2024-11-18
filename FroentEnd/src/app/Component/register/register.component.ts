import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUserRegister } from '../../Interfaces/UserRegister';
import { RegisterService } from '../../Services/register.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm:FormGroup;
  UserRegister! : IUserRegister;
  Password? : string;
  
 

  constructor(private fb:FormBuilder, private registerService:RegisterService , private toaster:ToastrService, private router:Router){
   

    this.registerForm = this.fb.group({
      fullName:['',[Validators.required]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.maxLength(6)]],
      repeatPassword:['',Validators.maxLength(6)],
      roles: ['',Validators.required],
    })
  }

  onRegister(registerForm:any){
    this.UserRegister = registerForm.value;
    this.UserRegister.roles = parseInt(registerForm.value.roles)
    
    this.registerService.AddRegisterUser(this.UserRegister).subscribe(data =>{
      this.toaster.success("Sign Up Successfully", "Sign Up")
      console.log(data);
      this.router.navigate(['/admin/login'])
    })
     console.log(registerForm.value);
  }






}
