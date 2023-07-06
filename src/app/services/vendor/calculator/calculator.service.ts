import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

interface calulatedData {
  status:string;
  total_revenue:string;
}


@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private http:HttpClient,private urlComp:AppComponent) { }

  private readonly APIUrl = this.urlComp.vendorAPIUrl;

  calculateOffer(offer:any){
    return this.http.post<calulatedData>(this.APIUrl+"calculator/calculate/",offer);
  }

  checkOffer(){
    return this.http.get<any>(this.APIUrl+"calculator/exist/");
  }

  deleteOffer(){
    return this.http.get<any>(this.APIUrl+"calculator/delete/");
  }

  earlyVendorSignUp(data:any){
    return this.http.post<any>(this.APIUrl+"calculator/send/", data);
  }
}
