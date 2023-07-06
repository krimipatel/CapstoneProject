import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/app/services/ResidentialUser/login.service';
import { validUser, blankUser } from 'src/mocks';
import { LoginComponent } from './login.component';
import { SocialAuthService } from 'angularx-social-login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers:[LoginService, AppComponent, SocialAuthService],
      imports:[RouterTestingModule, HttpClientTestingModule, HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function updateForm(userEmail: any, userPassword: any) {
    component.loginForm.controls['email'].setValue(userEmail);
    component.loginForm.controls['password'].setValue(userPassword);
  } 

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('form value should update from when the value is changed', (() => {
    updateForm(validUser.email, validUser.password);
    expect(component.loginForm.value).toEqual(validUser);
  }));

  it('Form invalid should be true when the form is invalid', (() => {
    updateForm(blankUser.email, blankUser.password);
  }));
});