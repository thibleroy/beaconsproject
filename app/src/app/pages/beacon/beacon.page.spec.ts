import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconPage } from './beacon.page';

describe('BeaconPage', () => {
  let component: BeaconPage;
  let fixture: ComponentFixture<BeaconPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaconPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
