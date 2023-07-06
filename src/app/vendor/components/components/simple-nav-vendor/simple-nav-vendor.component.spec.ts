import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleNavVendorComponent } from './simple-nav-vendor.component';

describe('SimpleNavVendorComponent', () => {
  let component: SimpleNavVendorComponent;
  let fixture: ComponentFixture<SimpleNavVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleNavVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleNavVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
