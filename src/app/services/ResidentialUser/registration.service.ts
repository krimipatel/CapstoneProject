import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  readonly APIUrl = this.appComponent.RegistrationAPIUrl;

  constructor(private http:HttpClient,private appComponent:AppComponent) { }

  registerUser(data:any){
    return this.http.post(this.APIUrl+"registration/register/",data);
  }
}
