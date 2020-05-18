import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NewDataService } from '../../shared/new-data-service.service';
import { ChartType, MultiDataSet, Label} from 'chart.js';
import * as d3 from 'd3';
import { Observable } from 'rxjs';
// npm install chart.piecelabel.js --save
@Component({
  selector: 'app-sunburst',
  templateUrl: './sunburst.component.html',
  styleUrls: ['./sunburst.component.css']
})

export class SunburstComponent implements OnInit {
 @Input() chartData;
 @Input() chartID;
 @Input() chartSetting;
 @Output() chartDetails = new EventEmitter();
 constructor(private _getReport: NewDataService) { }
  
ngOnInit() {  
  var self = this;
  const format = d3.format(",d");
  const width = 330;
  const radius = width / 6;

  const arc = d3.arc()
          .startAngle(d => d['x0'])
          .endAngle(d => d['x1'])
          .padAngle(d => Math.min((d['x1'] - d['x0']) / 2, 0.005))
          .padRadius(radius * 1.5)
          .innerRadius(d => d['y0'] * radius)
          .outerRadius(d => Math.max(d['y0'] * radius, d['y1'] * radius - 1));

  const partition = data => {
      const root = d3.hierarchy(data)
              .sum(d => d.size)
              .sort((a, b) => b.value - a.value);
      return d3.partition()
              .size([2 * Math.PI, root.height + 1])
              (root);
  }

    const root = partition(this.chartData);
    //const color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, (this.chartData.children.length + 1)));
    var arrRisksColor = ['External', 'Internal', 'Low Risk', 'Medium Risk','High Risk', 'Critical Risk', 'Met'];
    var color = d3.scaleOrdinal()
    .domain(arrRisksColor)
    .range(["#49d9eb", "#00a5b6", "#95d7ff" , "#7bbfff", "#016da9", "#ef6b71", "#dedede"]); 

    root.each(d => d['current'] = d);

    const svg = d3.select('#partitionSVG')
            .style("width", "100%")
            .style("height", "auto")
            .style("font", "10px sans-serif");

    const g = svg.append("g")
            .attr("transform", `translate(${width / 2},${width / 2})`);

    const path = g.append("g")
            .selectAll("path")
            .data(root.descendants().slice(1))
            .join("path")
            .attr("fill", d => {
              //console.log(d);
                //while (d.depth > 1)
                  //  d = d.parent;
                    //console.log((d.data['name']));
                return <any>color(d.data['name']);
            }).on('click', d => {
              const data = {
                data : d,
                type : 'donut'
              }
              self.chartDetails.emit(data);
          })
            //.attr("fill-opacity", d => arcVisible(d['current']) ? (d.children ? 0.6 : 0.4) : 0)
          .attr("d", d => arc(d['current']));

    path.filter(d => <any>d.children)
            .style("cursor", "pointer")
            //.on("click", clicked);

    path.append("title")
            .text(d => `${d.ancestors().map(d => (d.data['name'] !== 'Sunburst') ? d.data['name'] : "").reverse().join("\r\n")}\n\r${format(d.value)}`);

    const label = g.append("g")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .style("user-select", "none")
            .selectAll("text")
            .data(root.descendants().slice(1))
            .join("text")
            .attr("dy", "0.35em")
            .attr("fill-opacity", d => +labelVisible(d['current']))
            .attr("transform", d => labelTransform(d['current']))
            .text(d => `${d.data['name']}(${(d.data['count'] !== undefined) ? Math.ceil((d.data['count']/self.chartData['count'])*100) : ''}%)`)
           

    const parent = g.append("circle")
            .datum(root)
            .attr("r", radius)
            .attr("fill", "none")
            .attr("text-anchor", "middle")
            .attr("pointer-events", "all")

            g.append("text")
            .attr("style",'color:#000')
            .attr('class', 'risk-level-sun')
            .text(d => `${self.chartSetting.avgRiskLevel} Risk`);

            g.append("text")
            .attr('class', 'risk-score-sun')
            .attr("style",'color:#000')
            .text(d => `${self.chartSetting.avgRisk}`);
            //.on("click", clicked);

    function clicked(p) {
        parent.datum(p.parent || root);

        root.each(d => d['target'] = {
                x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                y0: Math.max(0, d.y0 - p.depth),
                y1: Math.max(0, d.y1 - p.depth)
            });

        const t = g.transition().duration(750);

        // Transition the data on all arcs, even the ones that aren’t visible,
        // so that if this transition is interrupted, entering arcs will start
        // the next transition from the desired position.
        path.transition(t)
                .tween("data", d => {
                    const i = d3.interpolate(d['current'], d['target']);
                    return t => d['current'] = i(t);
                })
                .filter(<any>function (d) {
                    return +this.getAttribute("fill-opacity") || arcVisible(d.target);
                })
                .attr("fill-opacity", d => arcVisible(d['target']) ? (d.children ? 0.6 : 0.4) : 0)
                .attrTween("d", d => () => arc(d['current']));

        label.filter(<any>function (d) {
            return +this.getAttribute("fill-opacity") || labelVisible(d.target);
        }).transition(t)
                .attr("fill-opacity", d => +labelVisible(d['target']))
                .attrTween("transform", d => () => labelTransform(d['current']));
    }

    function arcVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }

    function labelTransform(d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2 * radius;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }
  }
  
}
