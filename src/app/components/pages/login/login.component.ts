import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as bcrypt from 'bcryptjs';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from 'src/app/services/ResidentialUser/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup;
  title:string='login';
  loginError:string='';
  loadingClass: string = "";

  showPassword = 'password';

  constructor(private loginService: LoginService,private router:Router, private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.email,Validators.required]),
      password : new FormControl('',[Validators.minLength(8),Validators.required])
    });
  }


  showPasswordClicked(){
    if(this.showPassword == 'text'){
      this.showPassword = 'password';
    }else{
      this.showPassword = 'text';
    }
  }

  login(){
    this.loadingClass = "waiting";
    var data = {
      email : this.loginForm.controls.email.value,
      password:this.loginForm.controls.password.value
    }

    this.loginService.loginUser(data).subscribe((res)=>{
      if(!res){
        console.log("try again later")
      }
      else{
        localStorage.setItem("token",res.token);
        localStorage.setItem("first_time",res.first_time);

        var first_time = localStorage.getItem("first_time");

        // Extract the returnUrl state from the Router service
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

        if(first_time=="true")
        {
          console.log("first_time");
          this.router.navigateByUrl('onboarding');
        }
        else if(first_time=="false")
        {
          if (returnUrl) {
            // Navigate back to the previous page or the home page if no stored URL path is found
            this.router.navigateByUrl(returnUrl);
          } else {
            this.router.navigateByUrl('/market');
          }
        }
      }
    },(error)=>{
      console.log(error.error);
      if(error.error=="Incorrect password"){
        this.loginError = "Incorrect Password"
        this.gotError();
      }
      else if(error.error== "Cannot Login because your email is incorrect"){
        this.loginError = "User does not exist"
        this.gotError();

      }
      else if(error.error =="Please Verify your email address to login"){
        this.loginError = "Please Verify your email address to login"
        this.gotError();

      }
      else if(error.error == "not registered"){
        this.loginError="Email not registered. Please Register on Naborino";
        this.gotError();

      }
    });

  }

  gotError(){
    this.loginForm.reset();
    setTimeout(() => {
      this.loginError=""
    }, 5000);
  }

  logoClicked(){
    this.router.navigateByUrl("/");
  }
}
