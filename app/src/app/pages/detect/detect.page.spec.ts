import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectPage } from './detect.page';

describe('DetectPage', () => {
  let component: DetectPage;
  let fixture: ComponentFixture<DetectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
