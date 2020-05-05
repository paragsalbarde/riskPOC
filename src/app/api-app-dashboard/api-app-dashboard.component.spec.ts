
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiAppDashboardComponent } from './api-app-dashboard.component';

describe('ApiAppDashboardComponent', () => {
  let component: ApiAppDashboardComponent;
  let fixture: ComponentFixture<ApiAppDashboardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiAppDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiAppDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
