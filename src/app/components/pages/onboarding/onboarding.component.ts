import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/ResidentialUser/login.service';
import { OnboardingService } from 'src/app/services/ResidentialUser/onboarding.service';



@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {

  addressForm = new FormGroup({
    address : new FormControl(''),
    liveOnSheppard: new FormControl('', Validators.required),
    postalCode:new FormControl(''),
    communityName:new FormControl('', [Validators.required]),
    communityType:new FormControl('', [Validators.required])
  });

  detailsForm = new FormGroup({
    FName : new FormControl('', [ Validators.required]),
    LName : new FormControl('', [ Validators.required]),
    Alias  : new FormControl('',[Validators.minLength(2)]),
    shippingAddress: new FormControl(''),
    unit:new FormControl(''),
    phone:new FormControl('',[Validators.minLength(10)])
  });


  address:any='760 Sheppard Ave W, North York, ON M3H 0B3, Canada';
  postalCode:String='M3H 0B3';
  liveOnSheppard:String='';
  communityName:String='';
  communityType:String='';

  comType:String = 'Residential Building'

  pageNumber:Number=1;
  isReadOnly:Boolean=false;
  naborinoUsers!:number;

  FName:any;
  LName:any;
  unit:Number=0;
  phone:String='';
  isOwner:Boolean=false;
  shippingAddress:any;

  isInvited:Boolean = false;

  communityData:any;

  options:any = {
    ComponentRestrictions :{
      country:['CA'],
    }
  };

  addressError:any=null;
  autoCompleteAddress:any;

  resSuccess : any;

  communityTypeList:any = [
    {id:1, name:'College'},
    {id:2, name:'Religious'},
    {id:3, name:'Residential Building'},
    {id:4, name:'Townhouse Complex'},
    {id:5, name:'Corporate Building'},
    {id:6, name:'Other'}
  ]

  communityAddress:any = [
    {id:1, value:'760 Sheppard Ave W, North York, ON M3H 0B3, Canada'}
  ]

  constructor(private onboardingService: OnboardingService,private router:Router) {
  }

  testUser!:boolean;

  ngOnInit(): void {



    if(localStorage.getItem("first_name")!=null){
      this.FName = localStorage.getItem("first_name");
      this.LName = localStorage.getItem("last_name");
    }

    if (localStorage.getItem('registerWithAddress') && localStorage.getItem('registerWithAddress')!='') {
      this.address = localStorage.getItem('registerWithAddress');
      this.autoCompleteAddress=this.address;
      console.log(this.autoCompleteAddress);
      this.postalCode = this.address.split(',')[2].split(' ')[2] +' '+  this.address.split(',')[2].split(' ')[3];
      this.addressError=null;
      var data = {
        address:this.address
      }
      this.GetCommunityInfo(data);
      this.isInvited = true;
      this.testUser = false
    }
  }

  goToAddressForm(){
    this.autoCompleteAddress=null;
  }

  // toggleTestUser(){
  //   this.testUser=!this.testUser;
  //   if(this.testUser==true){
  //     this.unit =  Math.floor(Math.random() * 1001) - 1000
  //     this.detailsForm.controls.unit.setValue(this.unit);
  //   }else{
  //     this.unit = 0;
  //     this.detailsForm.controls.unit.setValue(this.unit);
  //   }
  //   console.log(this.unit)

  // }

  saveCommunity(){

    if(this.autoCompleteAddress!=null || this.isInvited)
    {
        //if(this.autoCompleteAddress.formatted_address==this.address || this.isInvited){
        if(this.autoCompleteAddress==this.address || this.isInvited){
          this.communityData = {
          address : this.address,
          postal_code : this.postalCode,
          community_name :this.communityName,
          //change below to variable community_type when needed/.
          community_type: "Residential Building"
        }

        console.log(this.communityData)

        this.onboardingService.communityDetails(this.communityData).subscribe(res =>{
          console.log(res);
          this.saveDetails();
        },err=>{
          console.log(err.error.message)
          if(err.error.message == "user details already present")
          {
            this.saveDetails();
          }
        });
      }
      else{
        this.addressError="Please select a address from dropdown. Start typing to see dropdown";
      }
    }
    else{
      this.addressError="Please select a address from dropdown. Start typing to see dropdown";
    }
  }

  error:string='';


/*
  public handleAddressChange(address: any) {
    this.address=address.formatted_address;
    this.autoCompleteAddress=address;
    this.postalCode = this.address.split(',')[2].split(' ')[2] +' '+  this.address.split(',')[2].split(' ')[3];
    this.addressError=null;
  }
*/
/*
  public handleAddressChange(selectedValue: any) {
    if(selectedValue != '') {
      this.address=selectedValue;
      this.autoCompleteAddress=selectedValue;
      this.postalCode = this.address.split(',')[2].split(' ')[2] +' '+  this.address.split(',')[2].split(' ')[3];
      this.addressError=null;
    }
  }

  
  public onLiveOnSheppardChange() {
    if (this.liveOnSheppard === 'Yes') {
      this.address = '760 Sheppard Ave W, North York, ON M3H 0B3, Canada';
      this.postalCode = 'M3H 0B3'
    }
    else{
      console.log("hello")
    }
  }
  */

  nextCard(pageNum:number){
    this.pageNumber=pageNum;
  }

  GetCommunityInfo(data:any){
    var data2:any;

    this.onboardingService.getCommunityDetails(data).subscribe(res =>{
      console.log(res);
      data2 = res
      this.addressForm.controls.communityName.setValue(data2.community_name);
      this.communityName=data2.community_name;

      this.addressForm.controls.communityType.setValue(data2.community_types);
      this.communityType = data2.community_types;

      this.naborinoUsers = data2.community_residents;
      this.isReadOnly=true;
      this.pageNumber=2;
    }, (error)=>{
      this.addressForm.controls.communityName.setValue("");
      this.communityName="";
      this.addressForm.controls.communityType.setValue("");
      this.communityType ="";
      this.naborinoUsers=0;
      this.isReadOnly=false;
      this.pageNumber=2;
    });
  }

  /*
  getCommunityStrictAddressCheck(){
    if(this.autoCompleteAddress!=null)
    {
        //if(this.autoCompleteAddress.formatted_address==this.address){
        if(this.autoCompleteAddress==this.address){
          var data:any = {
          address : this.address
        }

        this.GetCommunityInfo(data);
      }
      else{
        this.addressError="Please select a address from dropdown. Start typing to see dropdown";
      }
    }
    else{
      this.addressError="Please select a address from dropdown. Start typing to see dropdown";
    }
  }
*/
  getCommunityStrictAddressCheck() {
    
    if(this.liveOnSheppard!='') 
    {
      this.autoCompleteAddress=this.address;
      var data:any = {
        address : this.address
      }

      this.GetCommunityInfo(data);
    }
    else{
      this.addressError="Please select 'Yes' or 'No' to indicate whether you live in our pilot building at 760 Sheppard Ave W.";
    }
  }

  saveDetails(){

    if(this.detailsForm.controls.Alias.value==''){
      this.detailsForm.controls.Alias.setValue(this.FName);
    }
    // for test users add (Guest) and set unit number as 0
    var changedAlias = this.detailsForm.controls.Alias.value
    var changeUnit = this.unit;
    if (this.liveOnSheppard == 'No') {
      changedAlias = this.detailsForm.controls.Alias.value + "(Guest)"
      changeUnit = 0
    }
    else {
      this.shippingAddress = '760 Sheppard Ave W, North York, ON M3H 0B3, Canada'
    }

    var userData = {
      FName : this.FName,
      LName : this.LName,
      alias : changedAlias,
      shippingAddress: this.shippingAddress,
      unit : changeUnit,
      phone : this.phone,
      isOwner: null
    }
    
    console.log(userData);

    this.onboardingService.personalDetails(userData).subscribe(res=>{
      console.log(res.success);
      localStorage.setItem("first_time","false");
      localStorage.removeItem('registerWithAddress');
      this.router.navigateByUrl('/market')
    },(error)=>{
      console.log(error.error)
      this.error = error.error;
      this.gotError();
    });
  }



  gotError(){
    setTimeout(() => {
      this.error=""
    }, 5000);
  }
}

