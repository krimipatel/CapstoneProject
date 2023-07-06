import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import {RegistrationService} from '../../../services/ResidentialUser/registration.service'
import { ActivatedRoute, Router } from '@angular/router';



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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title:String='register';
  loadingClass: string = "";

  showPassword1 = 'password';
  showPassword2 = 'password';

  registerForm = new FormGroup({
    'email' : new FormControl('', [ Validators.email,Validators.required]),
    'password':new FormControl('', Validators.minLength(8)),
    'password2':new FormControl('', [Validators.required])
  },{
   validators: CustomValidators.passwordsMatch
  });

  email: string ='';
  password:string='';
  UserId:number=0;

  communityAddress:String='';
  routerObject:any;

  userExist:Boolean=false;
  registrationComplete=false;

  wait =false;

  constructor(private regisService: RegistrationService,private router :Router,private route:ActivatedRoute) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params=>{
      console.log(params.community_address)
      if('community_address' in params){
        localStorage.setItem("registerWithAddress",params.community_address);
      }

    })

    this.userExist=false;
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

  register(){
    this.loadingClass = "waiting";
    this.userExist = false;
    this.wait = false;
    this.registrationComplete = false;
    this.wait=true;

    var data = {
      basic_details_id :  this.UserId,
      email : this.email,
      password : this.password
    }

    this.regisService.registerUser(data).subscribe(res=>{
      this.registrationComplete=true;
      this.userExist=false;
      this.wait=false;
      this.loadingClass = "";
    }, error => {
      if(error.error==='User Already Exists') {
          this.userExist = true;
          this.wait=false;
          this.registerForm.reset();
          this.loadingClass = "";
      }
    });


  }

  logoClicked(){
    this.router.navigateByUrl("/");
  }
}
