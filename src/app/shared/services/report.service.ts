import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { APISummaryMap } from './schema/apiSummary';
import { holisticMap } from './schema/holisticTableMap';
import { RiskDetailsMap } from './schema/RiskDetailsMap';

@Injectable()
export class ReportService {
  
  constructor(private _http: HttpClient) { }
  
  getReport(){
    return this._http.get<any[]>('./assets/json/riskReport.json', {responseType: 'json'})
    .map(res => res);
  }

  getRiskReport(){
    return this._http.get<any[]>('./assets/json/riskReport.json', {responseType: 'json'})
    .map(res => res['RiskScoreDetails']);
  }

  getApiSummary():Observable<APISummaryMap[]>{
    return this._http.get<APISummaryMap[]>('./assets/json/riskReport.json', {responseType: 'json'})
    .map(res => res['externalAPISummaryMap']);
  }

  getHolisticMap():Observable<holisticMap[]>{
    return this._http.get<holisticMap[]>('./assets/json/riskReport.json', {responseType: 'json'})
    .map(res => res['holisticTableMap']);
  }

  getRiskDetailsArray():Observable<RiskDetailsMap[]>{
    return this._http.get<RiskDetailsMap[]>('./assets/json/riskReport.json', {responseType: 'json'})
    .map(res => res['RiskScoreDetails']);
  }
}
