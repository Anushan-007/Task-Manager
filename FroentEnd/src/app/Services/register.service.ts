import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserRegister } from '../Interfaces/UserRegister';
import { Login } from '../Models/login';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  AddRegisterUser(UserRegister:IUserRegister){
    return this.http.post<IUserRegister>('http://localhost:5024/api/UserRegister', UserRegister)
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
      }
      return true;
    }else{
      return false;
    }
  }



}
