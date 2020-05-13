import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporttableComponent } from './report-table.component';

describe('SunburstComponent', () => {
  let component: ReporttableComponent;
  let fixture: ComponentFixture<ReporttableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporttableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
