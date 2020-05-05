import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingApiComponent } from './pending-api.component';

describe('PendingApiComponent', () => {
  let component: PendingApiComponent;
  let fixture: ComponentFixture<PendingApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
