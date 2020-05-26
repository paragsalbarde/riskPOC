import { Component, OnChanges, OnInit, EventEmitter, ViewChild, ElementRef, Input, Output, AfterViewInit } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';
//import * as d3 from 'd3-selection';
import * as d3 from 'd3';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() chartData;
  @Input() chartID;
  @Output() chartDetails = new EventEmitter();

  public chart:any;
  constructor(private _getReport: NewDataService ) { }
  ngAfterViewInit() {
   
  
}
  ngOnInit() {
     this.drawPiechart();
  }
  ngOnChanges() {
    this.drawPiechart();
  }

  drawPiechart() {
      var self = this;
      const width = 350;
      const height = 350;
      const radius = Math.min(width, height) / 2 -15;
      d3.select("#"+this.chartID).html("");
      
      const svg = d3.select("#"+this.chartID)
          .append("svg")
              .attr("width", width)
              .attr("height", height)
          .append("g")
              .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
      var arrRisksColor = ['External', 'Internal', 'Low', 'Medium','High', 'Critical', 'Met'];
      var color = d3.scaleOrdinal()
                  .domain(arrRisksColor)
                  .range(["#49d9eb", "#00a5b6", "#95d7ff" , "#7bbfff", "#ffa500", "#ed332d", "#dedede"]); 
                  
      const pie = d3.pie()
          .value(d => d['count'])
          .sort(null);
  
      const arc = d3.arc()
          .innerRadius(0)
          .outerRadius(radius);
  
        d3.selectAll("input")
        const path = svg.append("g").selectAll("path")
            .data(pie(this.chartData['data'])).enter().append("g")
            .on('click', d => {
              const data = {
                data : d,
                type : 'piechart'
              }
              self.chartDetails.emit(data);
          });
          path.append("title").text(
              function (d) {
                  return `${(d.data['name'] !== undefined) ? d.data['name'] : 'NA'}\n\r(${(d.data['count'] !== undefined) ? Math.ceil((d.data['count']/self.chartData['count'])*100) : ''}%)`;
               }
            )
        // Update existing arcs
        path.transition().duration(200).attrTween("d", arcTween);
  
        // Enter new arcs
        path.append("path")
            .attr("fill", (d, i) => <any>color(d.data['name']))
            .attr("d", <any>arc)
            .attr("stroke", "white")
            .attr("stroke-width", "1px")
            //.each(function(d) { this._current = d; });
            path.exit().remove()
        var text = path.append("text")
    
        .attr("fill", "black")
        .attr("style", "font-size:11px") 
        .attr("x", function (d) {
            return arc.centroid(<any>d)[0]-10;
        })
        .attr("y", function (d) {
            return arc.centroid(<any>d)[1];
        })
        .text(function (d) {
            //return `${(d.data['name'] !== undefined) ? d.data['name'] : 'NA'}\n\r(${(d.data['count'] !== undefined) ? Math.ceil((d.data['count']/self.chartData['count'])*100) : ''}%)`;
            return `${(d.data['count'] !== undefined) ? d.data['count'] : 'NA'}\n\r(${(d.data['count'] !== undefined) ? Math.ceil((d.data['count']/self.chartData['count'])*100) : ''}%)`;
        });
      //Draw Legend
      this.drawLegend(svg, color);
      //
      function arcTween(a) {
          const i = d3.interpolate(this._current, a);
          this._current = i(1);
          return (t) => arc(i(t));
      }
  }
  drawLegend(svg, color) {
       // Draw legend
    var legendRectSize = 18,
    legendSpacing  = 4,
    chartWidth       = 300,
    gapBetweenGroups = 15,
    spaceForLabels   = 150,
    spaceForLegend   = 150;
  var chart = d3.select(".pieChartLegend")
  .attr("width", spaceForLabels + chartWidth + spaceForLegend)
  .attr("height", 120);
    //console.log(this.chartData);
    var legend = chart.selectAll('.legend')
    .data(this.chartData.data)
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
