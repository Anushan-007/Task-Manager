import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../Interfaces/ITask';

@Pipe({
  name: 'filterTask',
  standalone: true
})
export class FilterTaskPipe implements PipeTransform {

  transform(value : ITask[], ...arg: string[]): ITask[] {
    console.log(value);
    
    const searchText = arg[0];
    
    return value.filter((a:ITask) => a.title.toLowerCase().includes(searchText.toLowerCase()) || a.description.toLowerCase().includes(searchText.toLowerCase()))
   
  }

}
