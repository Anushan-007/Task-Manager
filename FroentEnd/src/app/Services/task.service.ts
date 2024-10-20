import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http : HttpClient)
   {

  }

  getTask(){
    return this.http.get<any[]>('http://localhost:5024/api/TaskItems');
  }

  

}
