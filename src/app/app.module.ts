import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
//import * as Chart from 'chart.js';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { ApiRiskReportDataService } from '././shared/api-risk-report-data.service';
import { NewDataService } from '././shared/new-data-service.service';

import { ApiAppNavComponent } from './api-app-nav/api-app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AllMatComponentsModule } from './all-mat-components.module';
import { ApiAppDashboardComponent } from './api-app-dashboard/api-app-dashboard.component';

import { from } from 'rxjs';
import { ApiRiskReportJsonComponent } from './api-app-dashboard/charts/api-risk-report-json/api-risk-report-json.component';
import { ApiRiskReportWithServiceComponent } from './api-app-dashboard/charts/api-risk-report-with-service/api-risk-report-with-service.component';
// import { BubbleReportComponent } from './api-app-dashboard/charts/bubble-report/bubble-report.component';
import { NewBubbleChartComponent } from './api-app-dashboard/charts/new-bubble-chart/new-bubble-chart.component';
import { AllApiReportComponent } from './api-app-dashboard/charts/all-api-report/all-api-report.component';
import { PendingApiComponent } from './api-app-dashboard/charts/pending-api/pending-api.component';
import { NewDashboardComponent } from './new-dashboard/new-dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { ApiOverviewComponent } from './new-charts/api-overview/api-overview.component';
import { ApiSecurityRiskComponent } from './new-charts/api-security-risk/api-security-risk.component';
import { ApiCountersComponent } from './new-charts/api-counters/api-counters.component';
import { TableMapComponent } from './new-charts/table-map/table-map.component';
import { MapDataTableComponent } from './new-charts/map-data-table/map-data-table.component';
import { D3DashboardComponent } from './d3-dashboard/d3-dashboard.component';
import { OverviewComponent } from './d3-charts/overview/overview.component';
import { SunburstComponent } from './d3-charts/sunburst/sunburst.component';
import { ApiSecurityComponent } from './new-charts/api-security/api-security.component';


@NgModule({
  declarations: [
    AppComponent,
    ApiAppNavComponent,
    ApiAppDashboardComponent,
    ApiRiskReportJsonComponent,
    ApiRiskReportWithServiceComponent,
    // BubbleReportComponent,
    NewBubbleChartComponent,
    AllApiReportComponent,
    PendingApiComponent,
    NewDashboardComponent,
    ApiOverviewComponent,
    ApiSecurityRiskComponent,
    ApiCountersComponent,
    TableMapComponent,
    MapDataTableComponent,
    D3DashboardComponent,
    OverviewComponent,
    SunburstComponent,
    ApiSecurityComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    LayoutModule,
    AllMatComponentsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [ApiRiskReportDataService, NewDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
