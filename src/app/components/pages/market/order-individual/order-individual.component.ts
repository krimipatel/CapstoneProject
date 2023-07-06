import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketService } from 'src/app/services/ResidentialUser/market/market.service';

@Component({
  selector: 'app-order-individual',
  templateUrl: './order-individual.component.html',
  styleUrls: ['./order-individual.component.css']
})
export class OrderIndividualComponent implements OnInit {

  constructor(private router:ActivatedRoute, private marketService:MarketService) { }
  orderId!:string;
  order:any;
  isLoaded:boolean=false;
  orderType:any;
  totalPrice:any;
  

  ngOnInit(): void {

    this.router.params.subscribe(async (params) => {
      this.orderId = await params['orderid'];

      this.marketService.getOrder(this.orderId).subscribe(res=>{
        this.order = res[0];
        this.orderType = this.order.order_type;
        this.totalPrice = (this.order.amount).toFixed(2);
        console.log(res[0]);
        this.isLoaded=true;
      })

    })
  }

  price(amount:any){
    return ((parseInt(amount)/100).toFixed(2))
  }

}
