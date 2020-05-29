import { Component, Output, EventEmitter } from '@angular/core';
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
  public riskData: any = [];
  public globalRiskData: any = [];
  public horizantalChartData: any = {};

  public businessUnit: any = ['All TC'];
  public transactionCycle: any = ['All TC'];

  public selectedBU;
  public selectedTC;

  public riskScoreVar: any
  public riskScoreLevel: any

  @Output() updateSunburst = new EventEmitter();

  constructor(private _riskReport: ApiRiskReportDataService,
    private _getReport: NewDataService,
    private dialog: MatDialog) { }

  ngOnInit() {

    this._getReport.getReport().subscribe(res => {
      let riskData = res['RiskScoreDetails'];
      this.riskData = riskData;
      this.globalRiskData = [...riskData];
      this.getBarData(riskData);//bar data
      //this.getTableData(riskData);//table data
      this.avgData(riskData);// avg Data
      let riskGroup = this.groupBy(riskData, 'apiType');
      this.horizontalBarData(riskGroup); // horizantal bar data
      this.donutChartData(riskData, riskGroup); // donut chart data
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
  /*
  * Group data by columns
  */
  groupBy(data, column) {
    if (data !== undefined) {
      let groupData = data.reduce((r, a) => {
        r[a[column]] = [...r[a[column]] || [], a];
        return r;
      }, {});
      return groupData;
    }
  }
  /*
  * Donut chart data
  */
  donutChartData(riskData, riskGroup) {
    //Piechart data
    let pieChartData = {};
    pieChartData['name'] = "API Risk Overview";
    pieChartData['count'] = riskData.length;
    pieChartData['data'] = [];
    //Donut chart data
    let dountChartData = {};
    dountChartData['name'] = 'Sunburst';//this.chartSetting.avgRiskLevel+"\r\n"+this.chartSetting.avgRisk;
    //dountChartData['size'] = riskData.length;
    dountChartData['count'] = riskData.length;
    //
    dountChartData['children'] = Object.keys(riskGroup).map((column) => {
      // riskGroup[column].map((data) => {
      let groupCritical = this.groupBy(riskGroup[column], 'overallRiskClassification');
      let chartChildData = [];
      chartChildData['children'] = Object.keys(groupCritical).map((column1) => {

        let groupBreach = this.groupBy(groupCritical[column1], 'penTestSlaBreach');
        let chart2ChildData = [];
        chart2ChildData['children'] = Object.keys(groupBreach).map((column2) => {
          return {
            name: (column2 !== undefined && column2 !== "") ? column2 : "NA",
            //size : groupBreach[column2].length,
          }
        });
        return {
          name: (column1 !== undefined) ? column1 : "NA",
          size: groupCritical[column1].length,
          count: groupCritical[column1].length,
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
    let groupPieData = this.groupBy(riskData, 'overallRiskClassification');
    Object.keys(groupPieData).map((column) => {
      let objPie = {};
      objPie['name'] = column;
      objPie['count'] = groupPieData[column].length;
      pieChartData['data'].push(objPie);
    });

    this.pieData = pieChartData;
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
      barData.push(objData);
    });
    this.barData = barData;
    //console.log(barData);
  }

  iterateVData(groupStatus, column) {
    let penTestCount = 0;
    //let veraCodeCount = 0;
    //let ramlReviewCount = 0;
    let totalCount = 0;

    groupStatus[column].map((data) => {
      penTestCount += (data['penTestStatus'] !== "") ? 1 : 0;
      totalCount += (data['srNo'] !== "") ? 1 : 0;
      //veraCodeCount  += (data['veracodeStatus'] !== "") ? 1 : 0;
      //ramlReviewCount  += (data['ramlReviewStatus'] !== "") ? 1 : 0;
    });

    let arrData = [
      {
        'groupName': 'Pen Test',
        'groupValue': penTestCount
      },
      {
        'groupName': 'Total',
        'groupValue': totalCount
      }
    ];

    return arrData;
  }
  /*
  * Vertical Bar data
  */
  verticalBarData(riskGroup) {
    let vBarData = [];

    let groupStatusExt = this.groupBy(riskGroup['External'], 'apiRiskClassificatin');
    let groupStatusInt = this.groupBy(riskGroup['Internal'], 'apiRiskClassificatin');
    //External
    if (riskGroup['External'] !== undefined) {
      Object.keys(groupStatusExt).map((column) => {
        let objData = {};
        let label = `Ext - ${column}`;
        objData['key'] = label;
        let arrData = this.iterateVData(groupStatusExt, column);
        objData['values'] = arrData;
        vBarData.push(objData);
      });
    }
    //Internal
    if (riskGroup['Internal'] !== undefined) {
      Object.keys(groupStatusInt).map((column) => {
        let objData = {};
        let label = `Int - ${column}`;
        objData['key'] = label;
        let arrData = this.iterateVData(groupStatusExt, column);
        objData['values'] = arrData;
        vBarData.push(objData);
      });
    }
    //console.log(vBarData);
    this.barData = vBarData;
  }
  /*
  * Horizontal Bar chart Data
  */
  horizontalBarData(riskGroup) {
    let barData: any = {
      labels: [],
      series: [
        { label: 'Pen Test', values: [] },
        { label: 'Veracode Status', values: [] },
        { label: 'Raml Status', values: [] }
      ]
    }

    let groupStatusExt = this.groupBy(riskGroup['External'], 'apiRiskClassificatin');
    let groupStatusInt = this.groupBy(riskGroup['Internal'], 'apiRiskClassificatin');

    //External
    if (riskGroup['External'] !== undefined) {
      Object.keys(groupStatusExt).map((column) => {
        let label = `External - ${column}`;
        barData.labels.push(label);
        this.iterateHBarData(groupStatusExt, column, barData);
      });
    }
    //Internal
    if (riskGroup['Internal'] !== undefined) {
      Object.keys(groupStatusInt).map((column) => {
        let label = `Internal - ${column}`;
        barData.labels.push(label);
        this.iterateHBarData(groupStatusInt, column, barData);
      });
    }
  }
  /*
  * Set Horizantal bar chart data
  */
  iterateHBarData(groupStatus, column, barData) {

    let penTestCount = 0;
    let veraCodeCount = 0;
    let ramlReviewCount = 0;

    groupStatus[column].map((data) => {
      penTestCount += (data['penTestStatus'] !== "") ? 1 : 0;
      veraCodeCount += (data['veracodeStatus'] !== "") ? 1 : 0;
      ramlReviewCount += (data['ramlReviewStatus'] !== "") ? 1 : 0;
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
      .reduce((a, b) => a + b, 0) / riskScores.length;

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
    let filterData: any = {};
    let filterCriteria = {};
    if (event.type == 'donut') {
      //Donut
      if (["Internal", "External"].indexOf(event.data.data['name']) > -1) {
        // Inner parition
        let apiTypeLabel = event.data.data['name'];
        filterCriteria['apiType'] = (apiType) => apiType == apiTypeLabel;
      } else {
        //Outer partition
        let apiRiskLabel = event.data.data['name']; //Hig/low
        let apiTypeLabel = event.data.parent.data['name']; //Internal/external
        filterCriteria['apiType'] = (apiType) => apiType == apiTypeLabel;
        filterCriteria['overallRiskClassification'] = (overallRiskClassification) => overallRiskClassification == apiRiskLabel;
      }
    } else if (event.type == "piechart") {
      //Piechart
      let apiRiskLabel = event.data.data['name'];
      filterCriteria['overallRiskClassification'] = (apiType) => apiType == apiRiskLabel;
    } else if (event.type == 'apiTable') {
      //console.log(event);
      let apiTypeLabel = event.apiType;
      let apiRiskLabel = event.apiRiskClassificatin;

      if (event.apiRiskClassificatin !== undefined) {
        filterCriteria['apiRiskClassificatin'] = (apiRiskClassificatin) => apiRiskClassificatin == apiRiskLabel;
      }
      if (event.apiType !== undefined) {
        filterCriteria['apiType'] = (apiType) => apiType == apiTypeLabel;
      }
      if (event.column !== undefined) {
        let key = Object.keys(event.column)[0];
        let objValue = event.column[key];
        filterCriteria[key] = (value) => value == objValue;
      }
    }
    //console.log(filterCriteria);
    filterData = this.filterArray(this.riskData, filterCriteria);
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
  /*
  * Function to calculate counts
  */
  calcCounts(riskData) {
    let objCounts = {
      "extApiVeracodeScanPending": 0,
      "reportDate": "2020-05-22T10:31:57.964+0000",
      "extApiRamlReviewPending": 0,
      "extApiPenTestPending": 0,
      "totalVulnerabilities": 50,
      "intApiRamlReviewPending": 20,
      "intApiPenTestPending": 40,
      "intApiVeracodeScanPending": 30
    }

  }
  /*
  * Function to calculate tables counts
  */
  calcTableCounts(riskData) {

  }
  // END: Function to show API risk details on in PopUp Table format
  onFilter(event) {
    this.apiReviewTableData();
    console.log(event);
    this.selectedBU = event.bu;
    this.selectedTC = event.tc;
  }
  apiReviewTableData() {
    this._getReport.getReport().subscribe(res => {
      let riskData = res['RiskScoreDetails'];
      //Row 1
      let extCriPendingPenTesting = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'Critical' && i.penTestStatus === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let extCriPendingVeracodeScan = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'Critical' && i.veracodeStatus === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let extCriPendingRamlReview = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'Critical' && i.ramlReviewPending === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let extCriPenTestSLABreach = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'Critical' && i.penTestSlaBreach === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let extCriVeracodeSLABreach = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'Critical' && i.veracodeSlaBreach === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      //Row 2
      let extHighPendingPenTesting = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'High' && i.penTestStatus === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let extHighPendingVeracodeScan = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'High' && i.veracodeStatus === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let extHighPendingRamlReview = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'High' && i.ramlReviewPending === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let extHighPenTestSLABreach = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'High' && i.penTestSlaBreach === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let extHighVeracodeSLABreach = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'High' && i.veracodeSlaBreach === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      //Row 3
      let extMedPendingPenTesting = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'Medium' && i.penTestStatus === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let extMedPendingVeracodeScan = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'Medium' && i.veracodeStatus === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let extMedPendingRamlReview = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'Medium' && i.ramlReviewPending === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let extMedVeracodeSLABreach = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'Medium' && i.penTestSlaBreach === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let extMedPenTestSLABreach = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'Medium' && i.veracodeSlaBreach === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length


      //Row 4
      let extLowPendingPenTesting = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'Low' && i.penTestStatus === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let extLowPendingVeracodeScan = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'Low' && i.veracodeStatus === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let extLowPendingRamlReview = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'Low' && i.ramlReviewPending === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let extLowPenTestSLABreach = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'Low' && i.penTestSlaBreach === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let extLowVeracodeSLABreach = riskData.filter(i => i.apiType === 'External' && i.apiRiskClassificatin === 'Low' && i.veracodeSlaBreach === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      //Row 5
      let intCriPendingPenTesting = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'Critical' && i.penTestStatus === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let intCriPendingVeracodeScan = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'Critical' && i.veracodeStatus === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let intCriPendingRamlReview = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'Critical' && i.ramlReviewPending === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let intCriPenTestSLABreach = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'Critical' && i.penTestSlaBreach === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let intCriVeracodeSLABreach = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'Critical' && i.veracodeSlaBreach === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      //Row 6
      let intHighPendingPenTesting = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'High' && i.penTestStatus === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let intHighPendingVeracodeScan = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'High' && i.veracodeStatus === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let intHighPendingRamlReview = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'High' && i.ramlReviewPending === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let intHighPenTestSLABreach = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'High' && i.penTestSlaBreach === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let intHighVeracodeSLABreach = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'High' && i.veracodeSlaBreach === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      //Row 7
      let intMedPendingPenTesting = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'Medium' && i.penTestStatus === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let intMedPendingVeracodeScan = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'Medium' && i.veracodeStatus === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let intMedPendingRamlReview = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'Medium' && i.ramlReviewPending === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let intMedVeracodeSLABreach = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'Medium' && i.penTestSlaBreach === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let intMedPenTestSLABreach = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'Medium' && i.veracodeSlaBreach === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length


      //Row 8
      let intLowPendingPenTesting = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'Low' && i.penTestStatus === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let intLowPendingVeracodeScan = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'Low' && i.veracodeStatus === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let intLowPendingRamlReview = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'Low' && i.ramlReviewPending === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let intLowPenTestSLABreach = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'Low' && i.penTestSlaBreach === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let intLowVeracodeSLABreach = riskData.filter(i => i.apiType === 'Internal' && i.apiRiskClassificatin === 'Low' && i.veracodeSlaBreach === "Pending"
        && i.businessUnit === this.selectedBU && i.transactionCycle === this.selectedTC).length

      let tableArrayData = [ extCriPendingPenTesting ,  extCriPendingVeracodeScan,  extCriPendingRamlReview,  extCriPenTestSLABreach,  extCriVeracodeSLABreach,
        extHighPendingPenTesting,  extHighPendingVeracodeScan,  extHighPendingRamlReview,  extHighPenTestSLABreach,  extHighVeracodeSLABreach,
        extMedPendingPenTesting,  extMedPendingVeracodeScan,  extMedPendingRamlReview,  extMedVeracodeSLABreach,  extMedPenTestSLABreach,
        extLowPendingPenTesting,  extLowPendingVeracodeScan,  extLowPendingRamlReview,  extLowPenTestSLABreach,  extLowVeracodeSLABreach,
        intCriPendingPenTesting ,  intCriPendingVeracodeScan,  intCriPendingRamlReview,  intCriPenTestSLABreach,  intCriVeracodeSLABreach,
        intHighPendingPenTesting,  intHighPendingVeracodeScan,  intHighPendingRamlReview,  intHighPenTestSLABreach,  intHighVeracodeSLABreach,
        intMedPendingPenTesting,  intMedPendingVeracodeScan,  intMedPendingRamlReview,  intMedVeracodeSLABreach,  intMedPenTestSLABreach,
        intLowPendingPenTesting,  intLowPendingVeracodeScan,  intLowPendingRamlReview,  intLowPenTestSLABreach, intLowVeracodeSLABreach]

      console.log("Selected BU: " + this.selectedBU);
      console.log("Selected TC: " + this.selectedTC);
      console.log("Selected TC: " + tableArrayData);



    })
  }
}
