import { TestBed } from '@angular/core/testing';

import { CommunityContactsService } from './community-contacts.service';

describe('CommunityContactsService', () => {
  let service: CommunityContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
