import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderVendorComponent } from './view-order-vendor.component';

describe('ViewOrderVendorComponent', () => {
  let component: ViewOrderVendorComponent;
  let fixture: ComponentFixture<ViewOrderVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOrderVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
