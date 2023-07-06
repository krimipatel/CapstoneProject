import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      var token = localStorage.getItem("token");
      var first_time = localStorage.getItem("first_time");
      
      if(token!=null){

        if(first_time=="true"){
          return true;
        }else{
          this.router.navigateByUrl('/communityprofile');
          return false;
        }

      }else{
        this.router.navigateByUrl('/login');
        return false;
      }
  }
  
}
