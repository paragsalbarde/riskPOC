import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { NewDataService } from '../shared/new-data-service.service';
import { ApiRiskReportDataService } from '../shared/api-risk-report-data.service';
//import {MatDialog, MatDialogConfig} from "@angular/material";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiDetailsComponent } from './../modal/api-details/api-details.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public showApiSummary = [];
  public donutData: any = [];

  public pieData: any = [];
  public barData: any = [];

  public chartSetting: any = [];
  public riskData:any = [];
  public horizantalChartData: any = {};

  public riskScoreVar: any
  public riskScoreLevel: any
  
 constructor(private _riskReport:ApiRiskReportDataService,
              private _getReport : NewDataService,
              private dialog: MatDialog) {}
  
  ngOnInit() {
    
    //this._riskReport.riskReport().subscribe(riskData => {
    this._getReport.getReport().subscribe(res => {
      let riskData = res['RiskScoreDetails'];
      this.riskData = riskData;
      this.getBarData(riskData);//bar data
      this.getTableData(riskData);//table data
      this.avgData(riskData);// avg Data
      
      let riskGroup = this.groupBy(riskData, 'apiType');
      this.horizontalBarData(riskGroup);
       //Piechart data
       let pieChartData = {};
       pieChartData['name'] = "API Risk Overview";
       pieChartData['count'] = riskData.length;
       pieChartData['data'] = [];
       //Donut chart data
       let dountChartData = {};
       dountChartData['name'] = 'Sunburst';//this.chartSetting.avgRiskLevel+"\r\n"+this.chartSetting.avgRisk;
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
            return {
              name: (column !== undefined) ? column : "NA",
              //size : riskGroup[column].length,
              count: riskGroup[column].length,
              children: chartChildData['children']
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
      })
  }
  /*
  * Group data by columns
  */
  groupBy(data, column) {
    let groupData = data.reduce((r, a) => {
      r[a[column]] = [...r[a[column]] || [], a];
      return r;
     }, {});
     return groupData;
  }
  /*
  * Table data
  */
  getTableData(riskData) {
    var objData = {};
    let groupApiType = this.groupBy(riskData, 'apiType');

    Object.keys(groupApiType).map((column) => {
      groupApiType[column] = this.groupBy(groupApiType[column], 'apiRiskClassificatin');
    })    
  }
  /*
  * Bar Data
  */
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
  /*
  * Horizontal Bar chart Data
  */
  horizontalBarData(riskGroup) {
    let barData:any = {
      labels : [],
      series : [
        {label : 'Pen Test', values : []},
        {label : 'Veracode Status', values : []},
        {label : 'Raml Status', values : []}
      ]
    }
   
    let groupStatusExt = this.groupBy(riskGroup['External'], 'apiRiskClassificatin');
    let groupStatusInt = this.groupBy(riskGroup['Internal'], 'apiRiskClassificatin');

    //External
    Object.keys(groupStatusExt).map((column) => {
      let label = `External - ${column}`;
      barData.labels.push(label);
      this.iterateHBarData(groupStatusExt, column, barData);
    });
    //Internal
    Object.keys(groupStatusInt).map((column) => {
      let label = `Internal - ${column}`;
      barData.labels.push(label);
      this.iterateHBarData(groupStatusInt, column, barData);
  });
}
  /*
  * Set Horizantal bar chart data
  */
 iterateHBarData(groupStatus,column, barData) {

    let penTestCount = 0;
    let veraCodeCount = 0;
    let ramlReviewCount = 0;
    
    groupStatus[column].map((data) => {
      penTestCount  += (data['penTestStatus'] !== "") ? 1 : 0;
      veraCodeCount  += (data['veracodeStatus'] !== "") ? 1 : 0;
      ramlReviewCount  += (data['ramlReviewStatus'] !== "") ? 1 : 0;
    });
    
    let objPen = barData.series.find(element => element.label == 'Pen Test');
    let objVeracode = barData.series.find(element => element.label == 'Veracode Status');
    let objRaml = barData.series.find(element => element.label == 'Raml Status');
    objPen.values.push(penTestCount);
    objVeracode.values.push(veraCodeCount);
    objRaml.values.push(ramlReviewCount);

    this.horizantalChartData = barData;
 }

/*
* Calculate average status of risk
*/
  avgData(riskData) {
      let riskScores = riskData.map(i => i.riskScore);
      let avgRiskCal = riskData.filter(i => i.apiType)
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
    
      this.chartSetting['avgRisk'] = avgRisk;
      this.chartSetting['avgRiskLevel'] = overAllRiskLevel;
  }
  //END: Center Text of Donut Chart

  // START: Function to show API risk details on in PopUp Table format
  getChartDetails(event) {
    let filterData:any = {};
    let filterCriteria = {};
    if(event.type == 'donut') {
      //Donut
      if(["Internal", "External"].indexOf(event.data.data['name']) > -1 ) {
        // Inner parition
        let apiTypeLabel = event.data.data['name'];
        filterCriteria['apiType'] = (apiType) => apiType == apiTypeLabel;
      } else {
        //Outer partition
        let apiRiskLabel =  event.data.data['name']; //Internal/external
        let apiTypeLabel = event.data.parent.data['name']; //Hig/low
        filterCriteria['apiType'] = (apiType) => apiType == apiTypeLabel;
        filterCriteria['apiRiskClassificatin'] = (apiRiskClassificatin) => apiRiskClassificatin == apiRiskLabel;
      }
    } else if(event.type == "piechart") {
      //Piechart
      let apiRiskLabel = event.data.data['name'];
      filterCriteria['apiRiskClassificatin'] = (apiType) => apiType == apiRiskLabel;
    } else if(event.type == 'apiTable') {
      //console.log(event);
      let apiTypeLabel =  event.apiType; 
      let apiRiskLabel =  event.apiRiskClassificatin; 

      if(event.apiRiskClassificatin !== undefined ) {
        filterCriteria['apiRiskClassificatin'] = (apiRiskClassificatin) => apiRiskClassificatin == apiRiskLabel;
      }
      if(event.apiType !== undefined) {
        filterCriteria['apiType'] = (apiType) => apiType == apiTypeLabel;
      }
      if(event.column !== undefined) {
        let key = Object.keys(event.column)[0];
        let objValue = event.column[key];
        filterCriteria[key] = (value) => value == objValue;
      }
    } 
    //console.log(filterCriteria);
    filterData  = this.filterArray(this.riskData, filterCriteria);
    //console.log(filterData);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = filterData;

    const dialogRef = this.dialog.open(ApiDetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
       // data => console.log("Dialog output:", event)
    );  
  }

  filterArray(array, filters) {
    const filterKeys = Object.keys(filters);
    return array.filter(item => {
      // validates all filter criteria
      return filterKeys.every(key => {
        if (typeof filters[key] !== 'function') return true;
        return filters[key](item[key]);
      });
    });
  }
  // END: Function to show API risk details on in PopUp Table format
}
