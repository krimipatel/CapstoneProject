import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VendorRegistrationService } from 'src/app/services/vendor/registration/vendor-registration.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  message:string = '';

  emailForm = new FormGroup({
    email : new FormControl('',[Validators.email,Validators.required])
  })

  constructor(private vendorRegistration:VendorRegistrationService) { }

  ngOnInit(): void {
  }

  status : string = 'normal'

  sendEmail(){
    this.message = "Please wait ... ";
    this.status = "normal"
    var data = {
      email : this.emailForm.controls.email.value
    }
    this.vendorRegistration.forgotPassword(data).subscribe(res=>{
      console.log(res)
      this.status = 'success'
      this.message = 'Email with password reset link and instruction sent to your email.'
    },(err)=>{
      this.message = "Unable to send reset password email. Make sure you entered correct email address."
      this.status = 'error'
    })
  }

}
