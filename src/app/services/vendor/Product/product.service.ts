import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  globalCategoryList:string[]=[
    "Food and Drinks",
    "Home and Auto Services",
    "Home and Garden Products",
    "Other Products",
    "Other Services"
  ]

  constructor(private http:HttpClient,private appComponent:AppComponent) { }

  APIUrl  =this.appComponent.vendorAPIUrl;

  getProducts(){
    return this.http.get<any>(this.APIUrl+"vendor/vendor/");
  }

  getProductById(id:any){
    return this.http.get<any>(this.APIUrl+"vendor/details/"+id+"/");
  }



  getAreas(){
   return this.http.get<any>(this.APIUrl+"areacode/area/");
  }

  getCode(data:any){
    return this.http.post<any>(this.APIUrl+"areacode/code/",data);
  }

  addProduct(data:any){
    return this.http.post<any>(this.APIUrl+"vendor/add/",data);
  }

  deleteProduct(id:any){
    return this.http.delete<any>(this.APIUrl+"vendor/delete/"+id+"/");
  }

  editProduct(id:any,data:any){
    return this.http.put<any>(this.APIUrl+"vendor/update/"+id+"/",data);
  }

  deleteImage(data:any){
    return this.http.delete<any>(this.APIUrl+"vendor/deleteimage/"+data.productId+"/"+data.imageId+"/");
  }

  addImage(productId:any,image:any){
    return this.http.post<any>(this.APIUrl+"vendor/images/"+productId+"/",image);
  }

  updateInventoryPolicy(data:any,productId:any,variantId:any){
    return this.http.put<any>(this.APIUrl+"vendor/stockupdate/"+productId+"/"+variantId+"/",data);
  }

  calculateGroupBuyEarnings(data:any){
    return this.http.put<any>(this.APIUrl+"calculator/calculate",data);
  }

  dealExist(id:any){
    return this.http.get(this.APIUrl+"deals/product-active-deals/"+id);
  }

}
