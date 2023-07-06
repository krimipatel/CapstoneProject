import { Component, OnInit } from '@angular/core';
import { MarketService } from 'src/app/services/ResidentialUser/market/market.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private marketService:MarketService) { }

  orders:any;
  months:number=1;


  ngOnInit(): void {
    this.marketService.getOrders().subscribe(res=>{
      this.orders=res;
      console.log(this.orders)
    })

  }

  openOrder(orderid:string){
    location.href = "order/"+orderid;
  }

  setMonth(months:number){
    this.months = months;
  }

  goBack(){
    location.href="/market"
  }

}



