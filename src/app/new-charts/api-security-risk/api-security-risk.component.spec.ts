import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSecurityRiskComponent } from './api-security-risk.component';

describe('ApiSecurityRiskComponent', () => {
  let component: ApiSecurityRiskComponent;
  let fixture: ComponentFixture<ApiSecurityRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiSecurityRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSecurityRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
