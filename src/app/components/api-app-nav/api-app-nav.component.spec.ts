
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ApiAppNavComponent } from './api-app-nav.component';

describe('ApiAppNavComponent', () => {
  let component: ApiAppNavComponent;
  let fixture: ComponentFixture<ApiAppNavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [ApiAppNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiAppNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
