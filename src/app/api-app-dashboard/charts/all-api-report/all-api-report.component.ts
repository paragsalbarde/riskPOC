import { Component, OnInit } from '@angular/core';
import { ApiRiskReportDataService } from '../../../shared/api-risk-report-data.service';
import { ChartsModule } from 'ng2-charts';
import { Chart, ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-all-api-report',
  templateUrl: './all-api-report.component.html',
  styleUrls: ['./all-api-report.component.css']
})
export class AllApiReportComponent implements OnInit {

  allApiChart = [];

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
      
      let apiName = res['list'].map(res => res.apiName)
      let apiType = res['list'].map(res => res.apiType)
      let apiRiskClassification = res['list'].map(res => res.apiRiskClassification)
      let riskScore = res['list'].map(res => res.riskScore)
      let srNo = res['list'].map(i => i.srNo)
      let maxCount = res['list'].length;
      
      //apiClassConv: apiRiskClassification to integer
      let apiClassConv = res['list'].map(i => i.apiRiskClassification === "Low" ? i.apiRiskClassification = 1 : 
                                              i.apiRiskClassification === "Medium" ? i.apiRiskClassification = 2 :
                                              i.apiRiskClassification === "High" ? i.apiRiskClassification = 3 :
                                              i.apiRiskClassification === "Critical" ? i.apiRiskClassification = 4 :
                                              i.apiRiskClassification = 0)
      
      let uniqueApiClass = Array.from(new Set(apiClassConv))
      
      let apiTypeColor = res['list'].map(i => i.apiType === "Internal" ? i.color = "#31dc26cc" : 
                                               i.apiRiskClassification = '#0074a6aa')
                                                                                
      let bubbleArray = []
      console.log("Colors:"+apiTypeColor);
      //let bubbleArray = [apiName[0],apiType[0],riskScore[0]]
      //let veracodeStatus = res['list'].map(res => res.veracodeStatus)
      //let penTestSlaBreach = res['list'].map(res => res.penTestSlaBreach)
      //let veracodeSlaBreach = res['list'].map(res => res.veracodeSlaBreach)
      //let veracodeDate = res['list'].map(res => res.veracodeDate)
      //let ramlReviewDate = res['list'].map(res => res.ramlReviewDate)
      //let penTestDate = res['list'].map(res => res.penTestDate)
      
      for(var i=0;i<maxCount;i++) {
        var bubbleArrayData = {
            x: srNo[i],
            y: apiClassConv[i],
            r: riskScore[i]
          }
        var color = apiTypeColor[i]
        var bubbleLabel = apiNames[i]
          bubbleArray.push({
            label: ["Api Name: " + bubbleLabel,
                    "  Risk Score: " + riskScore[i]],
            //backgroundColor:['#00395d', '#0074a6'],
            data: [bubbleArrayData],
            title: bubbleLabel,
            backgroundColor: color,
            hoverBackgroundColor: "#00395d"
          });
        }
  
  

      // console.log("BubbleArray Data= " + bubbleArray);
      // console.log("BubbleArray Length= " + bubbleArray.length);
      //console.log("BubbleArray Data[1]= " + JSON.stringify(bubbleArray[1].data));

      // START: Bubble Chart
      this.allApiChart = new Chart('canvas3', {
        type: 'bubble',
        data: {
          datasets : bubbleArray
          // datasets: [
          //   {
          //     { x: 8, y: 3, r: 10 } //<== Need to push bubble array
          //     backgroundColor: "#0074a6",
          //     hoverBackgroundColor: "#00395d"
          //   },
          // ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: false,
          animation: { duration: 2000 },
          scales: {
            yAxes: [{
              ticks: {
                callback: function(label, index, labels) {
                  switch (label) {
                    case 0:
                      return '';
                    case 1:
                      return 'Low';
                    case 2:
                      return 'Medium';
                    case 3:
                      return 'High';
                    case 4:
                      return 'Critical';
                  }
                },
                beginAtZero: true,
                mirror: false,
                stepSize: 1,
                //maxTicksLimit: maxCount,
                //suggestedMin: 0,
                //suggestedMax: maxCount
              },
              scaleLabel: {
                display: true,
                labelString: "Total Classification"
              },
            }],
            xAxes: [{
              ticks: {
                beginAtZero: true,
                mirror: false,
                //stepSize: 5,
                maxTicksLimit: maxCount,
                suggestedMin: 0,
                suggestedMax: maxCount
              },
              scaleLabel: {
                display: true,
                labelString: "Total Api"
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
