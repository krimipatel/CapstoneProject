import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class CommunitySurveyService {

  constructor(private http : HttpClient,private appComponent:AppComponent) { }

  private readonly APIUrl = this.appComponent.ResidentialAPIUrl;

  getQuestions(){
    return this.http.get(this.APIUrl+"community-survey/retrieve/");
  }

  submitAnswers(data:any){
    return this.http.post(this.APIUrl+"community-survey/collect/",data);
  }
}
