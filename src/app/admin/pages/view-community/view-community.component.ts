import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AllComunityServicesService } from 'src/app/services/admin/allCommunityServices/all-comunity-services.service';


@Component({
  selector: 'app-view-community',
  templateUrl: './view-community.component.html',
  styleUrls: ['./view-community.component.css']
})
export class ViewCommunityComponent implements OnInit {

  private routeSub!: Subscription;
  communityId : any;
  Response:any;
  community:any;
  dataLoaded:boolean = false;
  constructor(private route : ActivatedRoute, private communityService:AllComunityServicesService) { }

  usersActive:Boolean=true;
  postsActive:Boolean=false;
  contactsActive:Boolean=false;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.communityId = params['id'];
    })

    this.communityService.getCommunityById(this.communityId).subscribe(res=>{
      this.Response=res;
      this.community = this.Response[0];
      this.dataLoaded=true;
      console.log(res);
      


    })


  }

  navToggle(comp:any){
    if(comp=="users")
    {
      this.usersActive=true;
      this.postsActive=false;
      this.contactsActive=false;
    }
    else if(comp=="contacts"){
      this.usersActive=false;
      this.postsActive=false;
      this.contactsActive=true;
    }
    else if(comp=="posts"){
      this.usersActive=false;
      this.postsActive=true;
      this.contactsActive=false;
    }
  }

}
