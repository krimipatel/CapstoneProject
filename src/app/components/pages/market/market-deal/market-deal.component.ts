import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MarketService } from 'src/app/services/ResidentialUser/market/market.service';

@Component({
  selector: 'app-market-deal',
  templateUrl: './market-deal.component.html',
  styleUrls: ['./market-deal.component.css']
})
export class MarketDealComponent implements OnInit {

  constructor(private route:ActivatedRoute, private datePipe:DatePipe, private service:MarketService) { }

  loading:Boolean=true;
  loadingError:Boolean=false;


  dealId:any;
  product:any;
  currentImage:any;
  dateToday:any;
  dealstarted:boolean=false;
  dealNew:any;
  communityCart:any;
  selectedQuantity:number=0;
  daysLeft:number=0;
  hoursLeft:number=0;
  minutesLeft:number=0;
  disclaimerToggle:boolean=false;
  dealProgressWidth:string ='';
  dealEnded : boolean = false;



  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.dealId =  param.dealid;
      this.service.getDealById(this.dealId).subscribe(res=>{
        console.log(res)
        if(res=="deal unavailable at the moment"){
          this.loadingError=true;
          this.loading=false;
          return;
        }
        this.product = res.deal.product;
        this.dealNew = res.deal;
        this.communityCart = res.community_cart;
        this.currentImage = this.product.images[0].src;
        if (this.dealNew.deal_start_date>this.dateToday) {
          this.dealstarted=false;
        } else {
          this.dealstarted=true;
        }
        this.checkCommunityTier();
        this.isStartedForCommunity();
        var enddate = new Date(res.deal.deal_end_date + "T12:00:00.000")
        this.dateToday = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        const now = new Date();
        const options = { timeZone: "America/New_York" };
        const estDateTimeString = now.toLocaleString("en-US", options);
        var Today = new Date(estDateTimeString);
        
        var diffMs = (enddate.getTime() - Today.getTime());
        var diffDays = Math.floor(diffMs / 86400000); // days
        var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        this.daysLeft = diffDays
        this.hoursLeft = diffHrs
        this.minutesLeft = diffMins
        if (diffMins<=0 && diffHrs<=0 &&  diffDays<=0){
          this.dealEnded = true;
        }
        // this.dealEnded = false;
        var progressWidth =  (this.communityCart.total_quantity)*100/this.dealNew.deal_tiers[this.dealNew.deal_tiers.length-1].quantity;
        this.dealProgressWidth = progressWidth+"%"

        this.loading=false;
      },
      (err)=>{
        console.log(err)
        this.loadingError=true;
      })
    })

  }

  round(string:string) {
    let number = parseFloat(string)
    return number.toFixed(2)
  } 

  changeImage(index:any){
    this.currentImage = this.product.images[index].src;
  }

  // current community tier
  communityTier:number=1;

  checkCommunityTier(){
      for (let index = 0; index < this.dealNew.deal_tiers.length; index++) {
          if (this.dealNew.deal_tiers[index].quantity<this.communityCart.total_quantity) {
              this.communityTier = index+2;
          }
      }
  }

  nonEntered:boolean=true;
  isStartedForCommunity(){
      if(!this.communityCart.start_date){
         this.nonEntered = true;
      } else{
          this.nonEntered = false;
      }
  }

  addQuantity(){
    if(this.selectedQuantity<10) this.selectedQuantity++;
  }

  minusQuantity(){
    if(this.selectedQuantity>0) this.selectedQuantity--;
  }

  toggleDisclaimer(){
    console.log(this.disclaimerToggle)
    this.disclaimerToggle = !this.disclaimerToggle;
  }

  buyAtOriginal:boolean =false ;
  error:string="";
  buy(){

    var data = {
      deal: this.dealNew,
      community_cart : this.communityCart ,
      quantity : this.selectedQuantity,
      object_type:"deal",
      deal_id:this.dealId,
      buyAtOriginal:this.buyAtOriginal,
      saveCard:false,
    }

    this.dealNew.deal_id = this.dealId;

    var savedData = {
      quantity : this.selectedQuantity,
      deal : this.dealNew
    }

    localStorage.setItem("communityCart", JSON.stringify(savedData) );

    console.log(data)
    this.service.dealCheckout(data).subscribe(res=>{
      console.log(res);
      window.open(res.sessionUrl,"_self")
    },(error)=>{
      if(error.error="User already in this deal"){
        this.toggleDisclaimer();
        this.error = "You already in this deal"
      }
    })
   }



  openVendorProfile(){
    location.href = "/market/vendor/"+this.product.vendor;


  }

}
