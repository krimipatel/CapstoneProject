import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyVendorAccountComponent } from './verify-vendor-account.component';

describe('VerifyVendorAccountComponent', () => {
  let component: VerifyVendorAccountComponent;
  let fixture: ComponentFixture<VerifyVendorAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyVendorAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyVendorAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
