import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class PasswordChangeService {

  readonly APIurl = this.appComponent.RegistrationAPIUrl;
  constructor(private http:HttpClient,  private appComponent : AppComponent) { }



  sendPassword(data:any){
    var password = {
      password : data.password
    }
    console.log(data.id);
    console.log(data.token);

    return this.http.post(this.APIurl + "registration/reset/" +data.id + "/" + data.token , password);
  }
}
