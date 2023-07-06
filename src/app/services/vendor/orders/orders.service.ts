import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient,private appComponent:AppComponent) { }
  private readonly APIUrl=this.appComponent.vendorAPIUrl;

  getOrders(){
    return this.http.get(this.APIUrl+"order/all/")
  }

  getOrder(id:any)
  {
    return this.http.get<any>(this.APIUrl+"order/"+id+"/")
  }


}
