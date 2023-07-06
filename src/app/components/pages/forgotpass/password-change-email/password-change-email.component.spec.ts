import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangeEmailComponent } from './password-change-email.component';

describe('PasswordChangeEmailComponent', () => {
  let component: PasswordChangeEmailComponent;
  let fixture: ComponentFixture<PasswordChangeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordChangeEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
