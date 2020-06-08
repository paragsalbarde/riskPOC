import { Component, OnInit, OnChanges, ViewChild, EventEmitter, Input, ViewEncapsulation, Output } from '@angular/core';
import { ReportService } from './../../../shared/services/report.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css']
})
export class MaterialTableComponent implements OnInit, OnChanges {
  @Input() tableData;
  displayedColumns: string[] = ['apiVersion', 'apiName', 'apiType', 'apiRiskClassificatin', 
  'ramlReviewStatus', 'ramlReviewDate', 'veracodeStatus',
  'penTestStatus', 'penTestDate', 'veracodeSlaBreach',  'penTestSlaBreach', 'ramlReviewPending', 'overallRiskClassification', 'transactionCycle'];
  //veracodeDate
  //riskScore
  //businessUnit
  public dataSource:any = [];
  
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;

  @Output() addComment = new EventEmitter();
     
  constructor(private _getReport: ReportService ) { }

  ngOnChanges() {
    //console.log(this.tableData);
    this.dataSource = new MatTableDataSource<ColumElement>(this.tableData);
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
  
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  performAction(data) {
    this.addComment.emit(data);
  }
}
export interface ColumElement {
  apiVersion: string;
  apiName: string;
  apiType: string;
  apiRiskClassificatin: string;
  ramlReviewStatus: string;
  ramlReviewDate: string;
  veracodeStatus: string;
  veracodeDate: string;
  penTestStatus: string;
  penTestDate: string;
  veracodeSlaBreach:string;
  penTestSlaBreach:string;
  ramlReviewPending: string;
  riskScore: string;
  overallRiskClassification: string;
  transactionCycle: string;
  businessUnit: string;
}
