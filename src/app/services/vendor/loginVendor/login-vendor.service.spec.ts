import { TestBed } from '@angular/core/testing';

import { LoginVendorService } from './login-vendor.service';

describe('LoginVendorService', () => {
  let service: LoginVendorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginVendorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
