// import { Component, OnInit } from '@angular/core';
// import { ApiRiskReportDataService } from '../../../shared/api-risk-report-data.service';
// import { ChartsModule } from 'ng2-charts';
// import { Chart, ChartType, ChartOptions } from 'chart.js';

// @Component({
//   selector: 'app-bubble-report',
//   templateUrl: './bubble-report.component.html',
//   styleUrls: ['./bubble-report.component.css']
// })
// export class BubbleReportComponent implements OnInit {

//   chart: [];
//   constructor(private _riskReport: ApiRiskReportDataService) { }

//   ngOnInit() {
//       this._riskReport.riskReport().subscribe(
//       res => {
//         let internalApi = res['list'].filter(i => i.apiType === 'Internal')
//           .map(i => i.riskScore)
//           .reduce((a, b) => a + b);
//         let externalApi = res['list'].filter(i => i.apiType === 'External')
//           .map(i => i.riskScore)
//           .reduce((a, b) => a + b);
//         let srNo = res['list'].map(res => res.srNo)
//         let apiName = res['list'].map(res => res.apiName)
//         let apiType = res['list'].map(res => res.apiType)
//         let riskScore = res['list'].map(res => res.riskScore)
//         //let i = 0;
//         //let apiRiskClassification = res['list'].map(res => res.apiRiskClassification)
//         //let veracodeStatus = res['list'].map(res => res.veracodeStatus)
//         //let penTestSlaBreach = res['list'].map(res => res.penTestSlaBreach)
//         //let veracodeSlaBreach = res['list'].map(res => res.veracodeSlaBreach)
//         //let veracodeDate = res['list'].map(res => res.veracodeDate)
//         //let ramlReviewDate = res['list'].map(res => res.ramlReviewDate)
//         //let penTestDate = res['list'].map(res => res.penTestDate)
//         // Doughnut Chart
//         let listLength = riskScore.length
//    })
//   }
// }
