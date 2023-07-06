import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileVendorComponent } from './view-profile-vendor.component';

describe('ViewProfileVendorComponent', () => {
  let component: ViewProfileVendorComponent;
  let fixture: ComponentFixture<ViewProfileVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProfileVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
