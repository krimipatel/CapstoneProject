import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketService } from 'src/app/services/ResidentialUser/market/market.service';

@Component({
  selector: 'app-process-deal',
  templateUrl: './process-deal.component.html',
  styleUrls: ['./process-deal.component.css']
})
export class ProcessDealComponent implements OnInit {

  constructor(private route: ActivatedRoute,private marketService:MarketService) { }

  loading:boolean=true;
  Error : boolean = false;
  message:string='';
  url:any;
  id:any;

  dealInfo :any;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      console.log(params);
      this.url = params;
      this.url = this.url.id;
      console.log(this.url)
    })

    this.message = 'Placing your order. Please wait and do not close this tab.'
    this.marketService.placeOrder(this.url).subscribe(res=>{
      console.log(res);
      if(res.success==true){
        this.id = res.orderId;
        this.dealInfo =  localStorage.getItem("communityCart")
        this.dealInfo = JSON.parse(this.dealInfo);
        console.log(this.dealInfo)
        this.message = 'Order Placed. Entering you into the deal.'
        this.marketService.addToCommunityCart(this.dealInfo).subscribe(res=>{
          console.log(res)
          this.message = 'Entered into the deal. Redirecting now.'
          location.href = "orderconfirmed/"+this.id;

        });

      }
    },(err)=>{
      console.log(err)
      localStorage.removeItem("communityCart")
      this.message = "Error placing your order. Please try again later."
      this.Error = true;
      this.loading = false
    })

  }
}
