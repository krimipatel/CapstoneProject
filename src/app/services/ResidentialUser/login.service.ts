import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { Observable } from 'rxjs';
// import { SocialAuthService } from 'angularx-social-login';



@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http:HttpClient,private appComponent:AppComponent) {}

  readonly APIurl = this.appComponent.RegistrationAPIUrl;
  loginUser(data:any):Observable<any>{
    return this.http.post<any>(this.APIurl + "registration/login/",data);
  };

  getPassword(data:any){
    return this.http.post(this.APIurl+ "registration/password/", data);
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("first_time");

    return this.http.post(this.APIurl+"registration/logout/",true);


  }


  socialLoginIn(data:any){
    return this.http.post<any>(this.APIurl+"registration/register/oauth/",data);
  }

  activate(data:any){
    return this.http.get<any>(this.APIurl+"registration/activate/"+data.code +"/"+data.url);
  }

}


