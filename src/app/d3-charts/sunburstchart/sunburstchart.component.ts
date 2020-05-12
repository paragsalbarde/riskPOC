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
  @Input() chartID;
  @Input() chartSetting;
  public chart:any;
  constructor(private _getReport: NewDataService ) { }

  ngOnInit() {
 //   const width = 400,
  //  height = 400,
  //  maxRadius = (Math.min(width, height) / 2) - 5;
  
  var width = 330;
  var height = 330;
  var radius = Math.min(width, height) / 2;

const formatNumber = d3.format(',d');

const x = d3.scaleLinear()
    .range([0, 2 * Math.PI])
    .clamp(true);

const y = d3.scaleSqrt()
    .range([radius*.1, radius]);
    

const color = d3.scaleOrdinal(d3.schemeCategory10);

const partition = d3.partition();

const arc = d3.arc()
    .startAngle(d => x(d['x0']))
    .endAngle(d => x(d['x1']))
    .innerRadius(d => Math.max(0, y(d['y0'])))
    .outerRadius(d => Math.max(0, y(d['y1'])));

const middleArcLine = d => {
    const halfPi = Math.PI/2;
    const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
    const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);

    const middleAngle = (angles[1] + angles[0]) / 2;
    const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw
    if (invertDirection) { angles.reverse(); }

    const path = d3.path();
    path.arc(0, 0, r, angles[0], angles[1], invertDirection);
    return path.toString();
};

const textFits = d => {
    const CHAR_SPACE = 6;

    const deltaAngle = x(d.x1) - x(d.x0);
    const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);
    const perimeter = r * deltaAngle;

    return d.data.name.length * CHAR_SPACE < perimeter;
};

const svg = d3.select('#container3').append('svg')
    .style('width', width)
    .style('height', height)
    .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`)
    //.attr('transform', 'translate(' + width/2 + ',' + height/2 + ')')
     // Reset zoom on canvas click


    

    var root = d3.hierarchy(this.chartData);
    root.sum(d => d.size);

    const slice = svg.selectAll('g.slice')
        .data(partition(root).descendants());

    slice.exit().remove();

    const newSlice = slice.enter()
        .append('g').attr('class', 'slice')
        .on('click', d => {
            d3.event.stopPropagation();
            //this.focusOn(d);
        });

    newSlice.append('title')
        .text(d => d.data['name'] + '\n' + formatNumber(d.value));

    newSlice.append('path')
        .attr('class', 'main-arc')
        .style('fill', d => color((d.children ? d : d.parent).data['name']))
        .attr('d', <any>arc);

    newSlice.append('path')
        .attr('class', 'hidden-arc')
        .attr('id', (_, i) => `hiddenArc${i}`)
        .attr('d', middleArcLine);

    const text = newSlice.append('text')
        .attr('display', d => textFits(d) ? null : 'none');

    // Add white contour
    text.append('textPath')
        .attr('startOffset','50%')
        .attr('xlink:href', (_, i) => `#hiddenArc${i}` )
        .text(d => d.data['name'])
        .style('fill', 'none')
        .style('stroke', '#fff')
        .style('stroke-width', 5)
        .style('stroke-linejoin', 'round');

    text.append('textPath')
        .attr('startOffset','50%')
        .attr('xlink:href', (_, i) => `#hiddenArc${i}` )
        .text(d => d.data['name']);
  }
  
 tooltipFunc(branch) {
    return branch.name;
  }
  computeTextRotation(d) {
    //var angle = x(d.x + d.dx / 2) - Math.PI / 2;
    //return angle / Math.PI * 180;
  }
}
