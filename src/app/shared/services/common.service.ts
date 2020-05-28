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
  
}
