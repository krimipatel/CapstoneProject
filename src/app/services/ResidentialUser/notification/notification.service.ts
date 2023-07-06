import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { notification } from '../../../classes/notifications'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http : HttpClient, private appComponent : AppComponent) { }

  private readonly APIUrl = this.appComponent.ResidentialAPIUrl;

  getNotifications(){

  //return this.notifications;
   return this.http.get<notification[]>(this.APIUrl+"notification/retrieve");

  }

  deleteNotification(data:any){
    console.log(data);
  }

}
