import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class InviteUserService {

  constructor(private http:HttpClient, private appComponent :AppComponent) { }

  private readonly APIUrl = this.appComponent.ResidentialAPIUrl;

  invite(data:any){
    return this.http.post(this.APIUrl+"invitation/invite/",data);
  }
}
