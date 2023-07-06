import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllComunityServicesService } from 'src/app/services/admin/allCommunityServices/all-comunity-services.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  p:number =1;

  search:any="";
  searchCommunity:any="";

  searchFound:number=0;
  communities:any;
  dataLoaded:boolean=false;
  constructor(private router : Router, private communityService:AllComunityServicesService) { }

  ngOnInit(): void {
    this.communityService.getListCommunities().subscribe(res=>{
      console.log(res);
      
      this.communities = res;
      this.dataLoaded=true
    })



  }

  searchIt(){

    this.searchCommunity = this.search;
    this.p=1;
  }

  onValueChange(){

    if(this.search==""){
      this.searchCommunity = this.search;
    }
    if (this.search.lengt>5) {
      this.searchCommunity = this.search;
    }
  }


  openCommunity(id:any)
  {
    this.router.navigateByUrl("admin/community/"+id);
  }

}
