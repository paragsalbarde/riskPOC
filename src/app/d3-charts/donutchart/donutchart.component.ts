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
  @Input() chartData;
  public chart:any;
  constructor(private _getReport: NewDataService ) { }

  ngOnInit() {
    var self = this;
    console.log(this.chartData);
    var width = 300;
    var height = 300;
    var radius = Math.min(width, height) / 2;
    //var color = d3.scaleOrdinal(d3.schemeCategory10);

     /*var color = d3.scaleLinear()
    .domain([10, 100])
    .range(["brown", "steelblue"])
    .interpolate(d3.interpolateCubehelix.gamma(3));

    var color =  d3.scaleQuantize()
    .domain([10,100])
    interpolator(d3.interpolateViridis);
    console.log(color)*/
  //let color =   d3.scaleOrdinal().domain(this.chartData)
  //.range(["gold", "blue", "green", "yellow", "black", "grey", "darkgreen", "pink", "brown", "slateblue", "grey1", "orange"])
  /*var color = d3.scaleQuantize()
    .domain([10,100])
    .range(["#5E4FA2", "#3288BD", "#66C2A5", "#ABDDA4", "#E6F598", 
    "#FFFFBF", "#FEE08B", "#FDAE61", "#F46D43", "#D53E4F", "#9E0142"]);*/
var arrRisksColor = ['External', 'Internal', 'Low', 'Medium','High', 'Critical'];
    var color = d3.scaleOrdinal()
  .domain(arrRisksColor)
  //.range(["#016da9", "#62a8e9", "#EC8C90" , "#EA5C62", "#DC2E36", "#F70814"]);
  .range(["#49d9eb", "#00a5b6", "#95d7ff" , "#7bbfff", "#016da9", "#62a8e9"]);
//console.log(color('External'));
//console.log(color('Internal'));
//console.log(color('High'));
//console.log(color('Low'));

    var svg = d3.select('#container')
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')');
    
    var partition = d3.partition()
        .size([360, radius])
        .padding(0)
        .round(true);

    /*var partition = d3.layout.partition()
        .value(function (d) {
        return d.size;
    });*/
  //return !d.children || d.children.length === 0 ? d.size :0; }
  let root = d3.hierarchy(this.chartData);
      root.sum(d => d.size)
      .sort(function(a,b){
        console.log(a);
        //return a.data['name'].toLowerCase().localeCompare(b.data['name'].toLowerCase());
        if(a.data['size'] < b.data['size']) return -1;
        if(a.data['size'] > b.data['size']) return 1;
        return 0;
      });;
     //root.sum(d => { return !d.children || d.children.length === 0 ? d.size :0; });
     
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
    
  /*var div = d3.select("#container")
  .append("div") 
  .attr("class", "d3-tip n");*/
  //var partition = d3.partition();
    var path1 = svg.append("g").selectAll('g')
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
        
        path1.append('path')
            .attr("display", function(d) { return d.depth ? null : "none"; })
            .attr("d", <any>arc)
            .attr("fill-rule", "evenodd")
            .style('stroke', '#fff')
            .style("fill", <any>function(d) {return color(d.data['name']); })
  
        path1.append("title")
            .text(d => {return `${(d.data['name'] !== undefined) ? d.data['name'] : 'NA'}\n\r(${(d.data['size'] !== undefined) ? Math.ceil((d.data['size']/self.chartData['size'])*100) : ''}%)`})

        var text = path1.append("text")
        .attr("transform", <any>function (d) {
          // console.log(arc.centroid(d))
           
           const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
           const y = (d.y0 + d.y1) / 2 * radius;
           //return `rotate(${x - 90}) translate(${arc.centroid(d)}) rotate(${x < 180 ? 0 : 180})`;
           //return "translate(" + arc.centroid(d) + ")";
           //console.log(x)
           //console.log(`rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`)
           return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
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
            return `${(d.data['name'] !== undefined) ? d.data['name'] : 'NA'}\n\r(${(d.data['size'] !== undefined) ? Math.ceil((d.data['size']/self.chartData['size'])*100) : ''}%)`;
        });
       
        var partition = d3.partition();

       /* const label = svg.append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
        .selectAll("text")
        .data(partition(root).descendants())
        .join("text")
        .attr("dy", "0.35em")
        .attr("fill-opacity", d => +labelVisible(d))
        .attr("transform", d => labelTransform(d))
        .text(d => (d.data['name'] !== undefined) ? d.data['name'] : 'NA');*/

        //const t = svg.transition().duration(750);
    /*    path1.transition(t)
        .tween("data", d => {
          const i = d3.interpolate(d.current, d.target);
          return t => d.current = i(t);
        })
      .filter(function(d) {
        return +this.getAttribute("fill-opacity") || arcVisible(d.target);
      })
        .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
        .attrTween("d", d => () => arc(d.current));
        
    label.filter(function(d) {
        return +this.getAttribute("fill-opacity") || labelVisible(d);
      }).transition(t)
        .attr("fill-opacity", d => +labelVisible(d.target))
        .attrTween("transform", d => () => labelTransform(d.current));*/
  

          function computeTextRotation(d) {
            //console.log(d);
           //var angle = x(d.x0 + d.x1 / 2) - Math.PI / 2;
           var angle = x(d.x + d.dx / 2) - Math.PI / 2;
            return angle / Math.PI * 180;
        }

        function arcVisible(d) {
          return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
        }
      
        function labelTransform(d) {
          
          const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
          const y = (d.y0 + d.y1) / 2 * radius;
          //console.log(x)
          //console.log(`rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`)
          return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        }

        function labelVisible(d) {
          return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
        }

        text.attr("transform", <any>function (d) {
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
