import { TestBed } from '@angular/core/testing';

import { ResidentialGuard } from './residential.guard';

describe('ResidentialGuard', () => {
  let guard: ResidentialGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResidentialGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
