import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DealsService } from 'src/app/services/vendor/deals/deals.service';

@Component({
  selector: 'app-view-all-deals',
  templateUrl: './view-all-deals.component.html',
  styleUrls: ['./view-all-deals.component.css']
})
export class ViewAllDealsComponent implements OnInit {

  constructor(private router:Router, private dealService:DealsService) { }

  deals : any;
  activeDeals: any;
  expiredDeals: any;
  searchString:string = '';
  loadError : boolean=false;
  dataLoaded:boolean=false;
  selectedDeal:any[]=[];

  ngOnInit(): void {
    this.dealService.getDeals().subscribe(res=>{
      this.activeDeals = res
      this.deals = this.activeDeals;
      this.dataLoaded=true;
      console.log(this.deals)
    },(err)=>{
      console.log(err.error)
      this.loadError = true
    }),
    this.dealService.getExpiredDeals().subscribe(res=>{
      this.expiredDeals = res;
      this.dataLoaded=true;
      console.log(this.expiredDeals)
    },(err)=>{
      console.log(err.error)
      this.loadError = true
    })
  }

  openDeal(id:any){
    this.router.navigateByUrl("/vendor/deal/"+id);
  }

  openSelectedDeals(){
    if(this.selectedDeal.length==0) return;
    for(let i=0;i<this.selectedDeal.length;i++){
      window.open("vendor/deal/"+this.selectedDeal[i]);
    }
  }

  status:string = 'active';

  toggleStatus(status:string){
    this.status = status;
    console.log(this.status)
    if(this.status == 'completed') {
      this.deals = this.expiredDeals
    }
    else {
      this.deals = this.activeDeals
    }
  }

  selectToggle(id:number){
    for(let i=0;i<this.selectedDeal.length;i++){
      if(this.selectedDeal[i]==id){
        this.selectedDeal.splice(i,1);
        console.log(this.selectedDeal);
        return;
      }
    }

    this.selectedDeal.push(id);
    console.log(this.selectedDeal);
  }
}
