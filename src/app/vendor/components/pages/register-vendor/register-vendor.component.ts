import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorRegistrationService } from 'src/app/services/vendor/registration/vendor-registration.service';


class CustomValidators {
  static passwordsMatch (control: AbstractControl): ValidationErrors |null{
    const password = control.get('password')!.value;
    const password2 = control.get('password2')!.value;

    if((password === password2) && (password !== null && password2 !== null)){
      return null;
    } else {
      return {passwordsNotMatching:true};
    }
  }
}




@Component({
  selector: 'app-register-vendor',
  templateUrl: './register-vendor.component.html',
  styleUrls: ['./register-vendor.component.css']
})
export class RegisterVendorComponent implements OnInit {

  title:string='register';
  loadingClass: string = "";

  constructor(private vendorRegisterService : VendorRegistrationService, private router:Router) { }

  showPassword1 :string = 'password'
  showPassword2 :string = 'password'

  VendorRegisterForm = new FormGroup({
    email : new FormControl('', [Validators.email,Validators.required]),
    fname :  new FormControl('',[Validators.required]),
    lname :  new FormControl('',[Validators.required]),
    shopName :  new FormControl('',[Validators.required]),
    address : new FormControl('',[Validators.required]),
    website :  new FormControl(''),
    phone : new FormControl('',[Validators.required,Validators.minLength(10)]),
    password : new FormControl('',[Validators.required,Validators.minLength(8)]),
    password2: new FormControl('',[Validators.required,Validators.minLength(8)])
  },{
    validators: CustomValidators.passwordsMatch
  });

  ngOnInit(): void {
  }

  togglePassword1(){
    if(this.showPassword1 == 'text'){
      this.showPassword1 = 'password';
    }else{
      this.showPassword1 = 'text';
    }
  }

  togglePassword2(){
    if(this.showPassword2 == 'text'){
      this.showPassword2 = 'password';
    }else{
      this.showPassword2 = 'text';
    }
  }

  errorMessage:string='';
  successMessage:string='';

  register(){
    this.loadingClass = "waiting";

    if(this.autoCompleteAddress!=null){
      if(this.autoCompleteAddress.formatted_address == this.VendorRegisterForm.controls.address.value ){

        var data = {
          email : this.VendorRegisterForm.controls.email.value,
          firstname: this.VendorRegisterForm.controls.fname.value,
          lastname:this.VendorRegisterForm.controls.lname.value,
          shopname : this.VendorRegisterForm.controls.shopName.value,
          address : this.VendorRegisterForm.controls.address.value,
          website : this.VendorRegisterForm.controls.website.value,
          phonenumber : this.VendorRegisterForm.controls.phone.value,
          password : this.VendorRegisterForm.controls.password.value,
        }

        console.log(data);


        this.vendorRegisterService.register(data).subscribe(res=>{
          console.log(res);

          this.successMessage = res.message;
          this.loadingClass = "";

        },(err)=>{
          let emailField = document.getElementById("email");
          let shopnameField = document.getElementById("shopName");
          let phoneField = document.getElementById("phone");
          if(err.error=="A user already exists with this email. Please choose a different one."){
            this.errorMessage="email"
            emailField?.focus();
            this.removeMessage();
            this.loadingClass = "";
          }
          else if(err.error=="There exists a shop with the shopname. Please choose a different one."){
            this.errorMessage="shopname";
            shopnameField?.focus();
            this.removeMessage();
            this.loadingClass = "";
          }
          else if(err.error=="Enter a valid phone number"){
            this.errorMessage="phone";
            phoneField?.focus();
            this.removeMessage();
            this.loadingClass = "";
          }
          else{
            this.errorMessage = "Failed. Please try again later";
            this.errorMessage = "error";
            this.removeMessage();
            this.loadingClass = "";
          }

        });


      } else{
        this.addressError="Please select a address from dropdown. Start typing to see dropdown";
        this.removeMessage();
        console.log(this.addressError);
        this.loadingClass = "";
      }
    } else{
      this.addressError="Please select a address from dropdown. Start typing to see dropdown";
      this.removeMessage();
      console.log(this.addressError);
      this.loadingClass = "";
    }


  }

  goBack(){
    this.router.navigateByUrl('');
  }

  supportClicked(){
    this.router.navigateByUrl('/support');
  }

  removeMessage(){
    setTimeout(() => {
      this.errorMessage='';
      this.successMessage = '';
    }, 7000);
  }

  landing(){
    this.router.navigateByUrl('/');
  }

  calculate(){
    this.router.navigateByUrl('vendor/calculate');
  }



  // Address Related

  autoCompleteAddress :any;
  addressError : any;


  options:any = {
    ComponentRestrictions :{
      country:['CA'],
    },
    types:['address']
  };

  public handleAddressChange(address: any) {
    this.VendorRegisterForm.controls.address.setValue(address.formatted_address);
    this.autoCompleteAddress = address;
    this.addressError=null;
 }

}
