import { Component, OnInit } from '@angular/core';
import { ApiRiskReportDataService } from '../../../shared/api-risk-report-data.service';
import { ChartsModule } from 'ng2-charts';
import { Chart, ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-api-risk-report-with-service',
  templateUrl: './api-risk-report-with-service.component.html',
  styleUrls: ['./api-risk-report-with-service.component.css']
})
export class ApiRiskReportWithServiceComponent implements OnInit {

  overviewChart = [];

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
      //console.log(apiNames);
      let uniqueApiType = Array.from(new Set(apiType))
      let apiTypeColor = res['list'].map(i => i.apiType === "Internal" ? i.color = "#31dc26cc" : 
                                               i.apiRiskClassification = '#0074a6aa')

      //console.log(internalHighRisk, internalMediumRisk, internalLowRisk, internalCriticalRisk, externalHighRisk, externalMediumRisk, externalLowRisk, externalCriticalRisk);
      
      // Doughnut Chart
      this.overviewChart = new Chart('canvas1', {
        type: 'doughnut',
        data: {
          labels: uniqueApiType,
          datasets: [
            {
              //label:["Internal","Internal","Internal","Internal","External","External","External","External"],
              //label: apiType,
              data: [internalHighRisk, internalMediumRisk, internalLowRisk, internalCriticalRisk, 
                    externalHighRisk, externalMediumRisk, externalLowRisk, externalCriticalRisk],
              backgroundColor: ['#0074a6', '#0074a6', '#0074a6', '#0074a6',
                '#00aeef', '#00aeef', '#00aeef', '#00aeef'],
            },
            {
              data: [internalRiskCount, externalRiskCount],
              backgroundColor: ['#0074a6', '#00aeef'],
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: { position: 'right' },
          axisX:{
            labelFontColor: "red",
          },
          centertext: "123",
        }
      })
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