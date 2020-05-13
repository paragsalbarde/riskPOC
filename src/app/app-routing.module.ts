import { NgModule, Component } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//import { ApiAppDashboardComponent } from './api-app-dashboard/api-app-dashboard.component';
//import { ApiRiskReportJsonComponent } from './api-app-dashboard/charts/api-risk-report-json/api-risk-report-json.component';
//import { ApiRiskReportWithServiceComponent } from './api-app-dashboard/charts/api-risk-report-with-service/api-risk-report-with-service.component';
//import { BubbleReportComponent } from './api-app-dashboard/charts/bubble-report/bubble-report.component';
//import { NewBubbleChartComponent } from './api-app-dashboard/charts/new-bubble-chart/new-bubble-chart.component';
//import { PendingApiComponent } from './api-app-dashboard/charts/pending-api/pending-api.component'
//START: New Dashboard
//import { NewDashboardComponent } from './new-dashboard/new-dashboard.component';
//import { D3DashboardComponent } from './d3-dashboard/d3-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  //{ path: 'old-dashboard', component: ApiAppDashboardComponent},
  //{ path: 'new-dashboard', component: NewDashboardComponent},
  //{ path: 'd3-dashboard', component: D3DashboardComponent},
  { path: 'dashboard', component: DashboardComponent},
  
  
  //{ path: 'api-risk-report-json', component: ApiRiskReportJsonComponent },
  //{ path: 'chart-with-service', component: ApiRiskReportWithServiceComponent },
  //{ path: 'bubble-report', component: BubbleReportComponent },
  //{ path: 'new-bubble-chart', component: NewBubbleChartComponent },
  //{ path: 'pending-api-chart', component: PendingApiComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]  
})
export class AppRoutingModule { }
