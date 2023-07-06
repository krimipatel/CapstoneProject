import { TestBed } from '@angular/core/testing';

import { KnockService } from './knock.service';

describe('KnockService', () => {
  let service: KnockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
