import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInVendorGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      var token = localStorage.getItem("vendorToken");
      if(token!=null){
        this.router.navigateByUrl('/vendor/home');
        return false;
      }else{
        return true;
      }
    
  }
  
}
