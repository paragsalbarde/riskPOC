import { Component, OnInit } from '@angular/core';
import { ApiRiskReportDataService } from '../../../shared/api-risk-report-data.service';
import { ChartsModule } from 'ng2-charts';
//import { Chart } from 'chart.js';
import * as Chart from 'chart.js';
//import ChartDataLabels from 'chartjs-plugin-datalabels';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-new-bubble-chart',
  templateUrl: './new-bubble-chart.component.html',
  styleUrls: ['./new-bubble-chart.component.css']
})
export class NewBubbleChartComponent implements OnInit {

  apiClassificationchart = [];

  constructor(private _riskReport: ApiRiskReportDataService) { }

  ngOnInit() {
    this._riskReport.riskReport().subscribe(res => {
      let apiNames = res['list'].map(i => i.apiName)
      let apiScores = res['list'].map(i => i.riskScore)
      let internalApiCount = res['list'].filter(i => i.apiType === 'Internal')
        .map(i => i.riskScore)
        .reduce((a, b) => a + b);
      let externalApiCount = res['list'].filter(i => i.apiType === 'External')
        .map(i => i.riskScore)
        .reduce((a, b) => a + b);
      let internalRiskCount = res['list'].filter(i => i.apiType === 'Internal')
        .map(i => i.apiName).length;
      let internalHighRisk = res['list'].filter(i => i.apiType === 'Internal' && i.apiRiskClassification === 'High')
        .map(i => i.apiName).length;
      let internalLowRisk = res['list'].filter(i => i.apiType === 'Internal' && i.apiRiskClassification === 'Low')
        .map(i => i.apiName).length;
      let internalMediumRisk = res['list'].filter(i => i.apiType === 'Internal' && i.apiRiskClassification === 'Medium')
        .map(i => i.apiName).length;
      let internalCriticalRisk = res['list'].filter(i => i.apiType === 'Internal' && i.apiRiskClassification === 'Critical')
        .map(i => i.apiName).length;

      let externalRiskCount = res['list'].filter(i => i.apiType === 'External')
        .map(i => i.apiName).length;
      let externalHighRisk = res['list'].filter(i => i.apiType === 'External' && i.apiRiskClassification === 'High')
        .map(i => i.apiName).length;
      let externalLowRisk = res['list'].filter(i => i.apiType === 'External' && i.apiRiskClassification === 'Low')
        .map(i => i.apiName).length;
      let externalMediumRisk = res['list'].filter(i => i.apiType === 'External' && i.apiRiskClassification === 'Medium')
        .map(i => i.apiName).length;
      let externalCriticalRisk = res['list'].filter(i => i.apiType === 'External' && i.apiRiskClassification === 'Critical')
        .map(i => i.apiName).length;
      let maxCount = res['list'].length;

      let apiName = res['list'].map(res => res.apiName)
      let apiType = res['list'].map(res => res.apiType)
      let riskScore = res['list'].map(res => res.riskScore)
      let apiRiskClassification = res['list'].map(res => res.apiRiskClassification)
      //let veracodeStatus = res['list'].map(res => res.veracodeStatus)
      //let penTestSlaBreach = res['list'].map(res => res.penTestSlaBreach)
      //let veracodeSlaBreach = res['list'].map(res => res.veracodeSlaBreach)
      //let veracodeDate = res['list'].map(res => res.veracodeDate)
      //let ramlReviewDate = res['list'].map(res => res.ramlReviewDate)
      //let penTestDate = res['list'].map(res => res.penTestDate)
      //console.log(externalApiCount);
      //console.log(internalHighRisk, internalMediumRisk, internalLowRisk,internalCriticalRisk, externalHighRisk, externalMediumRisk, externalLowRisk, externalCriticalRisk );
     

      // START: Doughnut Chart
      this.apiClassificationchart = new Chart('canvas2', {
        type: 'bar',
        data: {
          labels: ['Critical', 'High', 'Medium', 'Low'],
          datasets: [
            {
              label: "Internal",
              data: [internalHighRisk, internalMediumRisk, internalLowRisk, internalCriticalRisk],
              backgroundColor: ['#0074a6', '#0074a6', '#0074a6', '#0074a6'],
            },
            {
              label: "External",
              data: [externalHighRisk, externalMediumRisk, externalLowRisk, externalCriticalRisk],
              backgroundColor: ['#00aeef', '#00aeef', '#00aeef', '#00aeef'],
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: { position: 'top' },
          animation: { duration: 2000 },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                mirror: false,
                stepSize: 5,
                maxTicksLimit: 20,
                suggestedMin: 0,
                suggestedMax: maxCount
              },
              scaleLabel: {
                display: true,
                labelString: "Total Api"
              },
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Api Classification"
              },
            }]
          }
        }
      });



    })
  }
}
//Barclays Colors: #00395d #0074a6 #00aeef
// "srNo": 5,
// "apiVersion": "V5",
// "apiName": "Test5",
// "apiType": "Internal",
// "apiRiskClassification": "Low",
// "ramlReviewStatus": "Done",
// "ramlReviewDate": null,
// "veracodeStatus": "Done",
// "veracodeDate": "12/12/2020",
// "penTestStatus": "Done",
// "penTestDate": "12/23/2019",
// "veracodeSlaBreach": "Withen SLA",
// "penTestSlaBreach": "Withen SLA",
// "ramlReviewPending": "Done",
// "riskScore": 2
