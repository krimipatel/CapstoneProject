import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginVendorService } from 'src/app/services/vendor/loginVendor/login-vendor.service';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
  selector: 'app-login-vendor',
  templateUrl: './login-vendor.component.html',
  styleUrls: ['./login-vendor.component.css']
})
export class LoginVendorComponent implements OnInit {

  title:string='login';
  loadingClass: string = "";

  showPassword = 'password';

  showPasswordClicked(){
    if(this.showPassword == 'text'){
      this.showPassword = 'password';
    }else{
      this.showPassword = 'text';
    }

  }

  loginForm = new FormGroup({
    email : new FormControl('',[Validators.email,Validators.required]),
    password : new FormControl('',[Validators.minLength(8),Validators.required])
  });

  loginError:string='';
  successMessage: string = '';
  constructor(private router:Router,private vendorLogin:LoginVendorService) { }


  ngOnInit(): void {

  }

  login(){
    this.loadingClass = "waiting";

    var data = {
      email : this.loginForm.controls.email.value,
      password:this.loginForm.controls.password.value
    }

    this.vendorLogin.login(data).subscribe(res=>{
      localStorage.setItem("vendorToken",res.token);
      this.router.navigateByUrl("/vendor/home")

    },(err)=>{
      if(err.error=="Please check the email provided or register yourself at Naborino"){
        this.loginError="Incorrect Credentials";
        setTimeout(() => {
          this.loginError = '';
        }, 7000);
      }
      else if(err.error=="Please Verify your email."){
        this.successMessage=err.error;
        setTimeout(() => {
          this.successMessage = '';
        }, 7000);
      }
      else if(err.error=="Incorrect Password"){
        this.loginError="Incorrect Credentials";
        setTimeout(() => {
          this.loginError = '';
        }, 7000);
      }

    })
  }

  logoClicked(){
    this.router.navigateByUrl("/");
  }




}
