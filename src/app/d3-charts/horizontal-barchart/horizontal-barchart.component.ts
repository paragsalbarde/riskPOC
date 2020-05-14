import { Component, OnInit, Input } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';
import * as d3 from 'd3';
import * as $ from 'jquery';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-horizontal-barchart',
  templateUrl: './horizontal-barchart.component.html',
  styleUrls: ['./horizontal-barchart.component.css']
})
export class HorizontalBarchartComponent implements OnInit {
 @Input() chartData
 @Input() chartID

  constructor() { }

  ngOnInit() {
    // START: Chart
    var data = this.chartData;
    // var data = {
    //   labels: [
    //     'External-Met', 'External-Low', 'External-High', 'External-Medium', 'External-Critical',
    //     'Internal-Met', 'Internal-Low', 'Internal-High', 'Internal-Medium', 'Internal-Critical'
    //   ],
    //   series: [
    //     {
    //       label: 'Pen Test',
    //       values: [14, 8, 15, 55, 57, 14, 8, 15, 55, 57]
    //     },
    //     {
    //       label: 'Veracode Scan',
    //       values: [14, 8, 15, 55, 57, 14, 8, 15, 55, 57]
    //     },
    //     {
    //       label: 'RamlReview',
    //       values: [12, 43, 22, 89, 65, 12, 43, 22, 89, 65]
    //     }],
        
    // };
    
    var chartWidth       = 300,
        barHeight        = 10,
        groupHeight      = barHeight * data.series.length,
        gapBetweenGroups = 5,
        spaceForLabels   = 150,
        spaceForLegend   = 150;
    
    // Zip the series data together (first values, second values, etc.)
    var zippedData = [];
    for (var i=0; i<data.labels.length; i++) {
      for (var j=0; j<data.series.length; j++) {
        zippedData.push(data.series[j].values[i]);
      }
    }
    
    console.log(zippedData);
    // Color scale
    var color = d3.scaleOrdinal()
                .range(["#16A085", "#33435C", "#1277BB"]);
    var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;
    
    var x = d3.scaleLinear()
        .domain([0, d3.max(zippedData)])
        .range([0, chartWidth]);
    
    var y = d3.scaleLinear()
        .range([chartHeight + gapBetweenGroups, 0]);
    
    var yAxis = d3.axisLeft()
        .scale(y)
        .tickFormat('')
        .tickSize(0);
        
    var xAxis = d3.axisBottom(x).tickFormat(function(d){ 
    return d;
    });
    
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
        .attr("fill", function(d,i) { return color(i % data.series.length); })
        .attr("class", "bar")
        .attr("width", x)
        .attr("height", barHeight - 1);
    
    /* // Add text label in bar
    bar.append("text")
        .attr("x", function(d) { return x(d) - 3; })
        .attr("y", barHeight / 2)
        .attr("fill", "red")
        .attr("dy", ".35em")
        .text(function(d) { return d; }); */
    
    // Draw labels
    bar.append("text")
        .attr("class", "label")
        .attr("x", function(d) { return - 100; })
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
        .style('fill', function (d, i) { return color(i); })
        .style('stroke', function (d, i) { return color(i); });
    
    legend.append('text')
        .attr('class', 'legend')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function (d) { return d.label; });
    
    // END: Chart
  }

}
