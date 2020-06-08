import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommonService {
  
  constructor(private _http: HttpClient) { }
  
  /*
  * Group data by columns
  */
 groupBy(data, column) {
    if(data !== undefined) {
      let groupData = data.reduce((r, a) => {
        r[a[column]] = [...r[a[column]] || [], a];
        return r;
      }, {});
      return groupData;
    }
  }

  /*
  * Function to filter arrays
  */
 filterArray(array, filters) {
  const filterKeys = Object.keys(filters);
  return array.filter(item => {
    // validates all filter criteria
    return filterKeys.every(key => {
      if (typeof filters[key] !== 'function') return true;
      return filters[key](item[key]);
    });
  });
}
  
}
