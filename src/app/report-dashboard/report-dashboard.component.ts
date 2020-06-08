import { Component, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { NewDataService } from '../shared/new-data-service.service';
import { ApiRiskReportDataService } from '../shared/api-risk-report-data.service';
//import {MatDialog, MatDialogConfig} from "@angular/material";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiDetailsComponent } from './../modal/api-details/api-details.component';
import { holisticMap } from './../shared/services/schema/holisticTableMap';
//Services
import { CommonService } from './../shared/services/common.service';


@Component({
  selector: 'report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.css']
})
export class ReportDashboardComponent {
  public showApiSummary = [];
  public donutData: any = [];

  public pieData: any = [];
  public barData: any = [];

  public chartSetting: any = [];
  public riskData: any = [];
  public globalRiskData: any = [];
  public horizantalChartData: any = {};

  public holisticMapData:any = [];
  public APISummaryMap:any = [];

  public businessUnit:any = ['All BU'];
  public transactionCycle:any = ['All TC'];

  public riskScoreVar: any
  public riskScoreLevel: any
  

  //@Output() updateSunburst = new EventEmitter();
  
 constructor(private _riskReport:ApiRiskReportDataService,
              private _getReport : NewDataService,
              private dialog: MatDialog,
              private _cs: CommonService) {}
  
  ngOnInit() {

    this._getReport.getReport().subscribe(res => {
      //console.log(res);
      this.holisticMapData = res['holisticTableMap'];
      this.APISummaryMap = res['externalAPISummaryMap'];

      let riskData = res['RiskScoreDetails'];
      this.riskData = riskData;
      this.globalRiskData = [...riskData];
      
      riskData.forEach(element => {
        if (this.businessUnit.indexOf(element.businessUnit) === -1 && element.businessUnit !== "") {
          this.businessUnit.push(element.businessUnit);
        }
        if (this.transactionCycle.indexOf(element.transactionCycle) === -1 && element.transactionCycle) {
          this.transactionCycle.push(element.transactionCycle);
        }
      });
    })
  }
  
  onFilter(event) {
      //console.log(event);
      this.riskData = [...this.globalRiskData];
      //console.log(this.riskData);
      let filterCriteria = {};
      if(event.bu !== undefined && event.bu != "") {
        if(event.bu == "All BU") {
          filterCriteria['businessUnit'] = (businessUnit) => this.businessUnit.indexOf(businessUnit) > -1;
        } else {
          filterCriteria['businessUnit'] = (businessUnit) => businessUnit == event.bu;
        }
      }
      if(event.tc !== undefined && event.tc !== "") {
        if(event.tc == "All TC") {
          filterCriteria['transactionCycle'] = (transactionCycle) => this.transactionCycle.indexOf(transactionCycle) > -1;
        } else {
          filterCriteria['transactionCycle'] = (transactionCycle) => transactionCycle == event.tc;
        }
        
      }
      let riskData  = this._cs.filterArray(this.riskData, filterCriteria);
      this.riskData = riskData;
  }
}
