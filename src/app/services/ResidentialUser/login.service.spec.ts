import { TestBed } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[AppComponent],
      providers:[]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
