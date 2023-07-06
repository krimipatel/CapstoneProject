import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  useOnline:boolean =true;

  constructor(private router:Router) {}

  //-----------API URLS
  RegistrationAPIUrl = environment.Registration;
  SupportAPIUrl = environment.ResidentialUser;
  ResidentialAPIUrl = environment.ResidentialUser;
  AdminAPIUrl=  environment.Admin;
  vendorAPIUrl = environment.Vendor;


  //show navigation bar

  showResidentialUserNavBar : boolean = false;

  ngOnInit(): void {
    var url =location.pathname;
    console.log(url)
    var residentialUserUrls = ["home","communityprofile","contacts","profile","editprofile","changecommunity","communitysurvey","profile","privacy","viewprofile","product","market","deal","cart","checkout","orders","orderconfirmed","order"]
    url =url.substring(1);
    if(residentialUserUrls.includes(url)){
      this.showResidentialUserNavBar = true;
    }
  }




}
