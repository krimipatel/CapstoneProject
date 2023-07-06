import { TestBed } from '@angular/core/testing';

import { CommunityMemberRegService } from './community-member-reg.service';

describe('CommunityMemberRegService', () => {
  let service: CommunityMemberRegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityMemberRegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
