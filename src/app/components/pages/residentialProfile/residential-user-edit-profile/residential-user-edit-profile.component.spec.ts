import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ProfileService } from 'src/app/services/ResidentialUser/profile/profile.service';
import { MockProfile } from 'src/mocks';

import { ResidentialUserEditProfileComponent } from './residential-user-edit-profile.component';

fdescribe('ResidentialUserEditProfileComponent', () => {
  let component: ResidentialUserEditProfileComponent;
  let fixture: ComponentFixture<ResidentialUserEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentialUserEditProfileComponent ],
      providers:[AppComponent, FormBuilder],
      imports:[RouterTestingModule, HttpClientTestingModule, HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentialUserEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the profile details', () => {
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(ProfileService);
    spyOn(service, "getInfo").and.callFake(()=>{
      return of(MockProfile)
    })
    app.getProfileData();
    expect(app.profileData).toEqual(MockProfile);
  });
});
