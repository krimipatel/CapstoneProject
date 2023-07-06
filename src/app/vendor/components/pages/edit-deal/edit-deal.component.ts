import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DealsService } from 'src/app/services/vendor/deals/deals.service';

@Component({
  selector: 'app-edit-deal',
  templateUrl: './edit-deal.component.html',
  styleUrls: ['./edit-deal.component.css']
})
export class EditDealComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router:Router ,private dealService:DealsService, private datePipe:DatePipe) { }

  dealId!: string;
  todayDate:any="";
  loading:boolean=true;
  loadingClass: string = "";

  deal :any;

  tierCount = [0];
  quantity = [0]
  price = [0]

  tiers:any = [];

  title:string='';
  description:string='';
  start_date:string='';
  end_date:string='';
  timer:number=0;

  renewDeal!:boolean;


  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.dealId = param['dealid'];
    })

    this.dealService.getDealsById(this.dealId).subscribe(res=>{
      console.log(res)
      this.deal = res;
      this.deal = this.deal.items;
      this.renewDeal = this.deal.deal_renew_deal;
      for (let index = 0; index < this.deal.deal_tiers.length; index++) {
        this.tierCount[index] = index;
        this.quantity[index] = this.deal.deal_tiers[index].quantity;
        this.price[index] = this.deal.deal_tiers[index].price;

        var tier = {
          quantity : this.quantity[index],
          price : this.price[index]
        }

        this.tiers.push(tier)
      }

      this.title = this.deal.deal_title;
      this.description = this.deal.deal_description;
      this.start_date = this.deal.deal_start_date;
      this.end_date = this.deal.deal_end_date;
      this.timer = this.deal.deal_timer;
      var date = new Date(new Date().toDateString());
      var startDateString = this.start_date.split("-").join("/");
      var startDate = new Date(startDateString);

      if(startDate <= date){
        location.href = "vendor/deals";
      }

      this.loading=false;
    })






    this.todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6 && day !== 1 && day !== 2 && day !== 3 && day !== 4;
  };


  addTier(){
    this.tierCount.push(this.tierCount.length)
    this.quantity.push(0)
    this.price.push(0)

    this.tierChange();
  }

  removeTier(i:any){
    this.tierCount.splice(i,1);
    for(let j=i;j<this.tierCount.length;j++)
    {
      this.tierCount[j] -= 1;
    }

    this.quantity.splice(i,1);
    this.price.splice(i,1);

    this.tierChange()
  }

  tierChange(){
    this.tiers = [];

    for(let i=0;i<this.tierCount.length;i++){
      var tier = {
        quantity : this.quantity[i],
        price : this.price[i]
      }

      this.tiers.push(tier)
    }

    console.log(this.tiers)


  }



  submit(){
    this.loadingClass = "waiting";
    this.deal.deal_title = this.title;
    this.deal.deal_description = this.description;
    this.deal.deal_tiers = this.tiers;
    // this.deal.deal_start_date = this.start_date;
    // this.deal.deal_end_date = this.end_date;
    this.deal.deal_timer = this.timer;
    this.deal.deal_renew_deal = this.renewDeal;

    // convert date type
    this.deal.deal_start_date = this.convertDate(new Date(this.start_date))

    // add 7 days to start date to calculate end date
    var end_date_calc = new Date(this.start_date);
    end_date_calc.setDate(end_date_calc.getDate() + 7);
    this.deal.deal_end_date = this.convertDate(end_date_calc)



    var editDeal = {
      deal_id :this.dealId,
      items :this.deal
    }

    console.log(editDeal);
    this.dealService.editDeal(editDeal).subscribe(res=>{
      console.log(res)
      if(res){
        location.href="vendor/deal/"+this.dealId
      }
    })

  }

  convertDate(date: Date) {
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))
    return date.toISOString().split('T')[0]
  }

  discard(){
    this.router.navigateByUrl('vendor/deals');
  }

}
