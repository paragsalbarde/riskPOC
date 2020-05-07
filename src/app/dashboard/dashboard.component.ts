import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { NewDataService } from '../shared/new-data-service.service'
import { ApiRiskReportDataService } from './../shared/api-risk-report-data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  public showApiSummary = [];
  public donutData:any = [];
  public pieData:any = [];
  public barData:any = [];
  public chartSetting:any = [];
  

  constructor(private _riskReport:ApiRiskReportDataService,
  private _getReport : NewDataService) {}
  groupBy(data, column) {
    let groupData = data.reduce((r, a) => {
      r[a[column]] = [...r[a[column]] || [], a];
      return r;
     }, {});
     return groupData;
  }
  getBarData(riskData) {
    let barData = [];
    let groupRisk = this.groupBy(riskData, 'apiRiskClassificatin');
    Object.keys(groupRisk).map((column) => {
      let objData = {};
      objData['key'] = column;
      objData['values'] = [];

      let groupApiType = this.groupBy(groupRisk[column], 'apiType');
      Object.keys(groupApiType).map((column1) => {
       // console.log(groupApiType);
        let objType = {};
        objType['groupName'] = column1;
        objType['groupValue'] = groupApiType[column1].length;
        objData['values'].push(objType);
      })  
      //console.log(objData);
      barData.push(objData);
    });
    this.barData = barData;
    //console.log(barData);
  }
  ngOnInit() {
    this.avgData();
    //this._riskReport.riskReport().subscribe(riskData => {
    this._getReport.getReport().subscribe(res => {
      let riskData = res['RiskScoreDetails'];
      this.getBarData(riskData);
      //console.log(riskData['list']);

     let riskGroup = this.groupBy(riskData, 'apiType');
       //console.log("group", riskGroup);
       
       //Piechart data
       let pieChartData = {};
       pieChartData['name'] = "API Risk Overview";
       pieChartData['count'] = riskData.length;
       pieChartData['data'] = [];
       //Donut chart data
       let dountChartData = {};
       dountChartData['name'] = 'API risk';
       dountChartData['size'] = riskData.length;
       dountChartData['count'] = riskData.length;
       //
       dountChartData['children'] = Object.keys(riskGroup).map((column) => {
       // riskGroup[column].map((data) => {
            let  groupCritical = this.groupBy(riskGroup[column], 'apiRiskClassificatin');
            let chartChildData = [];
            chartChildData['children'] = Object.keys(groupCritical).map((column1) => {

              let  groupBreach = this.groupBy(groupCritical[column1], 'penTestSlaBreach');
              let chart2ChildData = [];
              chart2ChildData['children'] = Object.keys(groupBreach).map((column2) => {
                return {
                  name : ( column2 !== undefined && column2 !== "" ) ? column2 : "NA",
                  //size : groupBreach[column2].length,
                }
              });
              return {
                name : ( column1!== undefined ) ? column1 : "NA",
                size : groupCritical[column1].length,
                count : groupCritical[column1].length,
                //children : chart2ChildData['children']
              }
            })
       // })
          return {
            name : ( column!== undefined ) ? column : "NA",
            //size : riskGroup[column].length,
            count : riskGroup[column].length,
            children : chartChildData['children']
          }
       });
       this.donutData = dountChartData;
       //PieChart Data
       let groupPieData = this.groupBy(riskData, 'apiRiskClassificatin');
       Object.keys(groupPieData).map((column) => {
          let objPie = {};
          objPie['name'] = column;
          objPie['count'] = groupPieData[column].length;
          pieChartData['data'].push(objPie);
       });
      this.pieData = pieChartData;
    });    
  }

  avgData() {
    this._getReport.getReport().subscribe(res => {
      //
      let riskScores = res['RiskScoreDetails'].map(i => i.riskScore);
      let avgRiskCal = res['RiskScoreDetails'].filter(i => i.apiType)
                      .map(i => i.riskScore)
                      .reduce((a, b) => a + b, 0)/riskScores.length;

      let avgRisk = avgRiskCal.toFixed();
      let overAllRiskLevel 
      let avgRiskInt = parseInt(avgRisk)
      if (avgRiskInt >= 1 && avgRiskInt <= 6) {
              overAllRiskLevel = "Low"
      } else if (avgRiskInt >= 7 && avgRiskInt < 12) {
              overAllRiskLevel = "Medium"
      } else if (avgRiskInt >= 13 && avgRiskInt < 36) {
        overAllRiskLevel = "High"
      } else if (avgRiskInt >= 37) {
        overAllRiskLevel = "Critical"
      } else {
        overAllRiskLevel = "No Risk"
      }
      //console.log(avgRisk);
      //console.log(overAllRiskLevel);
      this.chartSetting['avgRisk'] = avgRisk;
      this.chartSetting['avgRiskLevel'] = overAllRiskLevel;
    });
  }
}
