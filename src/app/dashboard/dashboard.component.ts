import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { NewDataService } from '../shared/new-data-service.service'
import { ApiRiskReportDataService } from './../shared/api-risk-report-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  public showApiSummary = [];
  public root:any = [];
  

  constructor(private _riskReport:ApiRiskReportDataService) {}
  groupBy(data, column) {
    let groupData = data.reduce((r, a) => {
      r[a[column]] = [...r[a[column]] || [], a];
      return r;
     }, {});
     return groupData;
  }
  ngOnInit() {
    this._riskReport.riskReport().subscribe(riskData => {
      //console.log(riskData['list']);

     let riskGroup = this.groupBy(riskData['list'], 'apiType');
       //console.log("group", riskGroup);
       let chartData = {};
       chartData['name'] = 'API risk';
       chartData['children'] = Object.keys(riskGroup).map((column) => {
        //console.log(riskGroup[column])
       // riskGroup[column].map((data) => {
          //  console.log(data);
            let  groupCritical = this.groupBy(riskGroup[column], 'apiRiskClassification');
            //console.log(groupCritical);
            let chartChildData = [];
            chartChildData['children'] = Object.keys(groupCritical).map((column1) => {

              let  groupBreach = this.groupBy(groupCritical[column1], 'penTestSlaBreach');

              let chart2ChildData = [];
              chart2ChildData['children'] = Object.keys(groupBreach).map((column2) => {
                return {
                  name : ( column2 !== undefined && column2 !== "" ) ? column2 : "NA",
                  size : groupBreach[column2].length
                }
              });

              console.log(groupBreach)
              return {
                name : ( column1!== undefined ) ? column1 : "NA",
                size : groupCritical[column1].length,
                children : chart2ChildData['children']
              }
            })
       // })
          return {
            name : ( column!== undefined ) ? column : "NA",
            size : riskGroup[column].length,
            children : chartChildData['children']
          }
       });
       console.log(chartData)
this.root = chartData;

      let apiNames = riskData['list'].map(i => i.apiName)
      let apiScores = riskData['list'].map(i => i.riskScore)
      let internalApiCount = riskData['list'].filter(i => i.apiType === 'Internal')
        .map(i => i.riskScore)
        .reduce((a, b) => a + b);
      let externalApiCount = riskData['list'].filter(i => i.apiType === 'External')
        .map(i => i.riskScore)
        .reduce((a, b) => a + b);
      let internalRiskCount = riskData['list'].filter(i => i.apiType === 'Internal')
        .map(i => i.apiName).length;
      let internalHighRisk = riskData['list'].filter(i => i.apiType === 'Internal' && i.apiRiskClassification === 'High')
        .map(i => i.apiName).length;
      let internalLowRisk = riskData['list'].filter(i => i.apiType === 'Internal' && i.apiRiskClassification === 'Low')
        .map(i => i.apiName).length;
      let internalMediumRisk = riskData['list'].filter(i => i.apiType === 'Internal' && i.apiRiskClassification === 'Medium')
        .map(i => i.apiName).length;
      let internalCriticalRisk = riskData['list'].filter(i => i.apiType === 'Internal' && i.apiRiskClassification === 'Critical')
        .map(i => i.apiName).length;

      let externalRiskCount = riskData['list'].filter(i => i.apiType === 'External')
        .map(i => i.apiName).length;
      let externalHighRisk = riskData['list'].filter(i => i.apiType === 'External' && i.apiRiskClassification === 'High')
        .map(i => i.apiName).length;
      let externalLowRisk = riskData['list'].filter(i => i.apiType === 'External' && i.apiRiskClassification === 'Low')
        .map(i => i.apiName).length;
      let externalMediumRisk = riskData['list'].filter(i => i.apiType === 'External' && i.apiRiskClassification === 'Medium')
        .map(i => i.apiName).length;
      let externalCriticalRisk = riskData['list'].filter(i => i.apiType === 'External' && i.apiRiskClassification === 'Critical')
        .map(i => i.apiName).length;
      let maxCount = riskData['list'].length;

      let apiName = riskData['list'].map(res => res.apiName)
      let apiType = riskData['list'].map(res => res.apiType)
      let riskScore = riskData['list'].map(res => res.riskScore)
      let apiRiskClassification = riskData['list'].map(res => res.apiRiskClassification)
      //let veracodeStatus = res['list'].map(res => res.veracodeStatus)
      //let penTestSlaBreach = res['list'].map(res => res.penTestSlaBreach)
      //let veracodeSlaBreach = res['list'].map(res => res.veracodeSlaBreach)
      //let veracodeDate = res['list'].map(res => res.veracodeDate)
      //let ramlReviewDate = res['list'].map(res => res.ramlReviewDate)
      //let penTestDate = res['list'].map(res => res.penTestDate)
      //console.log(apiNames);
      let uniqueApiType = Array.from(new Set(apiType))
      let apiTypeColor = riskData['list'].map(i => i.apiType === "Internal" ? i.color = "#31dc26cc" : 
                                               i.apiRiskClassification = '#0074a6aa')

      
      
      
    })

    
    let pp = {
      "name": "Mobile Strategy",
          "children": [{
          "name": "Differentiator",
              "children": [{
                  "name": "Market",
                  "size": 75,
                  "children": [{"name": "MDM","size": 15}, {
                      "name": "BOK",
                      "size": 50
                  }, {
                      "name": "UX",
                      "size": 10
                  }]
              }, {
                  "name": "Architecture",
                  "size": 70,
                  "children": [{
                      "name": "CCD",
                      "size": 15
                  }, {
                      "name": "RWD",
                      "size": 10
                  }, {
                      "name": "HTML5",
                      "size": 15
                  }]
              }]
          }, {
          "name": "Archi",
              "children": [{
              "name": "Native",
                  "size": 60,
                  "children": [{
                      "name": "iOS",
                          "size": 10
                  }, {
                      "name": "Android",
                          "size": 5
                  }, {
                      "name": "Blackberry",
                          "size": 5
                  }]
          }, {
              "name": "Hybrid",
                  "size": 20,
                  "children": [{
                      "name": "MEAP",
                          "size": 5
                  }, {
                      "name": "PhoneGap",
                          "size": 10
                  }, {
                      "name": "HTML5",
                          "size": 5,
                          
                  }]
          }]
      }]
  };

   var k = {
    "name": "flare",
    "children": [
     {
      "name": "analytics",
      "children": [
       {
        "name": "cluster",
        "children": [
         {"name": "AgglomerativeCluster", "size": 3938},
         {"name": "CommunityStructure", "size": 3812},
         {"name": "HierarchicalCluster", "size": 6714},
         {"name": "MergeEdge", "size": 743}
        ]
       },
       {
        "name": "graph",
        "children": [
         {"name": "BetweennessCentrality", "size": 3534},
         {"name": "LinkDistance", "size": 5731},
         {"name": "MaxFlowMinCut", "size": 7840},
         {"name": "ShortestPaths", "size": 5914},
         {"name": "SpanningTree", "size": 3416}
        ]
       },
       {
        "name": "optimization",
        "children": [
         {"name": "AspectRatioBanker", "size": 7074}
        ]
       }
      ]
     },
     
     
     
     {
      "name": "flex",
      "children": [
       {"name": "FlareVis", "size": 4116}
      ]
     },
     
    
     
     
     
    ]
   }
    
  }
}
