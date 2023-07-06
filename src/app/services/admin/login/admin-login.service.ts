import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(private http:HttpClient, private appComponent : AppComponent) { }

  private readonly apiUrl = this.appComponent.AdminAPIUrl;

  login(data:any){
    console.log(data);
     return this.http.post<any>(this.apiUrl+"register/login/",data);
  }
}
