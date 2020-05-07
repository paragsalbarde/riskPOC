import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';
//import * as d3 from 'd3-selection';
import * as d3 from 'd3';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sunburstchart',
  templateUrl: './sunburstchart.component.html',
  styleUrls: ['./sunburstchart.component.css']
})
export class SunburstchartComponent implements OnInit {
  @Input() chartData;
  public chart:any;
  constructor(private _getReport: NewDataService ) { }

  ngOnInit() {
    var width = 400;
var height = 400;
var radius = Math.min(width, height) / 2;
var color = d3.scaleOrdinal(d3.schemeCategory10)

var g = d3.select('#container')
												.append('svg')
													.attr('width', width)
    									.attr('height', height)
												.append('g')
												  .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')');;

var partition = d3.partition()
    .size([360, radius])
    .padding(0)
				//.round(true);

var root = d3.hierarchy(this.chartData, function(d) { return d.children })
    .sum( function(d) { 			
								if(d.children) {
								    return 0
								} else {
								    return 1
								}
				})
				//.sort(null);

partition(root)

var xScale = d3.scaleLinear()
    .domain([0, radius])
    .range([0, Math.PI * 2])
    .clamp(true);

var arc = d3.arc()
    .startAngle(function(d) { return xScale(d['x0']) })
    .endAngle(function(d) { return xScale(d['x1']) })
    .innerRadius(function(d) { return d['y0'] })
    .outerRadius(function(d) { return d['y1'] })

var path = g.selectAll('path')
    .data(root.descendants())
    .enter().append('path')
        .attr("display", function(d) { return d.depth ? null : "none"; })
        .attr("d", <any>arc)
        .attr("fill-rule", "evenodd")
        .style('stroke', '#fff')
        .style("fill", function(d) { return color((d.children ? d : d.parent).data.name); })
  }
 tooltipFunc(branch) {
    return branch.name;
  }
  computeTextRotation(d) {
    //var angle = x(d.x + d.dx / 2) - Math.PI / 2;
    //return angle / Math.PI * 180;
  }
}
