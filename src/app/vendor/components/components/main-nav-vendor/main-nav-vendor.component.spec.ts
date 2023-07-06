import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavVendorComponent } from './main-nav-vendor.component';

describe('MainNavVendorComponent', () => {
  let component: MainNavVendorComponent;
  let fixture: ComponentFixture<MainNavVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNavVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
