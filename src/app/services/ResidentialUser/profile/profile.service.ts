import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient,private appComponent: AppComponent) { }

  readonly APIUrl  = this.appComponent.ResidentialAPIUrl;


  getInfo(){


    return this.http.get<any>(this.APIUrl+"residentialuser/userdetails/");
  }

  setInfo(data:any){
    console.log(data);
    return this.http.post(this.APIUrl+"residentialuser/editdetials/",data);
  }



}







