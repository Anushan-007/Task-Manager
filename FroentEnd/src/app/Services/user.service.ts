import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../Interfaces/IUser';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  getUser(){
    return this.http.get<IUser[]>('http://localhost:5024/api/Users');
  }

  createUser(user:IUser){
    return this.http.post('http://localhost:5024/api/Users', user);
  }

  updateUser(user:IUser, userId:number){
    return this.http.put('http://localhost:5024/api/Users/'+ userId, user);
  }

  getUserbyId(userId :number){
    return this.http.get<IUser>('http://localhost:5024/api/Users/'+ userId)
  }

}
