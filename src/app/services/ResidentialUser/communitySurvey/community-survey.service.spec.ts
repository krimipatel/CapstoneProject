import { TestBed } from '@angular/core/testing';

import { CommunitySurveyService } from './community-survey.service';

describe('CommunitySurveyService', () => {
  let service: CommunitySurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunitySurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
