import { Component, OnInit } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';
import { ChartsModule } from 'ng2-charts';
//import { Chart } from 'chart.js';
import * as Chart from 'chart.js';
//import ChartDataLabels from 'chartjs-plugin-datalabels';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-api-overview',
  templateUrl: './api-overview.component.html',
  styleUrls: ['./api-overview.component.css']
})
export class ApiOverviewComponent implements OnInit {

  overviewChartData = [];
  public riskScoreVar: any
  public riskScoreLevel: any
  
  constructor(private _getReport: NewDataService) { }

  ngOnInit() {
    this._getReport.getReport()
      .subscribe(res => {
        // START: DATA from JSON
        let internalApiCount = res['RiskScoreDetails'].filter(i => i.apiType === 'Internal')
        .map(i => i.riskScore).length;
        let externalApiCount = res['RiskScoreDetails'].filter(i => i.apiType === 'External')
        .map(i => i.riskScore).length;

        let intRamlRvSts = res['RiskScoreDetails'].filter(i => i.apiType === 'Internal' && i.ramlReviewStatus)
        .map(i => i.apiName).length;
        let intRamlRvStsDn = res['RiskScoreDetails'].filter(i => i.apiType === 'Internal' && i.ramlReviewStatus === 'Done')
        .map(i => i.apiName).length;
        let intRamlRvStsPn = res['RiskScoreDetails'].filter(i => i.apiType === 'Internal' && i.ramlReviewStatus === 'Pending')
        .map(i => i.apiName).length;

        let intVeracodeSts = res['RiskScoreDetails'].filter(i => i.apiType === 'Internal' && i.veracodeStatus)
        .map(i => i.apiName).length;
        let intVeracodeStsDn = res['RiskScoreDetails'].filter(i => i.apiType === 'Internal' && i.veracodeStatus === 'Done')
        .map(i => i.apiName).length;
        let intVeracodeStsPn = res['RiskScoreDetails'].filter(i => i.apiType === 'Internal' && i.veracodeStatus === 'Pending')
        .map(i => i.apiName).length;
        
        let intPenTstSts = res['RiskScoreDetails'].filter(i => i.apiType === 'Internal' && i.penTestStatus)
        .map(i => i.apiName).length;
        let intPenTstStsDn = res['RiskScoreDetails'].filter(i => i.apiType === 'Internal' && i.penTestStatus === 'Done')
        .map(i => i.apiName).length;
        let intPenTstStsPn = res['RiskScoreDetails'].filter(i => i.apiType === 'Internal' && i.penTestStatus === 'Pending')
        .map(i => i.apiName).length;
        
        let extRamlRvSts = res['RiskScoreDetails'].filter(i => i.apiType === 'External' && i.ramlReviewStatus)
        .map(i => i.apiName).length;
        let extRamlRvStsDn = res['RiskScoreDetails'].filter(i => i.apiType === 'External' && i.ramlReviewStatus === 'Done')
        .map(i => i.apiName).length;
        let extRamlRvStsPn = res['RiskScoreDetails'].filter(i => i.apiType === 'External' && i.ramlReviewStatus === 'Pending')
        .map(i => i.apiName).length;

        let extVeracodeSts = res['RiskScoreDetails'].filter(i => i.apiType === 'External' && i.veracodeStatus)
        .map(i => i.apiName).length;
        let extVeracodeStsDn = res['RiskScoreDetails'].filter(i => i.apiType === 'External' && i.veracodeStatus === 'Done')
        .map(i => i.apiName).length;
        let extVeracodeStsPn = res['RiskScoreDetails'].filter(i => i.apiType === 'External' && i.veracodeStatus === 'Pending')
        .map(i => i.apiName).length;

        
        let extPenTstSts = res['RiskScoreDetails'].filter(i => i.apiType === 'External' && i.penTestStatus)
        .map(i => i.apiName).length;
        let extPenTstStsDn = res['RiskScoreDetails'].filter(i => i.apiType === 'External' && i.penTestStatus === 'Done')
        .map(i => i.apiName).length;
        let extPenTstStsPn = res['RiskScoreDetails'].filter(i => i.apiType === 'External' && i.penTestStatus === 'Pending')
        .map(i => i.apiName).length;

        let riskScores = res['RiskScoreDetails'].map(i => i.riskScore);

        let avgRiskCal = res['RiskScoreDetails'].filter(i => i.apiType)
        .map(i => i.riskScore)
        .reduce((a, b) => a + b, 0)/riskScores.length;
        let avgRisk = avgRiskCal.toFixed();
        this.riskScoreVar = avgRisk;
        
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
        this.riskScoreLevel = overAllRiskLevel;
        console.log("Risk Avg: "+ avgRisk)
        console.log(overAllRiskLevel)

        // END: DATA from JSON

        //var labels = [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12];
        var outerCircle = [intRamlRvStsDn, intRamlRvStsPn, intVeracodeStsDn, intVeracodeStsPn, intPenTstStsDn, intPenTstStsPn,
                           extRamlRvStsDn, extRamlRvStsPn, extVeracodeStsDn, extVeracodeStsPn, extPenTstStsDn, extPenTstStsPn];
        var middleCircle = [intRamlRvSts,intVeracodeSts,intPenTstSts,extRamlRvSts,extVeracodeSts,extPenTstSts];
        var innerCircle = [internalApiCount, externalApiCount];
        let innerCircleColor = [ "#da8f34", '#46bfbd']
        let middleCircleColor = [ "#da8f34cc","#da8f34cc", "#da8f34cc", '#46bfbdcc', '#46bfbdcc', '#46bfbdcc']
        let outerCircleColor = [ "#95b53c","#f7464a", "#95b53c", '#f7464a', '#95b53c', '#f7464a',
                                  "#95b53c","#f7464a", "#95b53c", '#f7464a', '#95b53c', '#f7464a']
        var colors = [

          // 'rgb(70, 191, 189)',
          // 'rgb(252, 180, 92)',
          // 'rgb(247, 70, 74)',
          // 'rgb(148, 159, 177)',
          // 'rgb(51, 143, 82)',
          // 'rgb(77, 83, 96)',
          // 'rgb(180, 142, 173)',
          // 'rgb(150, 181, 180)',
          // 'rgb(235, 203, 138)',
          // 'rgb(94, 65, 149)',
          // 'rgb(171, 121, 103)',
          // 'rgb(134, 175, 18)'
          //apiTypeColor
        ];
       

        var apiOverviewChart = new Chart('apiOverviewChart', {
          type: 'doughnut',
          data: {
            //labels: labels,
            datasets: [
            {
              backgroundColor: outerCircleColor,
              data: outerCircle,
              labels: ['Internal Raml Review Done', 'Internal Raml Review Pending', 'Internal Veracode Done', 'Internal Veracode Pending',
                       'Internal Pen Test Done', 'Internal Pen Test Pending',
                       'External Raml Review Done', 'External Raml Review Pending', 'External Veracode Done', 'External Veracode Pending',
                       'External Pen Test Done', 'External Pen Test Pending'
                       ],
            },
            {
              backgroundColor: middleCircleColor,
              data: middleCircle,
              labels: ['Internal Raml Review', 'Internal Veracode','Internal Pen Test',
                       'External Raml Review', 'External Veracode','External Pen Test'],
            },
            {
              backgroundColor: innerCircleColor,
              data: innerCircle,
              labels: ['Internal', 'External']
            }]
          },
          //plugins: [pluginDataLabels],
          options: {
            maintainAspectRatio: false,
            responsive: true,
            cutoutPercentage: 30,
            elements: {
                center: {
                    text: avgRisk  //set as you wish
                }
            },
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
            plugins: {
                datalabels: {
                  align: function (context, labels) {
                    var index = context.dataIndex;
                    var label = context.dataset.labels[index];
                    // var value = context.dataset.data[index];
                    var value = label;
                    var invert = Math.abs(value) <= 1;
                    return value < 1 ? 'end' : 'start'
                  },
                  anchor: 'end',
                  //backgroundColor: null,
                  //borderColor: null,
                  //borderRadius: 4,
                  //borderWidth: 1,
                  color: '#fff',
                  font: {
                    size: 14,
                    // weight: 600
                  },
                //offset: 4,
                  padding: 0,
                  formatter: function (value) {
                    return Math.round(value * 10) / 10
                  }
                }
              }
            }
          }
        );

        // Chart.pluginService.register({
        //   afterDraw: function(chart) {
        //     var width = apiOverviewChart.chart.width,
        //         height = apiOverviewChart.chart.height,
        //         ctx = apiOverviewChart.chart.ctx;
        
        //     ctx.restore();
        //     var fontSize = (height / 114).toFixed(2);
        //     ctx.font = fontSize + "em sans-serif";
        //     ctx.textBaseline = "middle";
        
        //     //var text = avgRisk,
        //     var text = apiOverviewChart.config.options.elements.center.text,
        //         textX = Math.round((width - ctx.measureText(text).width) / 2),
        //         textY = height / 2;
        
        //     ctx.fillText(text, textX, textY);
        //     ctx.save();
        //   }
        // });
      })
  }
}
