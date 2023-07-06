import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class CommunityContactsService {

  constructor(private http : HttpClient, private app : AppComponent) { }

  private readonly APIUrl = this.app.RegistrationAPIUrl;

  getContacts(){
    return this.http.get(this.APIUrl+"registration/contacts");
  }
}
