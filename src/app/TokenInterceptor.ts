import {Injectable} from '@angular/core';
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{


  intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>
  {
    var token = String(localStorage.getItem("token"));
    var adminToken = String(localStorage.getItem("AdminAccess"));
    var vendorToken = String(localStorage.getItem("vendorToken"));

    if(request.url.includes("admin")||request.url.includes("dukeki3iw0c0y")){
      if(adminToken!=null){
        request = request.clone({
          setHeaders:{
            Authorization: adminToken,
          }
        });

      }
    }
    else if(request.url.includes("vendor")||request.url.includes("d1puuo3cgktmrv")||request.url.includes("9000")){
      if(vendorToken!=null){
        request = request.clone({
          setHeaders:{
            Authorization: vendorToken,
          }
        });
      }
    }
    else{

      if(token!=null){
          request = request.clone({
            setHeaders:{
              Authorization: token,
            }
          });
        }
    }
    return next.handle(request);
  }
}
