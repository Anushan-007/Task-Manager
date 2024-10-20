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

  createTask(task:any){
    return this.http.post('http://localhost:5024/api/TaskItems',task);
  }

  deleteTask(taskId:number){
    return this.http.delete('http://localhost:5024/api/TaskItems/'+ taskId);
  }

  getTaskById(taskId:number){
    return this.http.get('http://localhost:5024/api/TaskItems/'+ taskId);
  }

}
