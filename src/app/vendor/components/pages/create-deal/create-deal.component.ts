import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/vendor/Product/product.service';
import { DealsService } from 'src/app/services/vendor/deals/deals.service';

@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.css']
})

export class CreateDealComponent implements OnInit {
  constructor(private route:ActivatedRoute, private router:Router,private productService:ProductService,private datePipe: DatePipe,
    private dealService:DealsService) { }

  dealForm = new FormGroup({
    dealTitle : new FormControl('',[Validators.required]),
    description : new FormControl('',[Validators.required]),
    dealStartDate: new FormControl('',[Validators.required]),
    renewDeal : new FormControl(''),
    prices:new FormControl(''),
    quantities:new FormControl('')
  });

  productId!:string;
  product:any;
  todayDate:any="";

  tierCount = [0];
  quantity:any = []
  price:any = []

  tiers:any = [{quantity:0,price:0}];

  loadingClass: string = "";

  title:string='';
  description:string='';
  start_date:any = '';
  end_date:string='';
  renewDeal:boolean = true;
  timer:number=7;
  dataLoaded:boolean = false;

  responsePending:boolean = false;


  ngOnInit(): void {
    
    this.route.params.subscribe(params=>{
      this.productId = params['productid'];
      console.log(this.productId);
    })

    this.productService.getProductById(this.productId).subscribe(res=>{
      console.log(res);
      this.product = res;
      this.dataLoaded=true;
    })

    this.todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6 && day !== 1 && day !== 2 && day !== 3 && day !== 4;
  };

  checkQuantity(index:any){
    if(this.quantity[index]<0){
      this.quantity[index]=0
    }

    if(this.quantity[index]%1!=0){
      this.quantity[index] = 0;
    }
  }
  

  checkPrice(index:any){
    if(this.price[index]<0){
      this.price[index]=0;
    }
  }

  checkTimer(){
    if(this.timer<0){
      this.timer=0
    }

    if(this.timer%1!=0){
      this.timer = 0;
    }

    if(this.timer>6){
      this.timer=6;
    }
  }

  tierError:boolean=false;

  addTier(){
    for(let i=0;i<this.quantity.length;i++){
      if(this.quantity[i]==null || this.price[i]==null||this.price[i]==0||this.quantity[i]==0)
      {
        this.tierError=true;
        return;
      }
    }
    this.tierCount.push(this.tierCount.length)
    this.quantity.push(0)
    this.price.push(0)
    console.log(this.tiers)
  }

  discard(){
    this.router.navigateByUrl('vendor/home');
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
    this.tierError=false;
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

    // convert date type
    var start_date_new_format = convertDate(this.start_date)

    // add 7 days to start date to calculate end date
    var end_date_calc = new Date(this.start_date);
    end_date_calc.setDate(end_date_calc.getDate() + 7);
    var end_date_new_format = convertDate(end_date_calc)

    var deal = {
      product: this.product,
      deal_title :this.title,
      deal_description:this.description,
      deal_renew_deal:this.renewDeal,
      deal_start_date:start_date_new_format,
      deal_end_date:end_date_new_format,
      deal_timer:this.timer,
      deal_tiers:this.tiers
    }

    this.responsePending=true;
    console.log(deal)

    this.dealService.createDeal(deal).subscribe(res=>{
      console.log(res);
    })
    
     setTimeout(()=>{                           // <<<---using ()=> syntax
          location.href="vendor/deals"
          this.responsePending = false
      }, 2000);
    

  }
}

function convertDate(somedate: Date) {
  const offset = somedate.getTimezoneOffset()
  somedate = new Date(somedate.getTime() - (offset*60*1000))
  return somedate.toISOString().split('T')[0]
}
