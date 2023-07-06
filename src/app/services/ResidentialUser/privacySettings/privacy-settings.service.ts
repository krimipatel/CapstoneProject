import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class PrivacySettingsService {
  constructor(private http:HttpClient, private appcomponent:AppComponent) { }

  readonly APIUrl = this.appcomponent.RegistrationAPIUrl;

  getPrivacySettings(){
    //return this.settings;
     return this.http.get(this.APIUrl + "registration/privacy/");
  }

  setPrivacySettings(data:any){
    return this.http.post(this.APIUrl + "registration/privacy/", data);
  }
}
