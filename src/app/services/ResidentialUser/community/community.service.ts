import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';


interface users {
  alias:string;
  user_details_id : number;
  connection_status : boolean;
  profile_photo : string;
}


interface response{
  User_list:users[];
  community_name :String;
  community_address :String;
  community_type:String;

}

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private http:HttpClient,private appComponent : AppComponent) { }

  readonly APIUrl  = this.appComponent.ResidentialAPIUrl;


  getCommunityInfo(){
    return this.http.get<response>(this.APIUrl+"residentialuser/communityprofile/");
  }

}
