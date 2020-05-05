import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllApiReportComponent } from './all-api-report.component';

describe('AllApiReportComponent', () => {
  let component: AllApiReportComponent;
  let fixture: ComponentFixture<AllApiReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllApiReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllApiReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
