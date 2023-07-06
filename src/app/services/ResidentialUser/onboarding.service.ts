import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { LoginService } from './login.service';
import { AppComponent } from 'src/app/app.component';

interface response {
  success: Boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  constructor(private http:HttpClient,private loginService:LoginService,private appComponent :AppComponent) { }
  private readonly APIurl = this.appComponent.RegistrationAPIUrl;

  communityDetails(data:any){
    return this.http.post<response>(this.APIurl + "registration/community/", data);
  }
  personalDetails(data:any){
   return this.http.post<response>(this.APIurl + "registration/register/addinfo/", data);
  }

  getCommunityDetails(data:any){
    return this.http.post<response>(this.APIurl + "registration/address_check/", data);
  }

}
