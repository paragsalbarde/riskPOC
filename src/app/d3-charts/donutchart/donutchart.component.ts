import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';
//import * as d3 from 'd3-selection';
import * as d3 from 'd3';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-donutchart',
  templateUrl: './donutchart.component.html',
  styleUrls: ['./donutchart.component.css']
})
export class DonutchartComponent implements OnInit {
  @Input() root3;
  public chart:any;
  constructor(private _getReport: NewDataService ) { }

  ngOnInit() {
    console.log(this.root3);
    var width = 600;
    var height = 600;
    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    
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
    
    var root = d3.hierarchy(this.root3, function(d) { return d.children })
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

    var path1 = svg.selectAll('g')
        .data(root.descendants())
        .enter().append("g")
        
        path1.append('path')
            .attr("display", function(d) { return d.depth ? null : "none"; })
            .attr("d", arc)
            .attr("fill-rule", "evenodd")
            .style('stroke', '#fff')
            .style("fill", function(d) { return color((d.children ? d : d.parent).data.name); })
  
        var text = path1.append("text")
        .attr("fill", "white")
        .attr("transform", function (d) {
          return "translate(" + arc.centroid(d) + ")";
      })
      
      /*  .attr("x", function (d) {
             // console.log(d);
              return d.y1;
            //return y(d.y);
        })*/
          /*  .attr("dx", "6") // margin
        .attr("dy", ".35em") // vertical-align*/
        .text(function (d) {
          //console.log(d);
            return d.data.name;
        });
       

          function computeTextRotation(d) {
            //console.log(d);
           var angle = x(d.x0 + d.x1 / 2) - Math.PI / 2;
           //var angle = x(d.x + d.dx / 2) - Math.PI / 2;
            return angle / Math.PI * 180;
        }
        /*text.attr("transform", function (d) {
          //return "rotate(" + computeTextRotation(d) + ")";
          return "rotate(230)";
      });*/
  }
 tooltipFunc(branch) {
    return branch.name;
  }
  computeTextRotation(d) {
    //var angle = x(d.x + d.dx / 2) - Math.PI / 2;
    //return angle / Math.PI * 180;
  }
}
