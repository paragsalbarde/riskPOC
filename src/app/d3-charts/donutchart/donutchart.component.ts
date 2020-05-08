import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';
//import * as d3 from 'd3-selection';
import * as d3 from 'd3';
import * as $ from 'jquery';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-donutchart',
  templateUrl: './donutchart.component.html',
  styleUrls: ['./donutchart.component.css']
})
export class DonutchartComponent implements OnInit {
  @Input() chartData;
  @Input() chartID;
  @Input() chartSetting;

  public chart:any;
  constructor(private _getReport: NewDataService ) { }

  ngOnInit() {
    var self = this;  
    var width = 330;
    var height = 330;
    var radius = Math.min(width, height) / 2;
    var arrRisksColor = ['External', 'Internal', 'Low', 'Medium','High', 'Critical', 'No Risk'];
    var color = d3.scaleOrdinal()
                .domain(arrRisksColor)
                .range(["#49d9eb", "#00a5b6", "#95d7ff" , "#7bbfff", "#016da9", "#62a8e9", "#dedede"]);


    var svg = d3.select('#'+this.chartID)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')');
                /*.on("load", function() {
                  $("svg text[title='Sunburst']").css({"font-size": "16px !important"});
                });*/
    
    var partition = d3.partition()
        .size([360, radius])
        .padding(0)
        .round(true);

  let root = d3.hierarchy(this.chartData)
      root.sum(d => d.size)
      .sort(function(a,b){
        if(a.data['size'] < b.data['size']) return -1;
        //if(a.data['size'] > b.data['size']) return 1;
        return 0;
      });

    //set partition
    partition(root)

    var x = d3.scaleLinear()
    .range([0, 2 * Math.PI]);
  
    var y = d3.scaleSqrt()
    .range([0, radius]);
    
    var xScale = d3.scaleLinear()
        .domain([0, radius])
        .range([0, Math.PI * 2])
        .clamp(true);
    
   var arc = d3.arc()
        .startAngle(function(d) {  return xScale(d["x0"]) })
        .endAngle(function(d) { return xScale(d["x1"]) })
        .innerRadius(function(d) { return d['y0'] })
        .outerRadius(function(d) { return d['y1'] })
    
    var path = svg.append("g").selectAll('g')
        .data(partition(root).descendants())
        .enter().append("g")
      /*  .on("mousemove",function(d){
          var mouseVal = d3.mouse(this);
          div.style("display","none");
          div
          .html("name:"+d.data.name+"</br>"+"size:"+d.data.size)
          .style("left", (d3.event.pageX-220) + "px")
          .style("top", (d3.event.pageY+120) + "px")
          .style("opacity", 1)
          .style("position", 'absolute')
          .style("display","block");
      })*/
        
    path.append('path')
      .attr("display", function(d) { return d.depth ? null : "none"; })
      .attr("d", <any>arc)
      .attr("fill-rule", "evenodd")
      .style('stroke', '#fff')
      .style("fill", <any>function(d) {return color(d.data['name']); })

    path.append("title")
      .text(
        function (d) {
          if(d.data['name'] == "Sunburst") {
            return `${self.chartSetting.avgRiskLevel} \r\n ${self.chartSetting.avgRisk}`;
          } else {
            return `${(d.data['name'] !== undefined) ? d.data['name'] : 'NA'}\n\r(${(d.data['count'] !== undefined) ? Math.ceil((d.data['count']/self.chartData['count'])*100) : ''}%)`;
          }
         }
      )

    path.append("text")
      .attr("transform", <any>function (d) { 
          //const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
          //const y = (d.y0 + d.y1) / 2 * radius;
        // return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      })
      .attr("fill", "black")
      .attr("title", function(d) {
        return `${(d.data['name'] !== undefined) ? d.data['name'] : 'NA'}`;
      })
      .attr("style", "font-size:10px") 
      .attr("x", function (d) {
          return arc.centroid(<any>d)[0]-20;
      })
      .attr("y", function (d) {
          return arc.centroid(<any>d)[1];
      })
      .text(function (d) {
          if(d.data['name'] == "Sunburst") {
            return `${self.chartSetting.avgRiskLevel} \r\n ${self.chartSetting.avgRisk}`;
          } else {
            return `${(d.data['name'] !== undefined) ? d.data['name'] : 'NA'}`;
          }
      })
      path.append("text")
      .attr("title", function(d) {
        return `${(d.data['name'] !== undefined) ? d.data['name'] : 'NA'}`;
      })
      .attr("style", "font-size:10px") 
      .attr("x", function (d) {
          return arc.centroid(<any>d)[0]-20;
      })
      .attr("y", function (d) {
          return arc.centroid(<any>d)[1]+15;
      })
      .text(function (d) {
        if(d.data['name'] == "Sunburst") {
          //return `${self.chartSetting.avgRiskLevel} \r\n ${self.chartSetting.avgRisk}`;
        } else {
          //return `${(d.data['name'] !== undefined) ? d.data['name'] : 'NA'}\n\r(${(d.data['count'] !== undefined) ? Math.ceil((d.data['count']/self.chartData['count'])*100) : ''}%)`;
          return `(${(d.data['count'] !== undefined) ? Math.ceil((d.data['count']/self.chartData['count'])*100) : ''}%)`;
        }
    });
    setTimeout(()=> {
      $("text[title='Sunburst']").css({"font-size": "16px !important"});
    }, 1000)
  }
  
}
