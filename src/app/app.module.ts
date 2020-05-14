//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { AllMatComponentsModule } from './all-mat-components.module';
import { MatGridListModule, MatFormFieldModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
//Services
import { ApiRiskReportDataService } from './shared/api-risk-report-data.service';
import { NewDataService } from './shared/new-data-service.service';
import { ReportService } from './shared/services/report.service';
//Components
import { AppComponent } from './app.component';
import { ApiAppNavComponent } from './components/api-app-nav/api-app-nav.component';
import { ApiCountersComponent } from './components/api-counters/api-counters.component';
import { TableMapComponent } from './components/table/table-map/table-map.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DonutchartComponent } from './d3-charts/donutchart/donutchart.component';
import { HbarchartComponent } from './d3-charts/hbarchart/hbarchart.component';
import { BarchartComponent } from './d3-charts/barchart/barchart.component';
import { PiechartComponent } from './d3-charts/piechart/piechart.component';
import { ReporttableComponent } from './components/table/report-table/report-table.component';
import { ApiDetailsComponent } from './modal/api-details/api-details.component';
import { HorizontalBarchartComponent } from './d3-charts/horizontal-barchart/horizontal-barchart.component';

@NgModule({
  declarations: [
    AppComponent,
    ApiAppNavComponent,
    ApiCountersComponent,
    TableMapComponent,
    DonutchartComponent,
    DashboardComponent,
    PiechartComponent,
    BarchartComponent,
    ReporttableComponent,
    ApiDetailsComponent,
    HbarchartComponent,
    HorizontalBarchartComponent
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
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  providers: [ApiRiskReportDataService, NewDataService, ReportService],
  bootstrap: [AppComponent],
  entryComponents: [ApiDetailsComponent]
})
export class AppModule { }
