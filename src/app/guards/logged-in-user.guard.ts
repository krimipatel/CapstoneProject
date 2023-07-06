import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserGuard implements CanActivate {
  constructor (private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {

      var token = localStorage.getItem("token");
      
      if(token!=null){
        this.router.navigateByUrl('/market');
        return false;
      }else{
        return true;
      }
  }
}