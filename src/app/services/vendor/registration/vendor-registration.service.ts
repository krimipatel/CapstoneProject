import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';


@Injectable({
  providedIn: 'root'
})
export class VendorRegistrationService {

  constructor(private http : HttpClient,private appComp:AppComponent) { }

  APIUrl = this.appComp.vendorAPIUrl;

  register(data: any)
  {
    return this.http.post<any>(this.APIUrl+"account/register/",data);
  }

  activate(data:any){
    return this.http.get<any>(this.APIUrl+"account/activate/"+data.code +"/"+data.url);
  }

  forgotPassword(data:any){
    return this.http.post(this.APIUrl+"account/resetpassword/",data);
  }

  resetPassword(data:any,uid:any,token:any){
    return this.http.post(this.APIUrl+"account/reset/"+uid+"/"+token+"/",data);
  }
}
