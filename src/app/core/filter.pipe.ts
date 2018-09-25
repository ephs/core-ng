import { Pipe, PipeTransform } from '@angular/core';
import {AvailableSessions} from "./models/available-sessions";
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(sessions$: AvailableSessions[], searchText: string): any[] {
    console.log(sessions$);
    console.log("hi1");
    if(!sessions$) return [];
    console.log(searchText);
    if(!searchText) return sessions$;
    searchText = searchText.toLowerCase();
    console.log("hi");
    return sessions$.filter( it => {
      return it.name.toLowerCase().includes(searchText);
    });
  }
}
