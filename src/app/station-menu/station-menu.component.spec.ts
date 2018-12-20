import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationMenuComponent } from './station-menu.component';

describe('StationMenuComponent', () => {
  let component: StationMenuComponent;
  let fixture: ComponentFixture<StationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
