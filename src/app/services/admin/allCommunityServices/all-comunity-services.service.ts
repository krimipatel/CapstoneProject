import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';



@Injectable({
  providedIn: 'root'
})
export class AllComunityServicesService {

  constructor(private http:HttpClient, private appComponent : AppComponent) { }

  private readonly apiUrl = this.appComponent.AdminAPIUrl;

  getListCommunities()
  {
    return this.http.get(this.apiUrl+"register/community/");
  }

  getCommunityById(id:any){
    return this.http.get<any>(this.apiUrl+"register/community/"+id+"/");
  }

  getUser(id:any){
    return this.http.get<any>(this.apiUrl+"register/user/"+id+"/");
  }

  getAdminName(){
    return this.http.get<any>(this.apiUrl + "register/adminname");
  }
}
