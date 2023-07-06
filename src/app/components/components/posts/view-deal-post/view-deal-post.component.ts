import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-deal-post',
  templateUrl: './view-deal-post.component.html',
  styleUrls: ['./view-deal-post.component.css']
})
export class ViewDealPostComponent implements OnInit {

  constructor() { }

  @Input() post:any;
  profilePicture : any;

  ngOnInit(): void {
    var cacheImage = sessionStorage.getItem("cacheImage"); 
  
    if(cacheImage){
      this.profilePicture = cacheImage
    }

  }

  

  round(number:number){
    return parseFloat(number.toString()).toFixed(2);;
  }

  viewDeal(id:string){
    location.href = 'market/deal/'+id
  }

  viewOrder(){
    location.href = 'orders/'
  }

  viewOtherDeals(){
    location.href = 'market/'
  }

}

