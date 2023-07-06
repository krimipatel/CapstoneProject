import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PasswordChangeService } from 'src/app/services/ResidentialUser/passwordchange/password-change.service';
import { Router, ActivatedRoute } from '@angular/router';


class CustomValidators {
  //function for password match...
  static passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')!.value;
    const password2 = control.get('password2')!.value;

    if ((password === password2) && (password !== null && password2 !== null)) {
      return null;
    } else {
      return { passwordsNotMatching: true };
    }
  }
}

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  // -----------------variables start------------------------
  private id: string="";
  private token: string="";
  passwordForm!: FormGroup;

  password: string = '';
  password2: string = '';
  // -----------------variables end------------------------

  //---Messages
  message:string = '';
  wait:boolean=false;
  //---------------------


  constructor(private passwordChangeService: PasswordChangeService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      'password': new FormControl('', Validators.minLength(8)),
      'password2': new FormControl('', [Validators.required])
    }, {
      validators: CustomValidators.passwordsMatch
    });

    this.activatedRoute.params.subscribe(event => {
      this.token = event.token;
      this.id = event.uid;
     });

  }

  // function when clicked on Reset Password btn.......
  resetPassword() {
    this.wait = true;
    var data = {
      password: this.password,
      id : this.id,
      token:this.token
    }
    console.log(data);
    console.log(this.id);
    console.log(this.token);


    // send data to backend through service's method......
    this.passwordChangeService.sendPassword(data).subscribe(res => {
      if(res){
        this.message="Password is reset. Please wait you will be redirected to login page.";
        setTimeout(() => {
          this.gotSuccess();
        }, 5000);
        this.wait = false;
      }
      this.wait = false;
    },(error)=>{
      this.wait = false;
    });
    this.password='';
    this.password2='';
  }

  gotSuccess(){
    this.router.navigateByUrl('login');
  }

  logoClicked(){
    this.router.navigateByUrl("/");
  }
}
