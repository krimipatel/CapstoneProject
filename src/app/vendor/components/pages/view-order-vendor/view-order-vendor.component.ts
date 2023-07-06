import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/vendor/orders/orders.service';

@Component({
  selector: 'app-view-order-vendor',
  templateUrl: './view-order-vendor.component.html',
  styleUrls: ['./view-order-vendor.component.css']
})
export class ViewOrderVendorComponent implements OnInit {

  constructor(private route : ActivatedRoute,private orderService:OrdersService) { }

  private routeSub!: Subscription;

  orderId: any;

  order:any;
  dataLoaded:boolean=false;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.orderId = params['orderId'];
    })

    console.log(this.orderId)

    this.orderService.getOrder(this.orderId).subscribe(res=>{

      this.order=res[0];
      console.log(this.order);
      this.dataLoaded=true;
    })
  }

  price(amount:any){
    var num = new Number(amount);
    var amt = num.toString().split('');
    amt.splice(amt.length-2,0,".")
    return amt.join('');
  }

  openDealPage(dealid:any){
    location.href = "vendor/deal/"+dealid;
    
  }

}
