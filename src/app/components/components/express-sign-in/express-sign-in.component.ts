import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService  } from 'angularx-social-login';
import {SocialUser, GoogleLoginProvider,FacebookLoginProvider} from 'angularx-social-login';
import { LoginService } from 'src/app/services/ResidentialUser/login.service';

@Component({
  selector: 'app-express-sign-in',
  templateUrl: './express-sign-in.component.html',
  styleUrls: ['./express-sign-in.component.css']
})
export class ExpressSignINComponent implements OnInit {

  constructor(private authService:SocialAuthService,private loginService :LoginService,private router:Router) { }

  ngOnInit(): void {

    if(this.user !== null) {
      this.authService.signOut();
    }

    this.authService.authState.subscribe((user)=>{
      this.user = user;
      localStorage.setItem("first_name",user.name.split(' ')[0]);
      localStorage.setItem("last_name",user.name.split(' ')[1]);
      localStorage.setItem("email",user.email);
      var data = {
        email : user.email
      }
      this.loginService.socialLoginIn(data).subscribe(res=>{

        localStorage.setItem("token",res.token);
            localStorage.setItem("first_time",res.first_time);

            var first_time = localStorage.getItem("first_time");

            this.authService.signOut();

            if(first_time=="true")
            {
              this.router.navigateByUrl('onboarding');
            }
            else if(first_time=="false")
            {
              localStorage.removeItem("first_name");
              localStorage.removeItem("last_name");
              localStorage.removeItem("email");
              this.router.navigateByUrl('home');
            }
      });


    })

  }



  //----------- Express Sign In --------
  user: SocialUser = new SocialUser;


  googleSignIn() : any{

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  facebookSignIn(){
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}
