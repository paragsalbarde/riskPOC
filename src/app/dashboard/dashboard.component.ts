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
  ngOnInit() {
    this.avgData();
    this._riskReport.riskReport().subscribe(riskData => {
      //console.log(riskData['list']);

     let riskGroup = this.groupBy(riskData['list'], 'apiType');
       //console.log("group", riskGroup);
       
       //Piechart data
       let pieChartData = {};
       pieChartData['name'] = "API Risk Overview";
       pieChartData['count'] = riskData['list'].length;
       pieChartData['data'] = [];
       //Donut chart data
       let dountChartData = {};
       dountChartData['name'] = 'API risk';
       dountChartData['size'] = riskData['list'].length;
       dountChartData['count'] = riskData['list'].length;
       //
       dountChartData['children'] = Object.keys(riskGroup).map((column) => {
       // riskGroup[column].map((data) => {
            let  groupCritical = this.groupBy(riskGroup[column], 'apiRiskClassification');
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
       let groupPieData = this.groupBy(riskData['list'], 'apiRiskClassification');
       Object.keys(groupPieData).map((column) => {
          let objPie = {};
          objPie['name'] = column;
          objPie['count'] = groupPieData[column].length;
          pieChartData['data'].push(objPie);
       });
      this.pieData = pieChartData;


      let apiNames = riskData['list'].map(i => i.apiName)
      let apiScores = riskData['list'].map(i => i.riskScore)
      let internalApiCount = riskData['list'].filter(i => i.apiType === 'Internal')
        .map(i => i.riskScore)
        .reduce((a, b) => a + b);
      let externalApiCount = riskData['list'].filter(i => i.apiType === 'External')
        .map(i => i.riskScore)
        .reduce((a, b) => a + b);
      let internalRiskCount = riskData['list'].filter(i => i.apiType === 'Internal')
        .map(i => i.apiName).length;
      let internalHighRisk = riskData['list'].filter(i => i.apiType === 'Internal' && i.apiRiskClassification === 'High')
        .map(i => i.apiName).length;
      let internalLowRisk = riskData['list'].filter(i => i.apiType === 'Internal' && i.apiRiskClassification === 'Low')
        .map(i => i.apiName).length;
      let internalMediumRisk = riskData['list'].filter(i => i.apiType === 'Internal' && i.apiRiskClassification === 'Medium')
        .map(i => i.apiName).length;
      let internalCriticalRisk = riskData['list'].filter(i => i.apiType === 'Internal' && i.apiRiskClassification === 'Critical')
        .map(i => i.apiName).length;

      let externalRiskCount = riskData['list'].filter(i => i.apiType === 'External')
        .map(i => i.apiName).length;
      let externalHighRisk = riskData['list'].filter(i => i.apiType === 'External' && i.apiRiskClassification === 'High')
        .map(i => i.apiName).length;
      let externalLowRisk = riskData['list'].filter(i => i.apiType === 'External' && i.apiRiskClassification === 'Low')
        .map(i => i.apiName).length;
      let externalMediumRisk = riskData['list'].filter(i => i.apiType === 'External' && i.apiRiskClassification === 'Medium')
        .map(i => i.apiName).length;
      let externalCriticalRisk = riskData['list'].filter(i => i.apiType === 'External' && i.apiRiskClassification === 'Critical')
        .map(i => i.apiName).length;
      let maxCount = riskData['list'].length;

      let apiName = riskData['list'].map(res => res.apiName)
      let apiType = riskData['list'].map(res => res.apiType)
      let riskScore = riskData['list'].map(res => res.riskScore)
      let apiRiskClassification = riskData['list'].map(res => res.apiRiskClassification)
      //let veracodeStatus = res['list'].map(res => res.veracodeStatus)
      //let penTestSlaBreach = res['list'].map(res => res.penTestSlaBreach)
      //let veracodeSlaBreach = res['list'].map(res => res.veracodeSlaBreach)
      //let veracodeDate = res['list'].map(res => res.veracodeDate)
      //let ramlReviewDate = res['list'].map(res => res.ramlReviewDate)
      //let penTestDate = res['list'].map(res => res.penTestDate)
      //console.log(apiNames);
      let uniqueApiType = Array.from(new Set(apiType))
      let apiTypeColor = riskData['list'].map(i => i.apiType === "Internal" ? i.color = "#31dc26cc" : 
                                               i.apiRiskClassification = '#0074a6aa')

    });    
  }

  avgData() {
    this._getReport.getReport()
    .subscribe(res => {
      console.log(res);
      
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
