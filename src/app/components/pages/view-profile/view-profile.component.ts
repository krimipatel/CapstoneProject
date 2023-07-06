import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityService } from 'src/app/services/ResidentialUser/community/community.service';
import { KnockService } from 'src/app/services/ResidentialUser/knock/knock.service';
import { ViewProfileService } from 'src/app/services/ResidentialUser/viewProfile/view-profile.service';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  routerObject:any;
  UserId!:Number ;
  user :any;
  profilePhoto :any  ;
  dataLoaded:boolean=false;

  users!:any[];

  constructor(private router:ActivatedRoute,private viewProfileService:ViewProfileService,private knockService :KnockService,private communityService: CommunityService) {}

  ngOnInit(): void {
    this.router.params.subscribe(async (params) => {
      this.UserId = await params['id'];
      var data ={
        basic_details_id:Number(this.UserId),
      }
      this.viewProfileService.getProfile(data).subscribe(res=>{
        this.user = res;
        this.profilePhoto = this.user.profile_photo;
        this.dataLoaded=true;
      });

      this.communityService.getCommunityInfo().subscribe(res=>{
        if(res){
          this.users = res.User_list;
          for(let i=0;i<this.users.length;i++){
            if(this.users[i].basic_details_id==this.UserId){
              this.users.splice(i,1);
            }
          }
          this.users = this.users.splice(0,8)
        }
      })
    })
  }

  message : any;
  sendKnock(user: any) {
    var data = {
      basic_details_id: user.basic_details_id
    }

    this.knockService.sendKnock(data).subscribe(res => {
      console.log(res);
      if (res == "Request already sent. Please wait for response.") {
        this.message = res;
        this.showToast = true;
      }
      else {
        this.message = "Knock sent to user " + user.alias;
        this.showToast = true;
      }
    }, (err) => {
      if (err.error = "Already connected") {
        this.message = err.error;
        this.showToast = true;

      }
    });
  }

  sendKnockCurrentUser() {
    var data = {
      basic_details_id: this.UserId
    }

    this.knockService.sendKnock(data).subscribe(res => {
      console.log(res);
      if (res == "Request already sent. Please wait for response.") {
        this.message = res;
        this.showToast = true;
      }
      else {
        this.message = "Knock sent to user " + this.user.alias;
        this.showToast = true;
      }
    }, (err) => {
      if (err.error = "Already connected") {
        this.message = err.error;
        this.showToast = true;

      }
    });
  }

  viewProfile(user: any) {
    location.href = "/viewprofile/" + user.basic_details_id ;
  }



  //-- Toast

  showToast : boolean = false;

  closeToast()
  {
    this.showToast=false;
  }


  //------

  back(){
    location.href = "/communityprofile"
  }

  showWarning:boolean=false;

  cancel()
  {
    this.showWarning=false;
  }

  showWarningPop(){
    this.showWarning=true;
  }


  deleteConnection(){
    var data = {
      basic_details_id : this.UserId
    }

    this.knockService.deleteconnection(data).subscribe(res=>{
      console.log(res);
      if(res=="Successfully removed connection")
      {
        location.href = "communityprofile"
      }
    })

  }




}
