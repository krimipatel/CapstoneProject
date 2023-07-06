import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { AppComponent } from 'src/app/app.component';

interface FAQ {
  id:Number;
  category:String;
  question : String;
  answer : String;
}

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  private apiUrl: String = this.appComponent.SupportAPIUrl;

  constructor(private http : HttpClient, private appComponent :AppComponent) {
  }

  getFAQS(){
    //  return this.faqs;
     return this.http.get<FAQ[]>(this.apiUrl+"residentialuser/faq/");

  }




}
