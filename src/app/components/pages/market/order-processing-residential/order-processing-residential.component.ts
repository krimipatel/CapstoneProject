import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketService } from 'src/app/services/ResidentialUser/market/market.service';

@Component({
  selector: 'app-order-processing-residential',
  templateUrl: './order-processing-residential.component.html',
  styleUrls: ['./order-processing-residential.component.css']
})
export class OrderProcessingResidentialComponent implements OnInit {

  constructor(private route: ActivatedRoute,private marketService:MarketService) { }

  loading:boolean=true;
  placingOrder : boolean = true;
  redirecting:boolean = false;

  url:any;
  id:any;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      console.log(params);
      this.url = params;

      this.url = this.url.id;
      console.log(this.url)
    })

    this.marketService.placeOrder(this.url).subscribe(res=>{
      console.log(res);
      if(res.success==true){
        this.id = res.orderId;
        this.placingOrder = false;
        this.redirecting = true;
        this.marketService.emptyCart().subscribe(res=>{
          if(res)
          {
            location.href = "orderconfirmed/"+this.id;
          }
        })
      }

    })
  }

}
