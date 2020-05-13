import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
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
  @Output() chartDetails = new EventEmitter();

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
                //.range(["#49d9eb", "#00a5b6", "#95d7ff" , "#7bbfff", "#016da9", "#62a8e9", "#dedede"]);
                .range(["#49d9eb", "#00a5b6", "#95d7ff" , "#7bbfff", "#016da9", "#ef6b71", "#dedede"]); //01
                //.range(['#da8f34', '#142459', '#eabd3b', '#ee9a3a', '#de542c', '#820401', '#f7f4bf']);
                //.range(["#49d9eb", "#00a5b6", "#A8DADC" , "#457B9D", "#1D3557", "#E63946", "#F1FAEE"]);
                //.range(["#227c9d", "#17c3b2", "#84A98C" , "#52796F", "#354F52", "#E63946", "#CAD2C5"]);
                //.range(["#227c9d", "#17c3b2", "#A5C7AD" , "#83A8A0", "#748D8F", "#E63946", "#CAD2C5"]);
                //.range(["#063E54", "#079E8C", "#daffef", "#c0fdfb", "#64b6ac", "#5d737e", "#fcfffd"]);
                //.range(["#063E54", "#079E8C", "#daffef", "#c0fdfb", "#64b6ac", "#5d737e", "#fcfffd"]);
                //.range(["#063E54", "#079E8C", "#c0fdfb", "#64b6ac", "#5d737e", "#EF6B71", "#fcfffd"]);
                //.range(["#063E54", "#079E8C", "#02c39a", "#028090","#05668d", "#EF6B71", "#fcfffd"]);
                //.range(["#063E54", "#079E8C", "#DBE6DE", "#B7C5C2","#8EA1A2", "#E63946", "#F3F3F3"]);
                //.range(["#247C9E", "#079E8C", "#DBE6DE", "#B7C5C2","#8EA1A2", "#E63946", "#F3F3F3"]);
                //.range(["#247C9E", "#079E8C", "#fee89a", "#fdbf70","#f78851", "#e35449", "#f7faaf"]);
                //.range(["#a2b5af", "#5d737e", "#ffbaba", "#ff7b7b","	#ff0000", "#a70000", "#F3F3F3"]);

                
                 

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
       //root.sum(d => { return !d.children || d.children.length === 0 ? d.size :0; })
      .sort(function(a,b){
        if(a.data['size'] < b.data['size']) return -1;
        //if(a.data['size'] > b.data['size']) return 1;
        return 0;
      }).descendants();

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
    
      /*var div = d3.select('#'+this.chartID)
        .append("div") 
        .attr("class", "d3-tip n");*/

    var path = svg.append("g").selectAll('g')
        .data(partition(root).descendants())
        .enter().append("g")
        .on('click', d => {
          const data = {
            data : d,
            type : 'donut'
          }
          self.chartDetails.emit(data);
          //this.focusOn(d);
      });
        /*.on("mousemove",function(d){
          var mouseVal = d3.mouse(this);
          div.style("display","none");
          div
          .html("name:"+d.data['name']+"</br>"+"size:"+d.data['size'])
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
      .style("fill", <any>function(d) { return color(d.data['name']);
    })

    path.append("title")
      .text(
        function (d) {
          if(d.data['name'] == "Sunburst") {
           // return `${self.chartSetting.avgRiskLevel} \r\n ${self.chartSetting.avgRisk}`;
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
      .attr("class",<any>function(d) {
        if(d.data['name'] == "Sunburst") {
          return `risk-score`;
        } else {
          return `partition-name`;
        }
      })
      .attr("x", function (d) {
          return arc.centroid(<any>d)[0]-20;
      })
      .attr("y", function (d) {
          return arc.centroid(<any>d)[1];
      })
      .text(function (d) {
          if(d.data['name'] == "Sunburst") {
            //return `${self.chartSetting.avgRisk}`;
            //return `${self.chartSetting.avgRiskLevel} \r\n ${self.chartSetting.avgRisk}`;
          } else {
            return `${(d.data['name'] !== undefined) ? d.data['name'] : 'NA'}`;
          }
      })
      path.append("text")
      .attr("title", function(d) {
        return `${(d.data['name'] !== undefined) ? d.data['name'] : 'NA'}`;
      })
      .attr("style", "font-size:10px")
      .attr("class",<any>function(d) {
        if(d.data['name'] == "Sunburst") {
          return `risk-level`;
        } else {
          return `partition-label`;
        }
        
      })
      .attr("x", function (d) {
          return arc.centroid(<any>d)[0]-20;
      })
      .attr("y", function (d) {
          return arc.centroid(<any>d)[1]+15;
      })
      .text(function (d) {
        if(d.data['name'] == "Sunburst") {
          return `${self.chartSetting.avgRiskLevel} Risk`;
        } else {
          return `(${(d.data['count'] !== undefined) ? Math.ceil((d.data['count']/self.chartData['count'])*100) : ''}%)`;
        }
    });
    setTimeout(()=> {
      $("text[title='Sunburst']").css({"font-size": "16px !important"});
    }, 1000)
  }
  
}
