import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';
//import * as d3 from 'd3-selection';
import * as d3 from 'd3';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  @Input() chartData;
  @Input() chartID;
  public chart:any;
  constructor(private _getReport: NewDataService ) { }

  ngOnInit() {
    let totalCount = 24;
  
    var self = this;
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select("#"+this.chartID)
        .append("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(["#95d7ff" , "#7bbfff", "#016da9", "#62a8e9","#49d9eb", "#00a5b6"]);

    const pie = d3.pie()
        .value(d => d['count'])
        .sort(null);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

      d3.selectAll("input")
      const path = svg.append("g").selectAll("path")
          .data(pie(this.chartData['data'])).enter().append("g");

      // Update existing arcs
      path.transition().duration(200).attrTween("d", arcTween);

      // Enter new arcs
      path.append("path")
          .attr("fill", (d, i) => color(<any>i))
          .attr("d", <any>arc)
          .attr("stroke", "white")
          .attr("stroke-width", "6px")
          //.each(function(d) { this._current = d; });

      var text = path.append("text")
  
      .attr("fill", "black")
      .attr("style", "font-size:11px") 
      .attr("x", function (d) {
          return arc.centroid(<any>d)[0]-20;
      })
      .attr("y", function (d) {
          return arc.centroid(<any>d)[1];
      })
      .text(function (d) {
          return `${(d.data['name'] !== undefined) ? d.data['name'] : 'NA'}\n\r(${(d.data['count'] !== undefined) ? Math.ceil((d.data['count']/self.chartData['count'])*100) : ''}%)`;
      });
    function arcTween(a) {
        const i = d3.interpolate(this._current, a);
        this._current = i(1);
        return (t) => arc(i(t));
    }
  }
}
