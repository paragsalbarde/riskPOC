//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { LayoutModule } from '@angular/cdk/layout';
import { AllMatComponentsModule } from './all-mat-components.module';
import { MatGridListModule, 
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        //MatSelectBase,
        //MatSelect,
        MatSortModule, 
        MatTab,
        MatTabsModule} from '@angular/material';
//Services
import { ApiRiskReportDataService } from './shared/api-risk-report-data.service';
import { NewDataService } from './shared/new-data-service.service';
import { ReportService } from './shared/services/report.service';
import { CommonService } from './shared/services/common.service';
//Components
import { AppComponent } from './app.component';
import { ApiAppNavComponent } from './components/api-app-nav/api-app-nav.component';
import { ApiCountersComponent } from './components/api-counters/api-counters.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';
import { ApiDetailsComponent } from './modal/api-details/api-details.component';
import { UnitFilterComponent } from './components/unit-filter/unit-filter.component';
//Charts
import { HorizontalBarchartComponent } from './d3-charts/horizontal-barchart/horizontal-barchart.component';
import { SunburstComponent } from './d3-charts/sunburst/sunburst.component';
import { DonutchartComponent } from './d3-charts/donutchart/donutchart.component';
import { HbarchartComponent } from './d3-charts/hbarchart/hbarchart.component';
import { BarchartComponent } from './d3-charts/barchart/barchart.component';
import { PiechartComponent } from './d3-charts/piechart/piechart.component';
//Tables
import { MaterialTableComponent } from './components/table/material-table/material-table.component';
import { TableMapComponent } from './components/table/table-map/table-map.component';
import { ReporttableComponent } from './components/table/report-table/report-table.component';

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
    HorizontalBarchartComponent,
    SunburstComponent,
    UnitFilterComponent,
    ReportDashboardComponent,
    MaterialTableComponent
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
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule
    //MatSelectBase,
    //MatSelect
  ],
  providers: [ApiRiskReportDataService, NewDataService, ReportService, CommonService],
  bootstrap: [AppComponent],
  entryComponents: [ApiDetailsComponent]
})
export class AppModule { }
