import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ReportService } from './../../../shared/services/report.service';

@Component({
  selector: 'report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css']
})
export class ReporttableComponent implements OnInit {
  @Input() tableData;
    resonse: any = [];
    public holisticMapData = [];
    public add_PendingPenTesting;
    public add_PendingVeracodeScan;
    public add_penTestSlaBreach;
    public add_veracodeSlaBreach;
    public add_ramlReviewStatus 
  constructor(private _getReport: ReportService ) { }

  ngOnInit() {
    //console.log(this.tableData)
  }
}
