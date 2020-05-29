import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { CommonService } from './../../../shared/services/common.service';

import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-table-map',
  templateUrl: './table-map.component.html',
  styleUrls: ['./table-map.component.css']
})
export class TableMapComponent implements OnInit, OnChanges {

  @Input() riskData;
  @Input() holisticMapData;
  @Output() chartDetails = new EventEmitter();
  
  public tableData:any = {
    internal : {
      critical : {
        PendingPenTesting: 0,
        PendingVeracodeScan: 0,
        PendingRamlReview: 0,
        PenTestSLABreach: 0,
        VeracodeSLABreach: 0,
      },
      high : {
        PendingPenTesting: 0,
        PendingVeracodeScan: 0,
        PendingRamlReview: 0,
        PenTestSLABreach: 0,
        VeracodeSLABreach: 0,
      },
      medium : {
        PendingPenTesting: 0,
        PendingVeracodeScan: 0,
        PendingRamlReview: 0,
        PenTestSLABreach: 0,
        VeracodeSLABreach: 0,
      },
      low : {
        PendingPenTesting: 0,
        PendingVeracodeScan: 0,
        PendingRamlReview: 0,
        PenTestSLABreach: 0,
        VeracodeSLABreach: 0,
      }
    },
    external : {
      critical : {
        PendingPenTesting: 0,
        PendingVeracodeScan: 0,
        PendingRamlReview: 0,
        PenTestSLABreach: 0,
        VeracodeSLABreach: 0,
      },
      high : {
        PendingPenTesting: 0,
        PendingVeracodeScan: 0,
        PendingRamlReview: 0,
        PenTestSLABreach: 0,
        VeracodeSLABreach: 0,
      },
      medium : {
        PendingPenTesting: 0,
        PendingVeracodeScan: 0,
        PendingRamlReview: 0,
        PenTestSLABreach: 0,
        VeracodeSLABreach: 0,
      },
      low : {
        PendingPenTesting: 0,
        PendingVeracodeScan: 0,
        PendingRamlReview: 0,
        PenTestSLABreach: 0,
        VeracodeSLABreach: 0,
      }
    },
    sum : {
      add_PendingPenTesting:0, 
      add_PendingVeracodeScan:0,
      add_penTestSlaBreach:0,
      add_veracodeSlaBreach:0,
      add_ramlReviewStatus:0,
    }
  };
  
  constructor(private _cs: CommonService) { }

  ngOnInit() {
  
   //this.iterateTableData();
   //this.iterateSumData();
  }
  ngOnChanges() {
    this.iterateTableData();
    this.iterateSumData();
  }
  iterateTableData() {
    let riskGroup = this._cs.groupBy(this.riskData, 'apiType');
    let groupStatusInt = this._cs.groupBy(riskGroup['Internal'], 'apiRiskClassificatin');
    let groupStatusExt = this._cs.groupBy(riskGroup['External'], 'apiRiskClassificatin');
    //Internal 
      //Internal//Critical
      this.tableData.internal.critical['PendingPenTesting'] = (groupStatusInt !== undefined && groupStatusInt['Critical'] !== undefined) ?  groupStatusInt['Critical'].filter(i => i.penTestStatus === 'Pending').length : 0;
      this.tableData.internal.critical['PendingVeracodeScan'] = (groupStatusInt !== undefined && groupStatusInt['Critical'] !== undefined) ? groupStatusInt['Critical'].filter(i => i.veracodeStatus === 'Pending').length : 0;
      this.tableData.internal.critical['PendingRamlReview'] = (groupStatusInt !== undefined && groupStatusInt['Critical'] !== undefined) ? groupStatusInt['Critical'].filter(i => i.ramlReviewStatus === 'Pending').length : 0;
      this.tableData.internal.critical['PenTestSLABreach'] = (groupStatusInt !== undefined && groupStatusInt['Critical'] !== undefined) ? groupStatusInt['Critical'].filter(i => i.penTestSlaBreach === 'SLA Breached').length : 0;
      this.tableData.internal.critical['VeracodeSLABreach'] = (groupStatusInt !== undefined && groupStatusInt['Critical'] !== undefined) ? groupStatusInt['Critical'].filter(i => i.veracodeSlaBreach === 'SLA Breached').length : 0;
      //Internal//High
      this.tableData.internal.high['PendingPenTesting'] = (groupStatusInt !== undefined && groupStatusInt['High'] !== undefined) ? groupStatusInt['High'].filter(i => i.penTestStatus === 'Pending').length : 0;
      this.tableData.internal.high['PendingVeracodeScan'] = (groupStatusInt !== undefined && groupStatusInt['High'] !== undefined) ? groupStatusInt['High'].filter(i => i.veracodeStatus === 'Pending').length : 0;
      this.tableData.internal.high['PendingRamlReview'] = (groupStatusInt !== undefined && groupStatusInt['High'] !== undefined) ? groupStatusInt['High'].filter(i => i.ramlReviewStatus === 'Pending').length : 0;
      this.tableData.internal.high['PenTestSLABreach'] = (groupStatusInt !== undefined && groupStatusInt['High'] !== undefined) ? groupStatusInt['High'].filter(i => i.penTestSlaBreach === 'SLA Breached').length : 0;
      this.tableData.internal.high['VeracodeSLABreach'] = (groupStatusInt !== undefined && groupStatusInt['High'] !== undefined) ? groupStatusInt['High'].filter(i => i.veracodeSlaBreach === 'SLA Breached').length : 0;
      //Internal//Medium
      this.tableData.internal.medium['PendingPenTesting'] = (groupStatusInt !== undefined && groupStatusInt['Medium'] !== undefined) ? groupStatusInt['Medium'].filter(i => i.penTestStatus === 'Pending').length : 0;
      this.tableData.internal.medium['PendingVeracodeScan'] = (groupStatusInt !== undefined && groupStatusInt['Medium'] !== undefined) ? groupStatusInt['Medium'].filter(i => i.veracodeStatus === 'Pending').length : 0;
      this.tableData.internal.medium['PendingRamlReview'] = (groupStatusInt !== undefined && groupStatusInt['Medium'] !== undefined) ? groupStatusInt['Medium'].filter(i => i.ramlReviewStatus === 'Pending').length : 0;
      this.tableData.internal.medium['PenTestSLABreach'] = (groupStatusInt !== undefined && groupStatusInt['Medium'] !== undefined) ? groupStatusInt['Medium'].filter(i => i.penTestSlaBreach === 'SLA Breached').length : 0;
      this.tableData.internal.medium['VeracodeSLABreach'] = (groupStatusInt !== undefined && groupStatusInt['Medium'] !== undefined) ? groupStatusInt['Medium'].filter(i => i.veracodeSlaBreach === 'SLA Breached').length : 0;
      //Internal//Low
      this.tableData.internal.low['PendingPenTesting'] = (groupStatusInt !== undefined && groupStatusInt['Low'] !== undefined) ? groupStatusInt['Low'].filter(i => i.penTestStatus === 'Pending').length : 0;
      this.tableData.internal.low['PendingVeracodeScan'] = (groupStatusInt !== undefined && groupStatusInt['Low'] !== undefined) ? groupStatusInt['Low'].filter(i => i.veracodeStatus === 'Pending').length : 0;
      this.tableData.internal.low['PendingRamlReview'] = (groupStatusInt !== undefined && groupStatusInt['Low'] !== undefined) ? groupStatusInt['Low'].filter(i => i.ramlReviewStatus === 'Pending').length : 0;
      this.tableData.internal.low['PenTestSLABreach'] = (groupStatusInt !== undefined && groupStatusInt['Low'] !== undefined) ? groupStatusInt['Low'].filter(i => i.penTestSlaBreach === 'SLA Breached').length : 0;
      this.tableData.internal.low['VeracodeSLABreach'] = (groupStatusInt !== undefined && groupStatusInt['Low'] !== undefined) ? groupStatusInt['Low'].filter(i => i.veracodeSlaBreach === 'SLA Breached').length : 0;
    //External
      //External//Critical    
      this.tableData.external.critical['PendingPenTesting'] = (groupStatusExt !== undefined && groupStatusExt['Critical'] !== undefined) ? groupStatusExt['Critical'].filter(i => i.penTestStatus === 'Pending').length : 0;
      this.tableData.external.critical['PendingVeracodeScan'] = (groupStatusExt !== undefined && groupStatusExt['Critical'] !== undefined) ? groupStatusExt['Critical'].filter(i => i.veracodeStatus === 'Pending').length : 0;
      this.tableData.external.critical['PendingRamlReview'] = (groupStatusExt !== undefined && groupStatusExt['Critical'] !== undefined) ? groupStatusExt['Critical'].filter(i => i.ramlReviewStatus === 'Pending').length : 0;
      this.tableData.external.critical['PenTestSLABreach'] = (groupStatusExt !== undefined && groupStatusExt['Critical'] !== undefined) ? groupStatusExt['Critical'].filter(i => i.penTestSlaBreach === 'SLA Breached').length : 0;
      this.tableData.external.critical['VeracodeSLABreach'] = (groupStatusExt !== undefined && groupStatusExt['Critical'] !== undefined) ? groupStatusExt['Critical'].filter(i => i.veracodeSlaBreach === 'SLA Breached').length : 0;
      //External//High
      this.tableData.external.high['PendingPenTesting'] = (groupStatusExt !== undefined && groupStatusExt['High'] !== undefined) ? groupStatusExt['High'].filter(i => i.penTestStatus === 'Pending').length : 0;
      this.tableData.external.high['PendingVeracodeScan'] = (groupStatusExt !== undefined && groupStatusExt['High'] !== undefined) ? groupStatusExt['High'].filter(i => i.veracodeStatus === 'Pending').length : 0;
      this.tableData.external.high['PendingRamlReview'] = (groupStatusExt !== undefined && groupStatusExt['High'] !== undefined) ? groupStatusExt['High'].filter(i => i.ramlReviewStatus === 'Pending').length : 0;
      this.tableData.external.high['PenTestSLABreach'] = (groupStatusExt !== undefined && groupStatusExt['High'] !== undefined) ? groupStatusExt['High'].filter(i => i.penTestSlaBreach === 'SLA Breached').length : 0;
      this.tableData.external.high['VeracodeSLABreach'] = (groupStatusExt !== undefined && groupStatusExt['High'] !== undefined) ? groupStatusExt['High'].filter(i => i.veracodeSlaBreach === 'SLA Breached').length : 0;
      //External//Medium
      this.tableData.external.medium['PendingPenTesting'] = (groupStatusExt !== undefined && groupStatusExt['Medium'] !== undefined) ? groupStatusExt['Medium'].filter(i => i.penTestStatus === 'Pending').length : 0;
      this.tableData.external.medium['PendingVeracodeScan'] = (groupStatusExt !== undefined && groupStatusExt['Medium'] !== undefined) ? groupStatusExt['Medium'].filter(i => i.veracodeStatus === 'Pending').length : 0;
      this.tableData.external.medium['PendingRamlReview'] = (groupStatusExt !== undefined && groupStatusExt['Medium'] !== undefined) ? groupStatusExt['Medium'].filter(i => i.ramlReviewStatus === 'Pending').length : 0;
      this.tableData.external.medium['PenTestSLABreach'] = (groupStatusExt !== undefined && groupStatusExt['Medium'] !== undefined) ? groupStatusExt['Medium'].filter(i => i.penTestSlaBreach === 'SLA Breached').length : 0;
      this.tableData.external.medium['VeracodeSLABreach'] = (groupStatusExt !== undefined && groupStatusExt['Medium'] !== undefined) ? groupStatusExt['Medium'].filter(i => i.veracodeSlaBreach === 'SLA Breached').length : 0;
      //External//Low
      this.tableData.external.low['PendingPenTesting'] = (groupStatusExt !== undefined && groupStatusExt['Low'] !== undefined) ? groupStatusExt['Low'].filter(i => i.penTestStatus === 'Pending').length : 0;
      this.tableData.external.low['PendingVeracodeScan'] = (groupStatusExt !== undefined && groupStatusExt['Low'] !== undefined) ? groupStatusExt['Low'].filter(i => i.veracodeStatus === 'Pending').length : 0;
      this.tableData.external.low['PendingRamlReview'] = (groupStatusExt !== undefined && groupStatusExt['Low'] !== undefined) ? groupStatusExt['Low'].filter(i => i.ramlReviewStatus === 'Pending').length : 0;
      this.tableData.external.low['PenTestSLABreach'] = (groupStatusExt !== undefined && groupStatusExt['Low'] !== undefined) ? groupStatusExt['Low'].filter(i => i.penTestSlaBreach === 'SLA Breached').length : 0;
      this.tableData.external.low['VeracodeSLABreach'] = (groupStatusExt !== undefined && groupStatusExt['Low'] !== undefined) ? groupStatusExt['Low'].filter(i => i.veracodeSlaBreach === 'SLA Breached').length : 0;
      //console.log(this.tableData);
  }
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
  iterateSumData() {
    this.tableData.sum.add_PendingPenTesting = this.riskData.filter(i => i.penTestStatus === 'Pending')
    .map(i => i.apiName).length;
    this.tableData.sum.add_PendingVeracodeScan = this.riskData.filter(i => i.veracodeStatus === 'Pending')
        .map(i => i.apiName).length;
    this.tableData.sum.add_ramlReviewStatus = this.riskData.filter(i => i.ramlReviewStatus === 'Pending')
        .map(i => i.apiName).length;
    this.tableData.sum.add_penTestSlaBreach = this.riskData.filter(i => i.penTestSlaBreach === 'SLA Breached')
        .map(i => i.apiName).length;
    this.tableData.sum.add_veracodeSlaBreach = this.riskData.filter(i => i.veracodeSlaBreach === 'SLA Breached')
        .map(i => i.apiName).length;
  }
  clickPartition(data) {
      this.chartDetails.emit(data);
  }
}
