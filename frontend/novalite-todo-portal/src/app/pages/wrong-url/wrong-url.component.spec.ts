/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WrongUrlComponent } from './wrong-url.component';

describe('WrongUrlComponent', () => {
  let component: WrongUrlComponent;
  let fixture: ComponentFixture<WrongUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
