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
    console.log(this.chartData);
    var width = 700;
    var height = 700;
    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    console.log(radius);
    /*var color = d3.scaleLinear()
    .domain([10, 100])
    .range(["brown", "steelblue"])
    .interpolate(d3.interpolateCubehelix.gamma(3));

    var color =  d3.scaleQuantize()
    .domain([10,100])
    .range(["brown", "steelblue"]);
    console.log(color)*/

   // let color = [ "#95b53c","#f7464a", "#95b53c", '#f7464a', '#95b53c', '#f7464a',
                                 // "#95b53c","#f7464a", "#95b53c", '#f7464a', '#95b53c', '#f7464a']

    color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, this.chartData.children.length + 1))

    var svg = d3.select('#container')
                            .append('svg')
                              .attr('width', width)
                          .attr('height', height)
                            .append('g')
                              .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')');;
    
    var partition = d3.partition()
        .size([360, radius])
        .padding(0)
        .round(true);

            /*var partition = d3.layout.partition()
    .value(function (d) {
    return d.size;
});*/
    
    var root = d3.hierarchy(this.chartData, function(d) { return d.children })
        .sum( function(d) { 			
                    if(d.children) {
                        return 0
                    } else {
                        return 1
                    }
            })
            //.sort(null);
    console.log(root)
    partition(root)


   

    var x = d3.scaleLinear()
    .range([0, 2 * Math.PI]);
    //console.log( x);

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
    
        /* var arc = d3.arc()
      .startAngle(function (d) {
        console.log(d)
      return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
  })
      .endAngle(function (d) {
      return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
  })
      .innerRadius(function (d) {
      return Math.max(0, y(d.y));
  })
      .outerRadius(function (d) {
      return Math.max(0, y(d.y + d.dy));
  });*/
  var div = d3.select("#container")
  .append("div") 
  .attr("class", "d3-tip n");

    var path1 = svg.selectAll('g')
        .data(root.descendants())
        .enter().append("g")
        .on("mousemove",function(d){
          var mouseVal = d3.mouse(this);
          div.style("display","none");
          div
          .html("name:"+d.data.name+"</br>"+"size:"+d.data.size)
          .style("left", (d3.event.pageX-220) + "px")
          .style("top", (d3.event.pageY+120) + "px")
          .style("opacity", 1)
          .style("position", 'absolute')
          .style("display","block");
      })
        
        path1.append('path')
            .attr("display", function(d) { return d.depth ? null : "none"; })
            .attr("d", arc)
            .attr("fill-rule", "evenodd")
            .style('stroke', '#fff')
            .style("fill", function(d) { return color((d.children ? d : d.parent).data.name); })
  
          

        var text = path1.append("text")
        .attr("fill", "white")
       
        .attr("title", function(d) {
          return `${d.data.name}`;
        })
        .attr("style", "font-size:12px")
        /*.attr("transform", function (d) {
          console.log(arc.centroid(d))
          return "translate(" + arc.centroid(d) + ")";
      })*/
    
      
       .attr("x", function (d) {
             // console.log(d);
              return arc.centroid(d)[0]-30;
            //return y(d.y);
        })
        .attr("y", function (d) {
          // console.log(d);
           return arc.centroid(d)[1];
         //return y(d.y);
     })
          /*  .attr("dx", "6") // margin
        .attr("dy", ".35em") // vertical-align*/
        .text(function (d) {
          //console.log(d);
            return `${d.data.name}\n\r(${(d.data.size) ? d.data.size : ''})`;
            //return `${d.data.name}`;
        });
       

          function computeTextRotation(d) {
            //console.log(d);
           //var angle = x(d.x0 + d.x1 / 2) - Math.PI / 2;
           var angle = x(d.x + d.dx / 2) - Math.PI / 2;
            return angle / Math.PI * 180;
        }
        text.attr("transform", function (d) {
          //return "rotate(" + computeTextRotation(d) + ")";
          //return "rotate(25)";
      });
  }
 tooltipFunc(branch) {
    return branch.name;
  }
  computeTextRotation(d) {
    //var angle = x(d.x + d.dx / 2) - Math.PI / 2;
    //return angle / Math.PI * 180;
  }
}
