import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VendorRegistrationService } from 'src/app/services/vendor/registration/vendor-registration.service';

class CustomValidators {
  //function for password match...
  static passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')!.value;
    const confirmPassword = control.get('confirmPassword')!.value;

    if ((password === confirmPassword) && (password !== null && confirmPassword !== null)) {
      return null;
    } else {
      return { passwordsNotMatching: true };
    }
  }
}



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor( private activatedRoute: ActivatedRoute, private vendorRegistrationService: VendorRegistrationService) { }

  passwordForm = new FormGroup({
    password : new FormControl('',[Validators.required,Validators.minLength(8)]),
    confirmPassword : new FormControl('',[Validators.required,Validators.minLength(8)])
  },{
    validators:CustomValidators.passwordsMatch
  });

  uid!:string;
  token!:string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(event => {
      this.token = event.token;
      this.uid = event.uid;
      console.log(this.uid,this.token)
    });

  }

  status:string='normal';
  message:string='';

  reset(){
    var data = {
      password : this.passwordForm.controls.password.value,
    }
    this.status='normal';
    this.message = 'Please wait ... '
    this.vendorRegistrationService.resetPassword(data,this.uid,this.token).subscribe(res=>{
      console.log(res)
      this.status='success';
      this.message = ' Password has been reset. Continue to login to access your account. '
      location.href="vendor/login"
    },(err)=>{
      console.log(err)
      this.message = 'Something went wrong. Try again later.'
      this.status = 'error'
    })
  }

}
