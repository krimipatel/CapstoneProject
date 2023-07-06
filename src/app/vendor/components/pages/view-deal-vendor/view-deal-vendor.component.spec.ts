import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDealVendorComponent } from './view-deal-vendor.component';

describe('ViewDealVendorComponent', () => {
  let component: ViewDealVendorComponent;
  let fixture: ComponentFixture<ViewDealVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDealVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDealVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
