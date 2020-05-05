import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSecurityComponent } from './api-security.component';

describe('ApiSecurityComponent', () => {
  let component: ApiSecurityComponent;
  let fixture: ComponentFixture<ApiSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
