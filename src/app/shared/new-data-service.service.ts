import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { APISummary } from './apiSummary';
import { holisticMap } from './holisticTableMap';
import { RiskDetailsArray } from './riskDetailsArray';
import { SunBurstChartData } from './sunBurstChartData';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable()
export class NewDataService {
  
  constructor(private _http: HttpClient) { }
  
  getReport(){
    return this._http.get<any[]>('./assets/json/riskReport.json', {responseType: 'json'})
    .map(res => res);
  }

  getRiskReport(){
    return this._http.get<any[]>('./assets/json/riskReport.json', {responseType: 'json'})
    .map(res => res['RiskScoreDetails']);
  }

  getApiSummary():Observable<APISummary[]>{
    return this._http.get<APISummary[]>('./assets/json/riskReport.json', {responseType: 'json'})
    .map(res => res['externalAPISummaryMap']);
  }

  getHolisticMap():Observable<holisticMap[]>{
    return this._http.get<holisticMap[]>('./assets/json/riskReport.json', {responseType: 'json'})
    .map(res => res['holisticTableMap']);
  }

  getRiskDetailsArray():Observable<RiskDetailsArray[]>{
    return this._http.get<RiskDetailsArray[]>('./assets/json/riskReport.json', {responseType: 'json'})
    .map(res => res['RiskScoreDetails']);
  }

  getSunBurstChartData():Observable<SunBurstChartData[]>{
    return this._http.get<SunBurstChartData[]>('./assets/json/riskReport.json', {responseType: 'json'})
    .map(res => res['RiskScoreDetails']);
  }

  
}
