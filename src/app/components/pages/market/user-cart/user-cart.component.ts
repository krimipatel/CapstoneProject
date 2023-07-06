import { Component, OnInit } from '@angular/core';
import { MarketService } from 'src/app/services/ResidentialUser/market/market.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  cartOrder:any;
  cartEmpty:boolean=false;
  loading:boolean=false;

  maximumQty:any=[1,2,3,4,5,6,7];

  constructor(private service:MarketService) { }

  ngOnInit(): void {
    this.loading=true;
    //this.cartOrder = this.service.cartOrder1;
    this.service.getCart().subscribe(res=>{
      console.log(res)
      if(res=="Cart is Empty")
      {

        this.cartEmpty = true;
      }
      else{
        this.cartOrder=res;
        if(this.cartOrder.items.length==0){
          this.cartEmpty=true;
          console.log("empty")
        }
        else{
          this.cartEmpty=false;
        }
      }
      this.loading=false;
    })

  }

  checkcart(){
    if(this.cartOrder.items==0){
      this.cartEmpty=true;
    }
    else{
      this.cartEmpty=false;
    }
  }

  updateQty(count:number, variant_id:any,i:any){
    // this.loading=true;
    var data = {
      variant_id : variant_id,
      quantity : count
    }
    this.cartOrder.items[i].quantity = count;
    this.service.updateQuantity(data).subscribe(res=>{
      console.log(res);

      if(res)
      {
        this.service.getCart().subscribe(cart=>{
          this.cartOrder=cart;
          this.checkcart();
          this.loading=false;
        })
      }
    })

  }

  openProduct(productid:any){
    console.log(productid);

    location.href = "product/"+productid;

  }

  removeItem(variant_id:any,i:any){
    // this.loading=true;
    var data = {
      variant_id : variant_id
    }

    this.service.removeItem(data).subscribe(res=>{
      if(res)
      {
        this.service.getCart().subscribe(cart=>{
          this.cartOrder=cart;
          this.checkcart();
          this.loading=false;
        })
      }
    })
  }


  checkout(){
    location.href="/checkout"
  }
}
