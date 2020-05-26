import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitFilterComponent } from './unit-filter.component';

describe('ApiCountersComponent', () => {
  let component: UnitFilterComponent;
  let fixture: ComponentFixture<UnitFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
