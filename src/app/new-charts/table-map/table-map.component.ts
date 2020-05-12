import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';

import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-table-map',
  templateUrl: './table-map.component.html',
  styleUrls: ['./table-map.component.css']
})
export class TableMapComponent implements OnInit {
  resonse: any = [];
  public holisticMapData = [];
  public add_PendingPenTesting;
  public add_PendingVeracodeScan;
  public add_penTestSlaBreach;
  public add_veracodeSlaBreach;
  public add_ramlReviewStatus;

  @Output() chartDetails = new EventEmitter();
  
  constructor(private _getHolisticMap: NewDataService, private _getReport: NewDataService) { }

  ngOnInit() {
    this._getHolisticMap.getHolisticMap()
    .subscribe(data => this.holisticMapData = data);

    //START: Column Additions 
    this._getReport.getReport()
    .subscribe(data => {
        this.add_PendingPenTesting = data['RiskScoreDetails'].filter(i => i.penTestStatus === 'Pending')
                          .map(i => i.apiName).length;
        this.add_PendingVeracodeScan = data['RiskScoreDetails'].filter(i => i.veracodeStatus === 'Pending')
                          .map(i => i.apiName).length;
        this.add_ramlReviewStatus = data['RiskScoreDetails'].filter(i => i.ramlReviewStatus === 'Pending')
                          .map(i => i.apiName).length;
        this.add_penTestSlaBreach = data['RiskScoreDetails'].filter(i => i.penTestSlaBreach === 'SLA Breached')
                          .map(i => i.apiName).length;
        this.add_veracodeSlaBreach = data['RiskScoreDetails'].filter(i => i.veracodeSlaBreach === 'SLA Breached')
                          .map(i => i.apiName).length;
    });
    //END

}
clickPartition(data) {
    //console.log(data);
    this.chartDetails.emit(data);
  }
}

// 1st Col
// extCriPendingPenTesting
// intMedPendingPenTesting
// extLowPendingPenTesting
// intLowPendingPenTesting
// intCriPendingPenTesting
// intHighPendingPenTesting
// extMedPendingPenTesting
// extHighPendingPenTesting

// 2nd Col
// intMedPendingVeracodeScan 
// extMedPendingVeracodeScan 
// intHighPendingVeracodeScan
// extCriPendingVeracodeScan
// intLowPendingVeracodeScan
// intCriPendingVeracodeScan
// extLowPendingVeracodeScan
// extHighPendingVeracodeScan


// 3rd Col
// intLowPenTestSLABreach 
// extCriPenTestSLABreach 
// intHighPenTestSLABreach 
// extMedPenTestSLABreach
// extLowPenTestSLABreach 
// extHighPenTestSLABreach 
// intCriPenTestSLABreach 
// intMedPenTestSLABreach

// 4th Col
// intMedVeracodeSLABreach
// extCriVeracodeSLABreach 
// extMedVeracodeSLABreach
// intLowVeracodeSLABreach 
// extLowVeracodeSLABreach 
// intHighVeracodeSLABreach 
// extHighVeracodeSLABreach 
// intCriVeracodeSLABreach 

// 5th Col
// intHighPendingRamlReview
// extLowPendingRamlReview
// extHighPendingRamlReview
// extCriPendingRamlReview
// intCriPendingRamlReview
// intMedPendingRamlReview 
// extMedPendingRamlReview 
// intLowPendingRamlReview

