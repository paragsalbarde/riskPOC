import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  riskScoreVar
  middleCircleData
  riskScoreLevel


  public POP: any[] = [
    {age: '<5', pop: 2704669,},
    {age: '5-14', pop: 4499890},
    {age: '15-17', pop: 2159981},
    {age: '18-24', pop: 3853788},
    {age: '25-44', pop: 14106543},
    {age: '45-64', pop: 8819342},
    {age: '≥64', pop: 612463}
  ];
  
  public tp: any[]= [
    {age: this.riskScoreVar, pop: this.middleCircleData }
  ]

  title = 'Donut Chart';
  private width: number;
  private height: number;
  private svg: any;     // TODO replace all `any` by the right type
  private radius: number;
  private arc: any;
  private pie: any;
  private color: any;
  private g: any;

  constructor(private _getReport: NewDataService ) { }

  ngOnInit() {
    this.initSvg()
    this.drawChart(this.POP)
    
    this._getReport.getReport()
      .subscribe(res => {
        //START: DATA from JSON
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
    // console.log("Risk Avg: "+ avgRisk)
    // console.log(overAllRiskLevel)
    

    //END: DATA from JSON

    var outerCircle = [intRamlRvStsDn, intRamlRvStsPn, intVeracodeStsDn, intVeracodeStsPn, intPenTstStsDn, intPenTstStsPn,
                       extRamlRvStsDn, extRamlRvStsPn, extVeracodeStsDn, extVeracodeStsPn, extPenTstStsDn, extPenTstStsPn];

    let middleCircle = [intRamlRvSts, intVeracodeSts, intPenTstSts, extRamlRvSts, extVeracodeSts, extPenTstSts];

    var innerCircle = [internalApiCount, externalApiCount];
    
    let innerCircleColor = [ "#da8f34", '#46bfbd']
    let middleCircleColor = [ "#da8f34cc","#da8f34cc", "#da8f34cc", '#46bfbdcc', '#46bfbdcc', '#46bfbdcc']
    let outerCircleColor = [ "#95b53c","#f7464a", "#95b53c", '#f7464a', '#95b53c', '#f7464a',
                              "#95b53c","#f7464a", "#95b53c", '#f7464a', '#95b53c', '#f7464a']
    this.middleCircleData = middleCircle
    //console.log("Middle Circle Data: "+ this.middleCircleData)
    });
    
  }

  // START: D3 Methods
  private initSvg() {
    this.svg = d3.select('svg');

    this.width = +this.svg.attr('width');
    this.height = +this.svg.attr('height');
    this.radius = Math.min(this.width, this.height) / 2;

    this.color = d3Scale.scaleOrdinal()
        .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

    this.arc = d3Shape.arc()
        .outerRadius(this.radius - 10)
        .innerRadius(this.radius - 90);

    this.pie = d3Shape.pie()
        .sort(null)
        .value((d: any) => d.pop);

    this.svg = d3.select('svg')
        .append('g')
        .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  private drawChart(data: any[]) {
    let g = this.svg.selectAll('.arc')
        .data(this.pie(data))
        .enter().append('g')
        .attr('class', 'arc');

    g.append('path')
        .attr('d', this.arc)
        .style('fill', d => this.color(d.data.pop));

    g.append('text')
        .attr('transform', d => 'translate(' + this.arc.centroid(d) + ')')
        .attr('dy', '.35em')
        .text(d => d.data.pop);
  }
  // END: D3 Methods

}
