import { Component, OnInit } from '@angular/core';

import { MarketService } from 'src/app/services/ResidentialUser/market/market.service';
import { ProfileService } from 'src/app/services/ResidentialUser/profile/profile.service';
import { ViewProfileService } from 'src/app/services/ResidentialUser/viewProfile/view-profile.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private profileService : ProfileService,private service:MarketService) { }

  fullAddress : string = '';
  firstLine : any;
  city : any;
  state:any;
  country:any;
  loadingClass: string = "";

  cartOrder:any;
  cartEmpty:boolean=true;

  unit : any;
  phone : any;

  checkoutValid:any;

  saveCard:boolean = false;

  ngOnInit(): void {
   this.profileService.getInfo().subscribe(res=>{
    console.log(res);
    this.fullAddress = res.address;
     this.unit = res.unit;

    this.phone = res.phone;
    this.firstLine = this.fullAddress.split(",")[0];
    this.city = this.fullAddress.split(",")[1];
    this.state = this.fullAddress.split(",")[2];
    this.country = this.fullAddress.split(",")[3];

    if(!Number.isInteger(this.unit/1))
    {
      this.unit = "Please set a Valid Unit Number"
      this.checkoutValid = false;
    }
  })

  this.service.getCart().subscribe(res=>{
    this.cartOrder=res;
    if(this.cartOrder == "Cart is Empty"){
      this.cartEmpty = true;
    }
    else{
      if(this.cartOrder.items.length==0)
      {
        this.cartEmpty = true;
        location.href = "market"
      }
      else{
        this.cartEmpty = false;
      }
    }

  })



  }

  pay(){
    this.loadingClass = "waiting";

    this.cartOrder.saveCard = this.saveCard

    console.log(this.cartOrder)

    this.service.pay(this.cartOrder).subscribe(res=>{
      console.log(res);
      window.open(res.sessionUrl,"_self")

    })
  }

}
