import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from 'src/app/app.component';
import { RegistrationService } from 'src/app/services/ResidentialUser/registration.service';
import { validUser } from 'src/mocks';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers:[RegistrationService, AppComponent],
      imports:[RouterTestingModule, HttpClientTestingModule, HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function updateForm(userEmail: any, userPassword: any, userPassword2: any) {
    component.registerForm.controls['email'].setValue(userEmail);
    component.registerForm.controls['password'].setValue(userPassword);
    component.registerForm.controls['password2'].setValue(userPassword2);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.invalid).toBeTruthy();
  });

  it('form value should update from when the value is changed', (() => {
    updateForm(validUser.email, validUser.password, validUser.password);
    expect(component.registerForm.controls['email'].value).toEqual(validUser.email);
    expect(component.registerForm.controls['password'].value).toEqual(validUser.password);
    expect(component.registerForm.controls['password2'].value).toEqual(validUser.password);
  }));

  it('Form invalid should be true when the password and confirm password are not the same', (() => {
    updateForm(validUser.email, validUser.password, "DifferentPassword");
    expect(component.registerForm.valid).toBeFalsy();
  }));
});