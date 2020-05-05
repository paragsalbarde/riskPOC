import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts'
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiRiskReportDataService } from '../../../shared/api-risk-report-data.service';

@Component({
  selector: 'app-api-risk-report-json',
  templateUrl: './api-risk-report-json.component.html',
  styleUrls: ['./api-risk-report-json.component.css']
})
export class ApiRiskReportJsonComponent implements OnInit {

  constructor( private httpService: HttpClient, private _riskReport: ApiRiskReportDataService ) { }

  labels =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  
  // OBJECT FOR datasets WITH EMPTY data.
  chartData = [
    {
      label: '1st Year',
      data: [],
      months: []
    },
    { 
      label: '2nd Year',
      data: [],
      months: []
    }
   ];

   // CHART COLOR.
   colors = [
    { // 1st Year.
      backgroundColor: 'rgba(77,83,96,0.2)'
    },
    { // 2nd Year.
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    }
   ]

  ngOnInit() {
    this._riskReport.riskReport().subscribe(
      data => {
          this.chartData = data as any [];	 // FILL THE CHART ARRAY WITH DATA.
          console.log(this.chartData[1]);
      },
     (err: HttpErrorResponse) => {
          //console.log (err.message);
      }
      );
      
  }

  onChartClick(event) {
    console.log(event);
  }

}
