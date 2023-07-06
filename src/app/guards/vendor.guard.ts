import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginVendorService } from '../services/vendor/loginVendor/login-vendor.service';
import { ProductService } from '../services/vendor/Product/product.service';

@Injectable({
  providedIn: 'root'
})
export class VendorGuard implements CanActivate {
  constructor(private router:Router,private Vendor:LoginVendorService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      var token = localStorage.getItem("vendorToken");
      if(token!=null){

       return true

      }else{
        this.router.navigateByUrl('/vendor/login');
        return false;
      }
  }

}
