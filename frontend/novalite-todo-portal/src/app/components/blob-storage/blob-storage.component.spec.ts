/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BlobStorageComponent } from './blob-storage.component';

describe('BlobStorageComponent', () => {
  let component: BlobStorageComponent;
  let fixture: ComponentFixture<BlobStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlobStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlobStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
