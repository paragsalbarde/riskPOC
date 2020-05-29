import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-api-counters',
  templateUrl: './api-counters.component.html',
  styleUrls: ['./api-counters.component.css']
})
export class ApiCountersComponent implements OnInit, OnChanges {

  @Input() APISummaryMap;
  @Input() riskData;

  
  public summary = {
    "extApiVeracodeScanPending": 0,
    "extApiRamlReviewPending": 0,
    "extApiPenTestPending": 0,
    "intApiRamlReviewPending": 0,
    "intApiPenTestPending": 0,
    "intApiVeracodeScanPending": 0,
    "totalVulnerabilities": 0,
    "reportDate": "2020-05-22T10:31:57.964+0000",
  }
  
  
  constructor(private _cs : CommonService) { }

  ngOnInit() {
    //this.summary = this.APISummaryMap[0];
  }
  ngOnChanges() {
    this.calcAPISummary();
  }

  calcAPISummary() {
    let riskGroup = this._cs.groupBy(this.riskData, 'apiType');
    //console.log(riskGroup);
    this.summary.totalVulnerabilities = this.riskData.length;
    // External
    this.summary.extApiPenTestPending = (riskGroup !== undefined && riskGroup['External'] !== undefined) ?  riskGroup['External'].filter(i => i.penTestStatus === 'Pending').length : 0;
    this.summary.extApiRamlReviewPending = (riskGroup !== undefined && riskGroup['External'] !== undefined) ?  riskGroup['External'].filter(i => i.veracodeStatus === 'Pending').length : 0;
    this.summary.extApiVeracodeScanPending = (riskGroup !== undefined && riskGroup['External'] !== undefined) ?  riskGroup['External'].filter(i => i.ramlReviewStatus === 'Pending').length : 0;
    // Internal
    this.summary.intApiPenTestPending = (riskGroup !== undefined && riskGroup['Internal'] !== undefined) ?  riskGroup['Internal'].filter(i => i.penTestStatus === 'Pending').length : 0;
    this.summary.intApiRamlReviewPending = (riskGroup !== undefined && riskGroup['Internal'] !== undefined) ? riskGroup['Internal'].filter(i => i.veracodeStatus === 'Pending').length : 0;
    this.summary.intApiVeracodeScanPending = (riskGroup !== undefined && riskGroup['Internal'] !== undefined) ? riskGroup['Internal'].filter(i => i.ramlReviewStatus === 'Pending').length : 0;
    //console.log(this.summary);
  }
}
