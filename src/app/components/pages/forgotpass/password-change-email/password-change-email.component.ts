import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PassChangeEmailService } from 'src/app/services/ResidentialUser/passwordchange/pass-change-email.service';


@Component({
  selector: 'app-password-change-email',
  templateUrl: './password-change-email.component.html',
  styleUrls: ['./password-change-email.component.css']
})
export class PasswordChangeEmailComponent implements OnInit {

  // -----------------variables start------------------------
  sendEmailForm!: FormGroup;
  email: string = '';

  userExist: boolean = false;
  wait:boolean=false;

  message:string='';

  constructor(private passwordChangeEmailService: PassChangeEmailService, private router:Router) { }

  ngOnInit(): void {
    this.sendEmailForm = new FormGroup({
      'email': new FormControl('', [Validators.email, Validators.required])
    });
  }

  // function when clicked on send email btn.......
  sendEmail() {
    this.wait = true;
    var data = {
      email: this.email
    }
    //console.log("data sent to service: " + data.email);

    // send data to backend through service's method......
    this.passwordChangeEmailService.sendEmail(data).subscribe(res => {
      if(res){
        this.message = "Check email to reset the password"
      }
      this.wait = false;
    },(error)=>{
      this.wait = false;
    });



  }

  logoClicked(){
    this.router.navigateByUrl('/');
  }
}
