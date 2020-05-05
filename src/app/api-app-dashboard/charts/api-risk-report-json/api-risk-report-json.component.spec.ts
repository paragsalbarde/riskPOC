import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRiskReportJsonComponent } from './api-risk-report-json.component';

describe('ApiRiskReportJsonComponent', () => {
  let component: ApiRiskReportJsonComponent;
  let fixture: ComponentFixture<ApiRiskReportJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiRiskReportJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRiskReportJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
