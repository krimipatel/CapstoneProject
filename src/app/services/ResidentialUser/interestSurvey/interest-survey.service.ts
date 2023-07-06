import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class InterestSurveyService {



  global:string[]=[
    "Computer",
    "Handmade",
    "Apps & Games",
    "Home & Kitchen",
    "Pet Supplies",
    "Pets",
    "Video Games",
    "Musical Instruments",
    "Luggage & Travel Gear",
    "Office Products",
    "Sports & Outdoors",
    "Arts, Crafts, & Sewing",
    "Toys & Games",
    "Garden & Outdoor",
    "Automotive Parts",
    "Collectibles & Fine Art"
  ]

  list:string[]=[
    "Painting",
    "Gaming",
    "Yoga",
    "Hunting",
    "Bikes",
    "Football",
    "Fashion",
    "Books",
    "Electronics"
  ]

  selectedList:string[]=[]

  constructor(private http:HttpClient,private appComponent:AppComponent) { }

  private readonly APIUrl = this.appComponent.ResidentialAPIUrl;


  getList(){
    return this.list;
  }

  getSelectedList(){
    return this.selectedList;
  }

  getGlobalList(){
    return this.global;
  }

  postInterest(data:any){

    console.log(data);
    return this.http.post(this.APIUrl+"user_responses/collect/",data);
  }

}
