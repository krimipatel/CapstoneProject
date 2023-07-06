import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginVendorService } from 'src/app/services/vendor/loginVendor/login-vendor.service';

@Component({
  selector: 'app-main-nav-vendor',
  templateUrl: './main-nav-vendor.component.html',
  styleUrls: ['./main-nav-vendor.component.css']
})
export class MainNavVendorComponent implements OnInit {

  constructor(private router: Router) { }

  showOptions : boolean = false;

  ngOnInit(): void {
    var url = this.router.url;
    if(url.includes("home")){
      this.active="home"
    }
    else if(url.includes("deals")||url.includes("deal")){
      this.active="deals"
    }
    else if(url.includes("orders")||url.includes("order")||url.includes("cart"))
    {
      this.active="orders"
    }
    else if(url.includes("calculate"))
    {
      this.active="calculator"
    }
  }

  active:string=""

  openOptions(state: boolean) {
    this.showOptions = state;
 }




}
