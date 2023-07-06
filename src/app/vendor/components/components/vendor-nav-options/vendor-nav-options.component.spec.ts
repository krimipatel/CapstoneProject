import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorNavOptionsComponent } from './vendor-nav-options.component';

describe('VendorNavOptionsComponent', () => {
  let component: VendorNavOptionsComponent;
  let fixture: ComponentFixture<VendorNavOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorNavOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorNavOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
