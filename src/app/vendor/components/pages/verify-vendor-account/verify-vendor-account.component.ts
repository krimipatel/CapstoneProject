import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/ResidentialUser/login.service';
import { VendorRegistrationService } from 'src/app/services/vendor/registration/vendor-registration.service';

@Component({
  selector: 'app-verify-vendor-account',
  templateUrl: './verify-vendor-account.component.html',
  styleUrls: ['./verify-vendor-account.component.css']
})
export class VerifyVendorAccountComponent implements OnInit {

  constructor(private route : ActivatedRoute,private vendorRegistrationService:VendorRegistrationService) { }
  private routeSub!: Subscription;

  loading:boolean=true;
  url:any;
  code:any;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.url = params['url'];
      this.code = params['code']
    })

    var data = {
      url : this.url,
      code :this.code,
    }

    this.vendorRegistrationService.activate(data).subscribe(res=>{
      console.log(res);
      if(res){
        this.loading = false;
        location.href = "/vendor/login"
      }
    })

  }

}
