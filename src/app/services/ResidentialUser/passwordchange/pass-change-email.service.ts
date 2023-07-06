import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from 'src/app/app.component';


@Injectable({
  providedIn: 'root'
})
export class PassChangeEmailService {

  readonly APIurl =  this.appComponent.RegistrationAPIUrl;
  constructor(private http:HttpClient, private appComponent : AppComponent) { }

  sendEmail(data:any){
    return this.http.post(this.APIurl + "registration/resetpassword/", data);
  }
}
