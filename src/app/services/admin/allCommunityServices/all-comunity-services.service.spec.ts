import { TestBed } from '@angular/core/testing';

import { AllComunityServicesService } from './all-comunity-services.service';

describe('AllComunityServicesService', () => {
  let service: AllComunityServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllComunityServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
