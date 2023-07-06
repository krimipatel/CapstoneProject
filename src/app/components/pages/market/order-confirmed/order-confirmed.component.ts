import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MarketService } from 'src/app/services/ResidentialUser/market/market.service';

@Component({
  selector: 'app-order-confirmed',
  templateUrl: './order-confirmed.component.html',
  styleUrls: ['./order-confirmed.component.css']
})
export class OrderConfirmedComponent implements OnInit {

  constructor(private route : ActivatedRoute,private marketService:MarketService) { }

  private routeSub!: Subscription;
  orderId:any;

  order:any;
  orderType:any;
  isLoaded:boolean=false;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.orderId = params['orderId'];
    })

    localStorage.removeItem("communityCart")

    this.marketService.getOrder(this.orderId).subscribe(res=>{
      this.order=res[0];
      this.orderType = this.order.order_type;
      console.log(this.order);
      this.isLoaded=true;
    })
  }

  price(amount:any){
    var num = new Number(amount);
    var amt = num.toString().split('');
    amt.splice(amt.length-2,0,".")
    return amt.join('');
  }
  shop(){
    location.href="/market"
  }

  orders(){
    location.href = "/orders"
  }


}
