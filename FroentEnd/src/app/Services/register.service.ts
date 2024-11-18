import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserRegister } from '../Interfaces/UserRegister';
import { Login } from '../Models/login';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  AddRegisterUser(UserRegister:IUserRegister){
    return this.http.post<any>('http://localhost:5024/api/UserRegister/Register', UserRegister)
   
  }

  UserLogin(login:Login){
    return this.http.post('http://localhost:5024/api/UserRegister/Login', login,{
      responseType:'text'
    });
  }

  isLoggedIn(){
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded:any = jwtDecode(token);
        console.log(decoded);
        
        localStorage.setItem("name", decoded.FullName)
        localStorage.setItem("Role", decoded.Roles)
      }
      return true;
    }else{
      return false;
    }
  }



}
