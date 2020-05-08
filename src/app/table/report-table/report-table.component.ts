import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ReportService } from './../../shared/services/report.service';

@Component({
  selector: 'report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css']
})
export class ReporttableComponent implements OnInit {
    resonse: any = [];
    public holisticMapData = [];
    public add_PendingPenTesting;
    public add_PendingVeracodeScan;
    public add_penTestSlaBreach;
    public add_veracodeSlaBreach;
    public add_ramlReviewStatus 
  constructor(private _getReport: ReportService ) { }

  ngOnInit() {
    this._getReport.getHolisticMap().subscribe(data => {
        this.holisticMapData = data;
         //START: Column Additions 
        this._getReport.getReport().subscribe(data => {

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
    });
  }
}
