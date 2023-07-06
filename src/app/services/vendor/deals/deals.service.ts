import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  constructor(private http:HttpClient,private appComponent:AppComponent) { }

  private readonly APIUrl  =this.appComponent.vendorAPIUrl;

  createDeal(data:any)
  {
    return this.http.post(this.APIUrl+"deals/deal/create/",data);
  }

  getDeals()
  {
    return this.http.get(this.APIUrl+"deals/all/");
  }

  getExpiredDeals()
  {
    return this.http.get(this.APIUrl+"deals/all-expired/");
  }

  getDealsById(id:any){
    return this.http.get(this.APIUrl+"deals/get/"+id+ "/")
  }

  editDeal(data:any){
    return this.http.put(this.APIUrl+"deals/edit/", data);
  }

  deleteDeal(dealid:any){
    return this.http.get(this.APIUrl + "deals/delete/"+dealid+'/');
  }

}
