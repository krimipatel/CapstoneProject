import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DealsService } from 'src/app/services/vendor/deals/deals.service';

@Component({
  selector: 'app-view-deal-vendor',
  templateUrl: './view-deal-vendor.component.html',
  styleUrls: ['./view-deal-vendor.component.css']
})
export class ViewDealVendorComponent implements OnInit {

  constructor(private route : ActivatedRoute,private dealService:DealsService) { }

  dealid:any;
  deal:any;
  product:any;
  loading:boolean=true;
  currentImage:any;
  status:any;
  canEdit :boolean = true;
  expired:boolean =false;
  displayFSA : any;
  X:number = 10;

  private routeSub!: Subscription;
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.dealid = params['dealid'];
      console.log(this.dealid);
    })

    this.dealService.getDealsById(this.dealid).subscribe(res=>{
      console.log(res);
      this.deal=res;
      this.product = this.deal.items.product;
      this.loading=false;

      var date = new Date(new Date().toDateString());
      var startDateString = this.deal.items.deal_start_date.split("-").join("/");
      var startDate = new Date(startDateString);

      var endDateString = this.deal.items.deal_end_date.split("-").join("/");
      var endDate = new Date(endDateString);
      
      if(endDate >= date) {
        this.status = 'active'
      }
      else {
        this.status = 'completed'
      }
      
      if(this.product.delivery_areas.length > 15) {
        this.displayFSA = this.product.delivery_areas.splice(0,15)
      }
      else {
        this.displayFSA = this.product.delivery_areas;
        this.showedAllDelivery = true;
      }

      if(startDate<=date){
        this.canEdit=false
        console.log("canEdit: ", this.canEdit)
      }

      if(date>endDate){
        this.expired = true;
      }

      this.currentImage = this.deal.items.product.images[0].src;

    })




  }

  editDeal(){
    location.href = "vendor/editdeal/"+this.dealid;
  }

  deleteDeal(){
    this.dealService.deleteDeal(this.dealid).subscribe(res=>{
      console.log(res);
      location.href = "vendor/deals";
    })
  }

  showedAllDelivery:boolean=false;

  showAll(){
    this.showedAllDelivery=true;
    this.displayFSA.push( ...this.product.delivery_areas)
  }

  changeImage(index:any){
    this.currentImage = this.product.images[index].src;
  }

  showAllTags(){
    this.X = this.product.tags.length;
  }


}
