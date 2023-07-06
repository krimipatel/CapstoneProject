import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { event } from '../../../classes/events';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  //================= Variables for News Start=================
  newsSubCategory:string[]=[
    "fire alarm testing",
    "upcoming /status of repairs",
    "closures",
    "newsletter",
    "window washing",
    "other building announcement",
    "mail just delivered",
    "miscellaneous building news"
  ];

  newsRequirementTags:string[]=[
    "tenant action required"
  ];

  newsDescriptionTags:string[]=[
    "ASAP",
    "email from building management",
    "staff post",
    "poster in common area",
    "noise",
    "inconvenience",
    "improvements",
    "seasonal",
    "important"
  ];
    //================= Variables for News End=================


  //================= Variables for Issues Start=================
  issuesSubCategory:string[]=[
    "Issue"
  ];

  issuesDescriptionTags:string[]=[
    "dangerous",
    "slippery",
    "building damage",
    "flooding",
    "overly hot",
    "overly cold",
    "theft",
  ];
    //================= Variables for Issues End=================


  //================= Variables for News Start=================
  eventsSubCategory:string[]=[
    "book/movie club",
    "secret santa",
    "meet & greet",
    "swap meet",
    "trivia night",
    "garage sale",
    "trick or treat",
    "potluck",
    "Class",
    "Service Showcase",
    "Car Pool",
    "Networking",
    "Presentation"
  ];

  eventsRequirementTags:string[]=[
    "RSVP",
    "purchase ticket",
    "plus ones welcome",
    "no plus ones",
    "formal attire",
  ];

  eventsDescriptionTags:string[]=[
    "online",
    "in person, seasonal",
    "kids",
    "parents",
    "fun",
    "serious",
    "educational",
    "sports",
    "hobby",
    "arts",
    "community",
    "meet new people",
    "in the building",
    "local establisment"
  ];
    //================= Variables for News End=================

  constructor(private http : HttpClient,private appComponent:AppComponent) { }
  //private readonly APIUrl = this.appComponent.ResidentialAPIUrl;

  private readonly APIUrl = this.appComponent.ResidentialAPIUrl;

  getPosts(){
    return this.http.get(this.APIUrl+"posts/posts/");
  }

  createEvents(data:any){
    return this.http.post(this.APIUrl+"posts/events/",data);
  }

  createNews(data:any){
    return this.http.post(this.APIUrl+"posts/news/",data);
  }

  createIssues(data:any){
    return this.http.post(this.APIUrl+"posts/issue/",data);
  }

  up_down(data:any){
    return this.http.post<any>(this.APIUrl+"posts/interact/",data);
  }

  rsvp(data:any){
    return this.http.post<any>(this.APIUrl+"posts/rsvp/",data);
  }

  getUserPost(){
    return this.http.get<any>(this.APIUrl+"posts/userposts/");
  }


}
