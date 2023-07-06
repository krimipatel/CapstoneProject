import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class ViewProfileService {

  constructor(private http :HttpClient, private appComponent:AppComponent) { }

  private readonly APIUrl = this.appComponent.ResidentialAPIUrl;

  getProfile(data:any){
    //console.log(data);
    return this.http.post(this.APIUrl+"residentialuser/userprofile/",data);

  }
}
