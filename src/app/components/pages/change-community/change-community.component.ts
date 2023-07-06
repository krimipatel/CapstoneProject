import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeAddressService } from 'src/app/services/ResidentialUser/change-address/change-address.service';

@Component({
  selector: 'app-change-community',
  templateUrl: './change-community.component.html',
  styleUrls: ['./change-community.component.css']
})
export class ChangeCommunityComponent implements OnInit {



// Form Group for change address
  addressChangeForm = new FormGroup({
    currentAddress :  new FormControl('',Validators.required),
    newAddress :  new FormControl('',Validators.required)
  });


  //Variables for google autocomplete address
    acCurrentAddress :any;
    acNewAddress : any;

  //Error Strings

    currentAddressError : string = '';
    newAddressError : string ='';
    error : string = '';


  //general variables
  options:any = {
    ComponentRestrictions :{
      country:['CA'],
    }
  };

  constructor(private router:Router, private changeAddressService : ChangeAddressService) { }

  ngOnInit(): void {
  }




  public handlecurrentAddressChange(address: any) {
    this.acCurrentAddress = address;
    this.addressChangeForm.controls.currentAddress.setValue(this.acCurrentAddress.formatted_address);


    this.currentAddressError='';

  }

  public handlenewAddressChange(address: any) {
    this.acNewAddress = address;
    this.addressChangeForm.controls.newAddress.setValue(this.acNewAddress.formatted_address);

    this.newAddressError='';


  }

  goBack(){
    this.router.navigateByUrl('/profile')
  }

  changeAddress(){

    if(this.acCurrentAddress!=null && this.acNewAddress!=null)
    {
      if(this.addressChangeForm.controls.currentAddress.value == this.acCurrentAddress.formatted_address){
        if(this.addressChangeForm.controls.newAddress.value == this.acNewAddress.formatted_address)
        {
          //create json format data and call service after checking address validity
          var data = {
            old_address : this.addressChangeForm.controls.currentAddress.value,
            new_address : this.addressChangeForm.controls.newAddress.value,
            postal :  this.addressChangeForm.controls.newAddress.value.split(',')[2].split(' ')[2] +' '+   this.addressChangeForm.controls.newAddress.value.split(',')[2].split(' ')[3]
          }
          this.changeAddressService.changeAddress(data).subscribe(res=>{
            console.log(res);
            if(res=="Current address is wrong"){
              this.error = "The Currrent Address you entered is wrong";
            }
            else if(res=="user does not exist"){
              this.error = "The user is not Authenticated";
            }
            else if(res=="Address updated")
            {
              this.router.navigateByUrl('profile');
            }
          });


        }
        else{
          this.newAddressError = "Please select a address from dropdown. Start typing to see the dropdown"
          console.log(this.newAddressError);
        }
      }
      else{
        this.currentAddressError = "Please select a address from dropdown. Start typing to see the dropdown"
        console.log(this.currentAddressError);
      }


    }

  }

}
