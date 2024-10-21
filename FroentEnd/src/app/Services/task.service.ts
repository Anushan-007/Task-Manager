import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITask } from '../Interfaces/ITask';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http : HttpClient)
   {

  }

  getTask(){
    return this.http.get<ITask[]>('http://localhost:5024/api/TaskItems');
  }

  createTask(task:ITask){
    return this.http.post('http://localhost:5024/api/TaskItems',task);
  }

  deleteTask(taskId:number){
    return this.http.delete('http://localhost:5024/api/TaskItems/'+ taskId);
  }

  getTaskById(taskId:number){
    return this.http.get('http://localhost:5024/api/TaskItems/'+ taskId);
  }

  updateTask(task: ITask , taskId:number){
    return this.http.put('http://localhost:5024/api/TaskItems/'+ taskId, task);
  }

}
