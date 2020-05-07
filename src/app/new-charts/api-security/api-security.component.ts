import { Component, OnInit } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';
import { ChartType, MultiDataSet, Label, ChartDataSets} from 'chart.js';
import { Color } from 'ng2-charts';
import 'chart.piecelabel.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-api-security',
  templateUrl: './api-security.component.html',
  styleUrls: ['./api-security.component.css']
})
export class ApiSecurityComponent implements OnInit {
  public securityRiskData
  public chartType: string = 'pie';
  public chartLabels: any[] = ['No Risk','Low', 'Medium', 'High', 'Critical'];
  // public chartData: Array<number> = [1, 2, 3];
  public chartData: any[] = [{data:null, label: 'risk'}]
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
            fontColor : '#ffffff',
            display: false
          }
        }
  }
  private donutColors=[
    {
      // backgroundColor: [ '#f7f4bf', '#eabd3b','#ee9a3a', '#de542c', '#820401'  ]
      // backgroundColor: [ '#cddc39', '#ffeb3b','#ffc107', '#ff9800', '#ff5722' ]
      backgroundColor: [ '#e7e34e', '#eabd3b','#ee9a3a', '#de542c', '#c02323' ]
    }
  ];

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

        this.chartData = [riskCountNoRisk, riskCountLow, riskCountMedium, riskCountHigh, riskCountCritical];
        //this.chartLabels = ['Low', 'Medium', 'High', 'Critical', 'No Risk'];
        //console.log("No Risk : "+ securityRiskData)
        // END: DATA from JSON

      });
  
  
  }
}
