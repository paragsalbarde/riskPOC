import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCountersComponent } from './api-counters.component';

describe('ApiCountersComponent', () => {
  let component: ApiCountersComponent;
  let fixture: ComponentFixture<ApiCountersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiCountersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCountersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
