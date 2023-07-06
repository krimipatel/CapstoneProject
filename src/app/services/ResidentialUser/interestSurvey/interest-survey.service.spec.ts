import { TestBed } from '@angular/core/testing';

import { InterestSurveyService } from './interest-survey.service';

describe('InterestSurveyService', () => {
  let service: InterestSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
