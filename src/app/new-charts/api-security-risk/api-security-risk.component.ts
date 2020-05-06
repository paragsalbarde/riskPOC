import { Component, OnInit } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';
import { ChartsModule } from 'ng2-charts';
import * as Chart from 'chart.js';
//import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';


import 'rxjs/add/operator/map';

@Component({
  selector: 'app-api-security-risk',
  templateUrl: './api-security-risk.component.html',
  styleUrls: ['./api-security-risk.component.css']
})
export class ApiSecurityRiskComponent implements OnInit {

  constructor(private _getReport: NewDataService) { }

  ngOnInit() {
    
    this._getReport.getReport()
      .subscribe(res => {
        // START: DATA from JSON
        let riskCountLow = res['RiskScoreDetails'].filter(i => i.apiRiskClassificatin === 'Low')
        .map(i => i.apiName).length;
        let riskCountMedium = res['RiskScoreDetails'].filter(i => i.apiRiskClassificatin === 'Medium')
        .map(i => i.apiName).length;
        let riskCountHigh = res['RiskScoreDetails'].filter(i => i.apiRiskClassificatin === 'High')
        .map(i => i.apiName).length;
        let riskCountCritical = res['RiskScoreDetails'].filter(i => i.apiRiskClassificatin === 'Critical')
        .map(i => i.apiName).length;
        let riskCountNoRisk = res['RiskScoreDetails'].filter(i => i.apiRiskClassificatin === 'No Risk')
        .map(i => i.apiName).length;
        let riskCountNoRiskW = res['RiskScoreDetails'].filter(i => i.apiRiskClassificatin === 'No Risk')
        .map(i => i.apiName);
        //console.log("No Risk : "+ riskCountNoRiskW)
        // END: DATA from JSON

        var labels = [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12];
        var securityRiskData = [riskCountLow, riskCountMedium, riskCountHigh, riskCountCritical, riskCountNoRisk];
        var colors = [ 
          'rgb(70, 191, 189)', 'rgb(252, 180, 92)', 'rgb(247, 70, 74)', 'rgb(171, 121, 103)', 'rgb(134, 175, 18)'
        ];
       
        //START: Chart  
        var securityRiskOverview = new Chart('securityRiskOverviewChart', {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              backgroundColor: colors,
              data: securityRiskData,
              label: 'Risk',
              labels: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical Risk','No Risk'],
            }
            ]
          },
          
          options: {
            maintainAspectRatio: false,
            responsive: true,
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var index = tooltipItem.index;
                  return dataset.labels[index] + ": " + dataset.data[index];
                }
              }
            },
            legend: false,
            tooltip: false,
            //plugins: [pluginDataLabels],
            plugins: {
              pluginDataLabels,
              datalabels: {
                align: function (context) {
                  var index = context.dataIndex;
                  var value = context.dataset.data[index];
                  var invert = Math.abs(value) <= 1;
                  return value < 1 ? 'end' : 'start'
                },
                anchor: 'end',
                color: '#fff',
                font: {
                  size: 14,
                  weight: 500
                },
                offset: 5,
                padding: 10,
                formatter: (value, ctx) => {
                  let sum = 0;
                  //let dataLbl = ctx.chart.labels.datasets[0].data;
                  let dataArr = ctx.chart.data.datasets[0].data;
                      dataArr.map(data => { sum += data });
                  let percentage = Math.round(value*100 / sum)+"%";
                  return percentage ;
                  },
              }
            }
          }
        }
        //END: Chart
        );
      })
  }

}
