import { Component, OnInit } from '@angular/core';
import { ApiRiskReportDataService } from '../../../shared/api-risk-report-data.service';
import { ChartsModule } from 'ng2-charts';
import { Chart, ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-pending-api',
  templateUrl: './pending-api.component.html',
  styleUrls: ['./pending-api.component.css']
})
export class PendingApiComponent implements OnInit {

  pendingApiChart = [];

  constructor(private _riskReport: ApiRiskReportDataService) { }

  ngOnInit() {
    this._riskReport.riskReport().subscribe(res => {
      let apiNames = res['list'].map(i => i.apiName)
      
      let veracodeStatusPending_high = res['list'].filter(i => i.apiRiskClassification === 'High' && i.veracodeStatus === 'Pending')
      .map(res => res.apiName).length
      let veracodeStatusPending_low = res['list'].filter(i => i.apiRiskClassification === 'Low' && i.veracodeStatus === 'Pending')
      .map(res => res.apiName).length
      let veracodeStatusPending_medium = res['list'].filter(i => i.apiRiskClassification === 'Medium' && i.veracodeStatus === 'Pending')
      .map(res => res.apiName).length
      let veracodeStatusPending_critical = res['list'].filter(i => i.apiRiskClassification === 'Critical' && i.veracodeStatus === 'Pending')
      .map(res => res.apiName).length

      let penTestStatusPending_high = res['list'].filter(i => i.apiRiskClassification === 'High' && i.penTestStatus === 'Pending')
      .map(res => res.apiName).length
      let penTestStatusPending_low = res['list'].filter(i => i.apiRiskClassification === 'Low' && i.penTestStatus === 'Pending')
      .map(res => res.apiName).length
      let penTestStatusPending_medium = res['list'].filter(i => i.apiRiskClassification === 'Medium' && i.penTestStatus === 'Pending')
      .map(res => res.apiName).length
      let penTestStatusPending_critical = res['list'].filter(i => i.apiRiskClassification === 'Critical' && i.penTestStatus === 'Pending')
      .map(res => res.apiName).length



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
      console.log("VeraCode: " +veracodeStatusPending_medium);
      console.log("PenTest: " +penTestStatusPending_medium);


      // START: Bubble Chart
      // START: Doughnut Chart
      this.pendingApiChart = new Chart('canvas4', {
        type: 'bar',
        data: {
          
          labels: ['Critical', 'High', 'Medium', 'Low'],
          datasets: [
            {
              label: "Internal Pending",
              fill:false,
              data: [veracodeStatusPending_high, veracodeStatusPending_low, veracodeStatusPending_medium, veracodeStatusPending_critical],
              backgroundColor: ['#31dc26', '#31dc26', '#31dc26', '#31dc26'],
            },
            {
              label: "External Pending",
              fill:false,
              data: [penTestStatusPending_high, penTestStatusPending_low, penTestStatusPending_medium, penTestStatusPending_critical],
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
                stepSize: 1,
                //maxTicksLimit: 5,
                suggestedMin: 0,
                //suggestedMax: maxCount
              }
            }]
          }
        }
      });



    })



  }
}
  //Barclays Colors: #00395d #31dc26 #00aeef
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