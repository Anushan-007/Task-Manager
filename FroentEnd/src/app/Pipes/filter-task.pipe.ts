import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTask',
  standalone: true
})
export class FilterTaskPipe implements PipeTransform {

  transform(items : any, ...searchText: any[]): any {
    
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    // searchText = searchText.toLocaleLowerCase();

    // return items.filter(it => {
    //   return it.toLocaleLowerCase().includes(searchText);
    // });

    
  }

}
