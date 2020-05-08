import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';
//import * as d3 from 'd3-selection';
import * as d3 from 'd3';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  @Input() chartData;
  @Input() chartID;
  public chart:any;
  constructor(private _getReport: NewDataService ) { }

  ngOnInit() {

    var self = this;
    var margin = {top: 10, right: 0, bottom: 30, left: 30},
    width = 370 - margin.left - margin.right,
    height = 330 - margin.top - margin.bottom;

    //var x0  = d3.scaleBand().rangeRound([0, width], .5);
    var x0  = d3.scaleBand().rangeRound([0, width]);
    var x1  = d3.scaleBand();
    var y   = d3.scaleLinear().rangeRound([height, 0]);

    var xAxis = d3.axisBottom(null).scale(x0)
                                .tickFormat(null)
                                .tickValues(this.chartData.map(d=>d.key));

    var yAxis = d3.axisLeft(null).scale(y);

    //const color = d3.scaleOrdinal(d3.schemeCategory10);
    // const color = d3.scaleOrdinal(["#016da9","#7bbfff", "#62a8e9","#dedede", "#00a5b6"]);
    const color = d3.scaleOrdinal(["#17c3b2","#227c9d"]);
    
    var svg = d3.select('#'+this.chartID).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var categoriesNames = this.chartData.map(function(d) { return d.key; });
    var rateNames       = this.chartData[0].values.map(function(d) { return d.groupName; });

    x0.domain(<any>categoriesNames);
    x1.domain(rateNames).rangeRound([0, x0.bandwidth()]).paddingOuter(0.2);
    y.domain([0, <any>d3.max(self.chartData, function(key) { return d3.max(key['values'], function(d) { return d['groupValue']; }); })]);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);


    svg.append("g")
      .attr("class", "y axis")
      .style('opacity','0')
      .call(yAxis)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style('font-weight','bold')
            .text("Value");

    svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');

    var slice = svg.selectAll(".slice")
      .data(this.chartData)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform",function(d) { return "translate(" + x0(<any>d['key']) + ",0)"; });

      slice.selectAll("rect")
      .data(function(d) { return d['values']; })
        .enter().append("rect")
            .attr("width", 26)
            //.attr("width", x1.bandwidth())
            .attr("x", function(d) { return x1(d['groupName']); })
            .style("fill", function(d) { return color(d['groupName']) })
            .attr("y", function(d) { return y(0); })
            .attr("height", function(d) { return height - y(0); })
            .on("mouseover", function(d) {
                d3.select(this).style("fill", <any>d3.rgb(color(d['groupName'])).darker(2));
            })
            .on("mouseout", function(d) {
                d3.select(this).style("fill", color(d['groupName']));
            });


    slice.selectAll("rect")
      .transition()
      .delay(function (d) {return Math.random()*1000;})
      .duration(1000)
      .attr("y", function(d) { return y(d['groupValue']); })
      .attr("height", function(d) { return height - y(d['groupValue']); });

      //Legend
  var legend = svg.selectAll(".legend")
      .data(this.chartData[0].values.map(function(d) { return d.groupName; }).reverse())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
      .style("opacity","0");

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) { return color(<any>d); });

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(<any>function(d) {return d; });

  legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");
  }
}