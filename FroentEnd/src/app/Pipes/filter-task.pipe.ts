import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTask',
  standalone: true
})
export class FilterTaskPipe implements PipeTransform {

  transform(value : any, ...arg: string[]): any {
    
    const searchText = arg[0];

    return value.filter((a:any) => a.title.toLowerCase().includes(searchText.toLowerCase()) || a.description.toLowerCase().includes(searchText.toLowerCase()))
    
  }

}
