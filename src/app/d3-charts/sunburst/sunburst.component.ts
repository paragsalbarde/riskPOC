import { Component, OnInit } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';
import { ChartType, MultiDataSet, Label} from 'chart.js';
import {  } from 'ng2-charts';
import 'chart.piecelabel.js';
import { Observable } from 'rxjs';
// npm install chart.piecelabel.js --save
@Component({
  selector: 'app-sunburst',
  templateUrl: './sunburst.component.html',
  styleUrls: ['./sunburst.component.css']
})

export class SunburstComponent implements OnInit {
  
  public chartType: string = 'doughnut';
  public mereLabels:  Array<any> = [
    ['aaa', 'bbb', 'ccc','ddd', 'eee', 'fff', 'ggg', 'hhh', 'iii'],
    // ['aaa', 'bbb', 'ccc'],
    // ['ddd', 'eee', 'fff'],
    // ['ggg', 'hhh', 'iii'],
  ];
  public chartLabels: Array<string> = ['January', 'February', 'March'];
   public chartData: Array<number> = [1, 1, 1];
  // public chartData: MultiDataSet = [
  //   [350, 450, 100],
  //   [50, 150, 120],
  //   [250, 130, 70],
  // ];

  public chartOptions: any = {
    pieceLabel: {
      render: function (args) {
        const label = args.label,
              value = args.value;
        return label + ': ' + value;
      }
    }
  }
 constructor(private _getReport: NewDataService) { }
  
 ngOnInit() {  }

  
}
