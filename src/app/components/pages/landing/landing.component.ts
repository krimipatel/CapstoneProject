import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from 'src/app/services/ResidentialUser/onboarding.service';




@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router:Router, private onboardingService:OnboardingService) { }


  communityAddress:any='';
  add : any ;

  options:any = {
    ComponentRestrictions :{
      country:['CA'],
    },
    types:['address']
  };

  ngOnInit(): void {
  }

  public handleAddressChange(address: any) {
     this.communityAddress=address.formatted_address;
     this.add = address;
  }


  errorMessage:String='';


  findCommunity(){
    if(this.add==null||this.add.formatted_address!=this.communityAddress) {
      this.errorMessage="Please select a Google verified address from the drop down. Start typing your address to see the dropdown";
      setTimeout(() => {
        this.errorMessage="";
      }, 7000);
      return
    }

    this.getCommunityDetails(this.add.formatted_address)

  }


  communityData :any;

  responseMessage :string = '';

  getCommunityDetails(address:any){
    var data:any = {
      address : address
    }

    this.responseMessage = ''
    this.communityData = undefined;

    this.onboardingService.getCommunityDetails(data).subscribe(res =>{
      console.log(res);
      this.communityData = res;
    },(err)=>{
      if(err.error=="Not found"){
        this.responseMessage = "There is no community at this address at the moment. You can be the first person to start a community."
      }
    });

  }

  registerWithSearchedCommunity(){
    console.log(this.add.formatted_address)
    localStorage.setItem("registerWithAddress",this.communityAddress);

    location.href="/register"
  }


  register(){
    this.router.navigateByUrl('/register');
  }

  signUpVendor(){
    this.router.navigateByUrl('/vendor');
  }

}




