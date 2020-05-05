import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRiskReportWithServiceComponent } from './api-risk-report-with-service.component';

describe('ApiRiskReportWithServiceComponent', () => {
  let component: ApiRiskReportWithServiceComponent;
  let fixture: ComponentFixture<ApiRiskReportWithServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiRiskReportWithServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRiskReportWithServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
