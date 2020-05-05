import { Component, OnInit } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-api-counters',
  templateUrl: './api-counters.component.html',
  styleUrls: ['./api-counters.component.css']
})
export class ApiCountersComponent implements OnInit {

  resonse: any = [];
  public showApiSummary = [];
  public apiReportDate
  
  constructor(private _getReport: NewDataService, private _getApiSummary: NewDataService) { }

  ngOnInit() {
    this._getApiSummary.getApiSummary()
      .subscribe(data => this.showApiSummary = data);

    this._getApiSummary.getApiSummary()
      .subscribe(data => {
        this.apiReportDate = data.map(i => i.reportDate);
        this.apiReportDate = new Date(this.apiReportDate)
      });
  }
}
