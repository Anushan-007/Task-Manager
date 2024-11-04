import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserRegister } from '../Interfaces/UserRegister';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  AddRegisterUser(UserRegister:IUserRegister){
    return this.http.post('http://localhost:5024/api/UserRegister', UserRegister)
  }
}
