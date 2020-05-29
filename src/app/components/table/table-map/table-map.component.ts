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
      Critical : {
        PendingPenTesting: 0,
        PendingVeracodeScan: 0,
        PendingRamlReview: 0,
        PenTestSLABreach: 0,
        VeracodeSLABreach: 0,
      },
      High : {
        PendingPenTesting: 0,
        PendingVeracodeScan: 0,
        PendingRamlReview: 0,
        PenTestSLABreach: 0,
        VeracodeSLABreach: 0,
      },
      Medium : {
        PendingPenTesting: 0,
        PendingVeracodeScan: 0,
        PendingRamlReview: 0,
        PenTestSLABreach: 0,
        VeracodeSLABreach: 0,
      },
      Low : {
        PendingPenTesting: 0,
        PendingVeracodeScan: 0,
        PendingRamlReview: 0,
        PenTestSLABreach: 0,
        VeracodeSLABreach: 0,
      }
    },
    external : {
      Critical : {
        PendingPenTesting: 0,
        PendingVeracodeScan: 0,
        PendingRamlReview: 0,
        PenTestSLABreach: 0,
        VeracodeSLABreach: 0,
      },
      High : {
        PendingPenTesting: 0,
        PendingVeracodeScan: 0,
        PendingRamlReview: 0,
        PenTestSLABreach: 0,
        VeracodeSLABreach: 0,
      },
      Medium : {
        PendingPenTesting: 0,
        PendingVeracodeScan: 0,
        PendingRamlReview: 0,
        PenTestSLABreach: 0,
        VeracodeSLABreach: 0,
      },
      Low : {
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
  }
  ngOnChanges() {
    this.iterateTableData();
    this.iterateSumData();
  }
  iterateTableData() {
    let arrStatus = ['Critical', 'High', 'Medium', 'Low'];
    let arrType = ['internal', 'external'];

    let riskGroup = this._cs.groupBy(this.riskData, 'apiType');
    let groupStatusInt = this._cs.groupBy(riskGroup['Internal'], 'apiRiskClassificatin');
    let groupStatusExt = this._cs.groupBy(riskGroup['External'], 'apiRiskClassificatin');
    arrType.forEach(type => {
      let objData = (type == 'internal') ? groupStatusInt : groupStatusExt;
      arrStatus.forEach(status => {
        //Internal_External
        this.tableData[type][status]['PendingPenTesting'] = (objData !== undefined && objData[status] !== undefined) ?  objData[status].filter(i => i.penTestStatus === 'Pending').length : 0;
        this.tableData[type][status]['PendingVeracodeScan'] = (objData !== undefined && objData[status] !== undefined) ? objData[status].filter(i => i.veracodeStatus === 'Pending').length : 0;
        this.tableData[type][status]['PendingRamlReview'] = (objData !== undefined && objData[status] !== undefined) ? objData[status].filter(i => i.ramlReviewStatus === 'Pending').length : 0;
        this.tableData[type][status]['PenTestSLABreach'] = (objData !== undefined && objData[status] !== undefined) ? objData[status].filter(i => i.penTestSlaBreach === 'SLA Breached').length : 0;
        this.tableData[type][status]['VeracodeSLABreach'] = (objData !== undefined && objData[status] !== undefined) ? objData[status].filter(i => i.veracodeSlaBreach === 'SLA Breached').length : 0;
      });
    });
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
