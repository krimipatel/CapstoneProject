import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class KnockService {

  constructor(private http : HttpClient, private appComponent : AppComponent) { }

  private readonly APIUrl = this.appComponent.ResidentialAPIUrl;

  sendKnock(data : any){
    return this.http.post(this.APIUrl+"knock/knock/",data);
  }

  replyKnock(data :any)
  {
    return this.http.post(this.APIUrl+"knock/response/",data);
  }

  deleteconnection(data:any){
    return this.http.post(this.APIUrl+"relation/delete/",data);
  }
}
