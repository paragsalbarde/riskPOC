
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDataTableComponent } from './map-data-table.component';

describe('MapDataTableComponent', () => {
  let component: MapDataTableComponent;
  let fixture: ComponentFixture<MapDataTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDataTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
