import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http : HttpClient,private appComponent: AppComponent) { }
  
  readonly APIUrl  = this.appComponent.ResidentialAPIUrl;

  getWalletInfo(){
    return this.http.get<any>(this.APIUrl+"market/wallet")
  }

  //request for stripe URL to add top up
  walletTopUpRequestPayment(data:any){
    return this.http.post<any>(this.APIUrl+"market/wallet/checkout/top_up",data); 
  }

  //top up wallet through wallet API
  walletTopUp(url:string){
    return this.http.get<any>(this.APIUrl+"market/wallet/checkout/top_up_success/"+url+"/");
  }
}
