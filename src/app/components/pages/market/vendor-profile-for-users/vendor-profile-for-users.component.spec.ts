import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorProfileForUsersComponent } from './vendor-profile-for-users.component';

describe('VendorProfileForUsersComponent', () => {
  let component: VendorProfileForUsersComponent;
  let fixture: ComponentFixture<VendorProfileForUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorProfileForUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorProfileForUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
