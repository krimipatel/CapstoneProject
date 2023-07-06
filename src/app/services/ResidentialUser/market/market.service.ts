import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http:HttpClient,private app:AppComponent) { }

  private readonly APIUrl = this.app.ResidentialAPIUrl;


  getProducts(){
    return this.http.get<any>(this.APIUrl+"market/aws/all/")
  }

  getProduct(id:any){
    return this.http.get<any>(this.APIUrl+"market/details/"+ id +"/")
  }

  getDeals(){
      return this.http.get<any>(this.APIUrl+"market/alldeals/")
  }

  getDealById(id:any){
      return this.http.get<any>(this.APIUrl+"market/deal/"+id+"/")
  }


//   ========= Cart =================

  getCart(){
    return this.http.get(this.APIUrl+"market/cart/getcart/")
  }

  addItem(data:any)
  {
    return this.http.post(this.APIUrl+"market/cart/create/",data);
  }

  updateQuantity(data:any){
    return this.http.post(this.APIUrl+"market/cart/quantity/update/",data);
  }


  removeItem(data:any){
    return this.http.post(this.APIUrl+"market/cart/removeproduct/",data);
  }

  emptyCart(){
    return this.http.get(this.APIUrl+"market/cart/clearcart/");
  }

//   =============== Payment


  pay(cart:any){
    return this.http.post<any>(this.APIUrl+"market/cart/checkout/",cart)
  }

  placeOrder(url:any){
    return this.http.get<any>(this.APIUrl+"market/cart/checkout/details/"+ url +"/")
  }


//   ===================== orders

  getOrder(id:any){
    return this.http.get<any>(this.APIUrl+"order/"+ id + "/")
  }

  getOrders(){
    return this.http.get<any>(this.APIUrl+"order/all/")
  }

  search(searchString:any){
    return this.http.get<any>(this.APIUrl+"market/searchmarket/"+searchString)
  }

  filter(filterString:any,){
    return this.http.get<any>(this.APIUrl+"market/search/filterpricedealprod/"+filterString)
  }


  dealCheckout(data:any){
    return this.http.post<any>(this.APIUrl+"market/cart/checkout/",data)
  }

  addToCommunityCart(data:any){
    return this.http.post<any>(this.APIUrl+"market/commcart/create/",data)
  }


// =========================== vendor




  getVendorProfile(shopname:any){
      return this.http.get<any>(this.APIUrl+ "market/shop/" + shopname);
  }

  followVendor(data:any){
      return this.http.post<any>(this.APIUrl + "market/follow/" + data.Vendor,data);
  }


}
