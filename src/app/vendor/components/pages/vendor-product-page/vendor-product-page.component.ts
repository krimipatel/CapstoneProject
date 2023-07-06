import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DealsService } from 'src/app/services/vendor/deals/deals.service';
import { ProductService } from 'src/app/services/vendor/Product/product.service';

@Component({
  selector: 'app-vendor-product-page',
  templateUrl: './vendor-product-page.component.html',
  styleUrls: ['./vendor-product-page.component.css']
})
export class VendorProductPageComponent implements OnInit {

  constructor(private route : ActivatedRoute,private dealService : DealsService,private productService:ProductService, private router : Router) { }

  private routeSub!: Subscription;

  productId:any;
  product:any;
  currentImage:any;
  dataLoaded:boolean=false;

  displayFSA : any;

  canEdit:any=true;

  X:number = 10;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.productId = params['id'];
    })

    this.productService.dealExist(this.productId).subscribe(res=>{
      //if deal exists, canEdit becomes true
      this.canEdit = !res;
      console.log(res)
    })

    this.productService.getProductById(this.productId).subscribe(res=>{
      this.product = res;
      if(this.product.delivery_areas.length>15){
        this.displayFSA = this.product.delivery_areas.splice(0,15)
      }
      else{
        this.displayFSA = this.product.delivery_areas;
        this.showedAllDelivery = true;
      }

      if(typeof(this.product.tags)=="string"){
        if(this.product.tags!=""){
          this.product.tags = this.product.tags.split(",")
        }else{
          this.product.tags=[]
        }
      }
      console.log(this.product);
      this.currentImage = this.product.images[0].src;
    })

  }

  showedAllDelivery:boolean=false;

  showAll(){
    this.showedAllDelivery=true;
    this.displayFSA.push( ...this.product.delivery_areas)
  }


  showAllTags(){
    this.X = this.product.tags.length;
  }



  changeImage(index:any){
    this.currentImage = this.product.images[index].src;
  }


  deleteProduct(){

    if(this.canEdit==false){
      this.message = "You cannot delete product when there is an active deal on the product."
      this.showToast = true;
      return;
    }

    this.productService.deleteProduct(this.productId).subscribe(res=>{
      console.log(res);
      if(res=="Successfully Deleted")
      {
        location.href="/vendor/home";
      }
    })

  }

  createDeal(){
    if(this.canEdit==false){
      this.showToast=true;
      this.message = "Cannot create a deal on a product with an already active deal."
      return;
    }

    location.href="vendor/createdeal/"+this.productId
  }



  stockChange(index:any,vid:any){
    if (this.product.variants[index].inventory_policy=='continue') {
      this.product.variants[index].inventory_policy='deny'
      var data = {
        inventory_policy:'deny'
      }
      this.productService.updateInventoryPolicy(data,this.productId,vid).subscribe(res=>{
        console.log(res)
      })
    } else{
      this.product.variants[index].inventory_policy='continue'
      var data = {
        inventory_policy:'continue'
      }
      this.productService.updateInventoryPolicy(data,this.productId,vid).subscribe(res=>{
        console.log(res)
      })
    }
  }

  showToast:boolean=false;
  message:string=""

  openEditPage(){
    if(this.canEdit==false){
      this.message = "You cannot edit product while there is an active deal on the product."
      this.showToast = true;
      return;
    }

    location.href = "vendor/editproduct/"+this.productId

  }

  closeToast(){
    this.showToast=false;
    console.log("Close toast")
  }



}
