
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3DashboardComponent } from './d3-dashboard.component';

describe('D3DashboardComponent', () => {
  let component: D3DashboardComponent;
  let fixture: ComponentFixture<D3DashboardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ D3DashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
