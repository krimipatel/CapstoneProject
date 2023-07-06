import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class ProfilephotoService {

  constructor(private http:HttpClient, private appComponent :AppComponent) { }

  private readonly APIUrl = this.appComponent.ResidentialAPIUrl;

  private readonly APIUrl2 = this.appComponent.RegistrationAPIUrl;

  getProfile()
  {
    return this.http.get(this.APIUrl+"residentialuser/profilephoto");
  }

  setprofile(data :any){
    return this.http.post(this.APIUrl2+"registration/Profilepicture/",data);
  }

}
