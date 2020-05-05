import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBubbleChartComponent } from './new-bubble-chart.component';

describe('NewBubbleChartComponent', () => {
  let component: NewBubbleChartComponent;
  let fixture: ComponentFixture<NewBubbleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBubbleChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBubbleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
