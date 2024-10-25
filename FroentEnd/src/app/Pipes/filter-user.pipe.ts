import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../Interfaces/IUser';
import { ITask } from '../Interfaces/ITask';

@Pipe({
  name: 'filterUser',
  standalone: true
})
export class FilterUserPipe implements PipeTransform {

  transform(value: IUser[], ...args: string[]): IUser[]{
    
    const searchText = args[0];
    if(!searchText){
      return value;
    }
    //  return value.filter((a:IUser) =>{
    //   console.log(a.name);
    //   a.name.toLowerCase().includes(searchText.toLowerCase())
    //  } );

    return value.filter((a:IUser) => a.name.toLowerCase().includes(searchText.toLowerCase()) || a.email.toLowerCase().includes(searchText.toLowerCase()))

  }

}
