import { TestBed } from '@angular/core/testing';

import { LoggedInVendorGuard } from './logged-in-vendor.guard';

describe('LoggedInVendorGuard', () => {
  let guard: LoggedInVendorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedInVendorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
