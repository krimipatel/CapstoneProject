import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminLoginService } from 'src/app/services/admin/login/admin-login.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginForm = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)])
  });

  constructor(private loginService:AdminLoginService,private router : Router) { }

  ngOnInit(): void {
  }

  loginError:string ='';

  Login(){
    var data = {
      email : this.loginForm.controls.email.value,
      password :this.loginForm.controls.password.value
    }

    this.loginService.login(data).subscribe(res=>{
      if(!res){

      }
      else{
        localStorage.setItem("AdminAccess",res.token);
        this.router.navigateByUrl("/admin/home");

      }
    },(error)=>{
      if(error.error=="Incorrect password"){
        this.loginError = "Incorrect Password"
      }
      else if(error.error == "Cannot Login because your email is incorret"){
        this.loginError="This email is not a registered naborino Admin";
      }
    });

  }



}



