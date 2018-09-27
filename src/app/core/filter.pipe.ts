import { Pipe, PipeTransform } from '@angular/core';
import {AvailableSessions} from "./models/available-sessions";
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(sessions$: AvailableSessions[], searchText: string): any[] {
    if(!sessions$) return [];
    if(!searchText) return sessions$;
    searchText = searchText.toLowerCase();
    return sessions$.filter( it => {
      return it.name.toLowerCase().includes(searchText) || it.category.toLowerCase().includes(searchText) || it.lastName.toLowerCase().includes(searchText);
    });
  }
}
