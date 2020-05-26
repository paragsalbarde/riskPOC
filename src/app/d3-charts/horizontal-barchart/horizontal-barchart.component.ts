import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';
import * as d3 from 'd3';
import * as $ from 'jquery';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-horizontal-barchart',
  templateUrl: './horizontal-barchart.component.html',
  styleUrls: ['./horizontal-barchart.component.css']
})
export class HorizontalBarchartComponent implements OnInit, OnChanges {
 @Input() chartData
 @Input() chartID

  constructor() { }

  ngOnInit() {
  
    this.drawBarchart();
  }
  ngOnChanges() {
    this.drawBarchart();
  }

  drawBarchart() {
  // START: Chart
  //console.log(this.chartData);
  var data = this.chartData;
  var chartWidth       = 300,
      barHeight        = 10,
      groupHeight      = barHeight * data.series.length,
      gapBetweenGroups = 15,
      spaceForLabels   = 150,
      spaceForLegend   = 150;
  
  // Zip the series data together (first values, second values, etc.)
  var zippedData = [];
  for (var i=0; i<data.labels.length; i++) {
    for (var j=0; j<data.series.length; j++) {
      zippedData.push(data.series[j].values[i]);
    }
  }
  
  // Color scale
  var color = d3.scaleOrdinal()
              .range(["#1f77b4", "#aec7e8", "#ff7f0e"]);
  var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;
  
  var x = d3.scaleLinear()
      .domain([0, d3.max(zippedData)])
      .range([0, chartWidth]);
  
  var y = d3.scaleLinear()
      .range([chartHeight + gapBetweenGroups, 0]);
  
  var yAxis = d3.axisLeft(<any>0)
  .scale(y)
  .tickFormat(<any>'')
  .tickSize(0);
      
  var xAxis = d3.axisBottom(x).tickFormat(<any>function(d){ 
  return d;
  });
  d3.select(".chart").html("");
  // Specify the chart area and dimensions
  var chart = d3.select(".chart")
      .attr("width", spaceForLabels + chartWidth + spaceForLegend)
      .attr("height", chartHeight +30);
      
     // console.log(chartHeight);
  
  // Create bars
  var bar = chart.selectAll("g")
      .data(zippedData)
      .enter().append("g")
      .attr("transform", function(d, i) {
        return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
      });
  
  // Create rectangles of the correct width
  bar.append("rect")
      .attr("fill", <any>function(d,i) { return color(<any>(i % data.series.length)); })
      .attr("class", "bar")
      .attr("width", x)
      .attr("height", barHeight - 1);
  
   // Add text label in bar
  bar.append("text")
        .attr("x", function(d) { return x(d) + 2; })
        .attr("y", barHeight / 2)
        .attr("class", "bar-label")
        .attr("fill", "black")
        .attr("dy", ".35em")
        .text(function(d) { return d; }); 
  
  // Draw labels
  bar.append("text")
      .attr("class", "label")
      .attr("x", function(d) { return - 130; })
      .attr("y", groupHeight / 2)
      .attr("dy", ".35em")
      .text(function(d,i) {
        if (i % data.series.length === 0)
          return data.labels[Math.floor(i/data.series.length)];
        else
          return ""});
  
  chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
        .call(yAxis);
        
   chart.append("g")         // Add the X Axis
          .attr("class", "x axis")
          .attr("transform", "translate(" + spaceForLabels + "," + chartHeight + ")")
          .call(xAxis);
  
  // Draw legend
  var legendRectSize = 18,
      legendSpacing  = 4;
  
  var legend = chart.selectAll('.legend')
      .data(data.series)
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
      .style('fill', <any>function (d, i) { return color(<any>i); })
      .style('stroke', <any>function (d, i) { return color(<any>i); });
  
  legend.append('text')
      .attr('class', 'legend')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function (d) { return d['label']; });
  }

}
