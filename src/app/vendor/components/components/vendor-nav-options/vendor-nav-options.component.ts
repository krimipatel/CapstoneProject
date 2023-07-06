import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginVendorService } from 'src/app/services/vendor/loginVendor/login-vendor.service';

@Component({
  selector: 'app-vendor-nav-options',
  templateUrl: './vendor-nav-options.component.html',
  styleUrls: ['./vendor-nav-options.component.css']
})
export class VendorNavOptionsComponent implements OnInit {

  constructor(private loginVendor:LoginVendorService,private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.loginVendor.logout().subscribe(res=>{
      console.log(res);
      localStorage.removeItem("vendorToken")
      this.router.navigateByUrl("/vendor/login");

    },(error)=>{
      console.log(error);
      localStorage.removeItem("vendorToken")
      this.router.navigateByUrl("/vendor/login");
    })
  }

  viewProfile(){
    this.router.navigateByUrl("/vendor/profile");
  }

}
