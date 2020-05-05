import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ApiRiskReportDataService {

  constructor(private _http: HttpClient) { }

  riskReport(){
    return this._http.get('./assets/json/reportJson_vinod_v2.json', {responseType: 'json'})
    .map(result => result);
  }
}