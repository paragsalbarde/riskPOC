import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';
import { ChartType, MultiDataSet, Label} from 'chart.js';
import * as d3 from 'd3';
import * as $ from 'jquery';

import { Observable } from 'rxjs';
// npm install chart.piecelabel.js --save
@Component({
  selector: 'app-sunburst',
  templateUrl: './sunburst.component.html',
  styleUrls: ['./sunburst.component.css']
})

export class SunburstComponent implements OnInit {
 @Input() chartData;
 @Input() chartID;
 @Input() chartSetting;
 @Output() chartDetails = new EventEmitter();
 constructor(private _getReport: NewDataService) { }
  
ngOnInit() {  
  this.drawSunburst();
}

ngOnChanges() {
 this.drawSunburst();
}

labelVisible(d) {
  return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
}

 labelTransform(d, radius) {
   const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
   const y = (d.y0 + d.y1) / 2 * radius;
   return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
}

drawSunburst() {
  var self = this;
  const format = d3.format(",d");
  const width = 330;
  const radius = width / 6;
  $("svg#partitionSVG").html("");
  const arc = d3.arc()
          .startAngle(d => d['x0'])
          .endAngle(d => d['x1'])
          .padAngle(d => Math.min((d['x1'] - d['x0']) / 2, 0.005))
          .padRadius(radius * 1.5)
          .innerRadius(d => d['y0'] * radius)
          .outerRadius(d => Math.max(d['y0'] * radius, d['y1'] * radius - 1));

  const partition = data => {
      const root = d3.hierarchy(data)
              .sum(d => d.size)
              .sort((a, b) => b.value - a.value);
      return d3.partition()
              .size([2 * Math.PI, root.height + 1])
              (root);
  }

    const root = partition(this.chartData);
    //const color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, (this.chartData.children.length + 1)));
    var arrRisksColor = ['External', 'Internal', 'Low', 'Medium','High', 'Critical', 'Met'];
    var color = d3.scaleOrdinal()
    .domain(arrRisksColor)
    .range(["#49d9eb", "#00a5b6", "#95d7ff" , "#7bbfff", "#ffa500", "#ed332d", "#dedede"]); 
    

    root.each(d => d['current'] = d);

    const svg = d3.select('#partitionSVG')
            .style("width", "100%")
            .style("height", "auto")
            .style("font", "10px sans-serif");
            
       

    const g = svg.append("g")
            .attr("transform", `translate(${width / 2},${width / 2})`);

            svg.exit().remove();

    const path = g.append("g")
            .selectAll("path")
            .data(root.descendants().slice(1))
            .join("path")
            .attr("fill", d => {
                return <any>color(d.data['name']);
            }).on('click', d => {
              const data = {
                data : d,
                type : 'donut'
              }
              self.chartDetails.emit(data);
          })
          .attr("d", d => arc(d['current']));

    path.filter(d => <any>d.children)
            .style("cursor", "pointer")

    path.append("title")
            .text(d => `${d.ancestors().map(d => (d.data['name'] !== 'Sunburst') ? d.data['name'] : "").reverse().join("\r\n")}\n\r${format(d.value)}`);
            path.exit().remove()
    const label = g.append("g")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .style("user-select", "none")
            .selectAll("text")
            .data(root.descendants().slice(1))
            .join("text")
            .attr("dy", "0.35em")
            .attr("fill-opacity", d => +this.labelVisible(d['current']))
            .attr("transform", d => this.labelTransform(d['current'], radius))
            //.text(d => `${d.data['name']}(${(d.data['count'] !== undefined) ? Math.ceil((d.data['count']/self.chartData['count'])*100) : ''}%)`)
            .text(d => `${d.data['count']}(${(d.data['count'] !== undefined) ? Math.ceil((d.data['count']/self.chartData['count'])*100) : ''}%)`)
           

    const parent = g.append("circle")
            .datum(root)
            .attr("r", radius)
            .attr("fill", "none")
            .attr("text-anchor", "middle")
            .attr("pointer-events", "all")

            /*g.append("text")
            .attr("style",'color:#000')
            .attr('class', 'risk-level-sun')
            .text(d => `${self.chartSetting.avgRiskLevel} Risk`);*/

            g.append("text")
            .attr('class', 'risk-score-sun')
            .attr("style",'color:#000')
            .text(d => `${self.chartSetting.avgRiskLevel} Risk`);
            this.drawLegend(color);

}
drawLegend( color) {
   // Draw legend
   var legendRectSize = 18,
        legendSpacing  = 4,
        chartWidth     = 300,
        gapBetweenGroups = 15,
        spaceForLabels   = 150,
        spaceForLegend   = 150;
   var chart = d3.select(".sunChartLegend")
   .attr("width", spaceForLabels + chartWidth + spaceForLegend)
   .attr("height", 160);
     var legend = chart.selectAll('.legend')
     .data(this.chartData.children)
     .enter()
     .append('g')
     .attr('transform', function (d, i) {
         var height = legendRectSize + legendSpacing;
         var offset = -gapBetweenGroups/2;
         var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
         var vert = i * height - offset;
         return 'translate(' + horz + ',' + vert + ')';
     });
 
     legend.append('rect')
     .attr('width', legendRectSize)
     .attr('height', legendRectSize)
     .style('fill', <any>function (d, i) { return color(<any>d['name']); })
     .style('stroke', <any>function (d, i) { return color(<any>d['name']); });
 
     legend.append('text')
     .attr('class', 'legend')
     .attr('x', legendRectSize + legendSpacing)
     .attr('y', legendRectSize - legendSpacing)
     .text(function (d) { return d['name']; });
   }
  
}
