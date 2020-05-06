import { Component, OnInit } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';
import { ChartType, MultiDataSet, Label} from 'chart.js';
import  * as chart from 'ng2-charts';
import 'chart.piecelabel.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-api-security',
  templateUrl: './api-security.component.html',
  styleUrls: ['./api-security.component.css']
})
export class ApiSecurityComponent implements OnInit {
  public chartType: string = 'pie';
  public chartLabels: Array<string> = ['January', 'February', 'March'];
  public chartData: Array<number> = [1, 2, 3];

  public chartOptions: any = {
    pieceLabel: {
      render: function (args) {
        const label = args.label,
              value = args.value;
        return label + ': ' + value;
      }
    },
    responsive: true,
        legend: {
            display: false,
            labels: {
                display: false
            }
        }
  }

  constructor(private _getReport: NewDataService) {}

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

      });
  
  
  }
}
