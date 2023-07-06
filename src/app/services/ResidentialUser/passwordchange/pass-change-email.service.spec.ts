import { TestBed } from '@angular/core/testing';

import { PassChangeEmailService } from './pass-change-email.service';

describe('PassChangeEmailService', () => {
  let service: PassChangeEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassChangeEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
