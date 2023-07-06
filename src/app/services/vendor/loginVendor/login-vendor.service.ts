import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class LoginVendorService {

  httpOptions:any;

  constructor(private http:HttpClient,private appComponent:AppComponent) {

  }

  readonly APIurl = this.appComponent.vendorAPIUrl;

  login(data:any){
    return this.http.post<any>(this.APIurl+"account/login/",data);
  }

  logout(){
    return this.http.get<any>(this.APIurl+"account/logout/");
  }

  getProfile(){
    return this.http.get<any>(this.APIurl+"account/profile/");
  }

  editProfile(data:any){
    return this.http.post<any>(this.APIurl+"account/profile/", data);
  }

}
