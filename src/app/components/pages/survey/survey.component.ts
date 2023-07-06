import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommunitySurveyService } from 'src/app/services/ResidentialUser/communitySurvey/community-survey.service';




interface answers {
  QuestionId : any;
  Answer :any;
}

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {


  answers:answers[] = [];


  comSurveyForm =  new FormGroup({
    iNumber : new FormControl(''),
    iYesNo : new FormControl(''),
  })

  questions:any;

  message: any;


  increment:number=0;

  constructor(private router:Router, private communitySurveyService:CommunitySurveyService) { }

  ngOnInit(): void {
    //this.questions=this.communitySurveyService.getQuestions();

    this.communitySurveyService.getQuestions().subscribe(res=>{
      this.questions = res;
      console.log(this.questions);
    })
  }

  takeinput(id:any){
      let questype;
      console.log(id);
      // gets the input type for the question id
      for(let i=0;i<this.questions.length;i++){
        if(id==this.questions[i].question_id){
          questype = this.questions[i].type;
        }

      }

      console.log(questype);

      let exist = false;
      // gets if the answer exists
      for(let i=0;i<this.answers.length;i++){
        if(this.answers[i].QuestionId == id)
        {

          exist =true;

        }
      }

      //if answer exists change the value
      if(exist==true){


        for(let i=0;i<this.answers.length;i++){
          if(id==this.answers[i].QuestionId)
          {
            if(questype == "yesNo")
            {
              this.answers[i].Answer = this.comSurveyForm.controls.iYesNo.value;
              if (this.comSurveyForm.controls.iYesNo.value!=null) {
                console.log(this.comSurveyForm.controls.iYesNo.value);
                
                this.comSurveyForm.controls.iYesNO.setValue("");
              }
              
            }
            else if(questype == "number"){
              this.answers[i].Answer = this.comSurveyForm.controls.iNumber.value;
              this.comSurveyForm.controls.iNumber.setValue(null);
            }
            console.log(this.answers);
          }
        }
      }
      //if answer does exists get a new value.
      else {

        if(questype=="yesNo"){

          let data:answers = {
            QuestionId : id,
            Answer : this.comSurveyForm.controls.iYesNo.value,
          }

          this.answers.push(data);
          console.log(this.answers);

          this.comSurveyForm.controls.iYesNo.setValue(null);
        }
        else if(questype=="number"){


        let data:answers = {
          QuestionId : id,
          Answer : this.comSurveyForm.controls.iNumber.value,
        }

        this.answers.push(data);
        console.log(this.answers);

          this.comSurveyForm.controls.iNumber.setValue(null);
        }

    }

  }


  displayOutput(id :number){
    let questype;
      for(let i=0;i<this.questions.length;i++){
        if(id==this.questions[i].question_id){
          questype = this.questions[i].type;
        }

      }


    for(let i=0;i<this.answers.length;i++){
      if(id == this.answers[i].QuestionId){
        if(questype=="yesNo") {
          this.comSurveyForm.controls.iYesNo.setValue(this.answers[i].Answer);
        } else if(questype=="number") {
          this.comSurveyForm.controls.iNumber.setValue(this.answers[i].Answer);
        }

      }
    }

  }

  showNextAnswer(id:any)
  {

    let questype;

    // gets the input type for the question id
    for(let i=0;i<this.questions.length;i++){
      if(id==this.questions[i].question_id){
        questype = this.questions[i].type;
      }

    }

    for(let i=0;i<this.answers.length;i++){
      if(this.answers[i].QuestionId == id)
      {
        if(questype=="yesNo"){
          if(this.answers[i].Answer=='yesNo')
          this.comSurveyForm.controls.iYesNO.setValue(this.answers[i].Answer);
        }
        else if(questype == "number"){
          this.comSurveyForm.controls.iNumber.setValue(this.answers[i].Answer);
        }
      }
    }
  }


  increase(id:number){

    if(this.increment<this.questions.length-1){
      this.increment+=1;
      this.takeinput(id);
      this.showNextAnswer(id+1);
    }
  }


  decrease(id :number){


    if(this.increment<this.questions.length && this.increment>0){
      this.increment-=1;
      this.displayOutput(id);
    }
  }

  submitSurvey(id:number){
    this.takeinput(id);

    let noAnswers=0;
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i].Answer==null || this.answers[i].Answer=="") {
        noAnswers=noAnswers+1;
      }
    }

    if (noAnswers==this.answers.length) {
      this.message = "All answers are empty";
      
      return;
    }

    var data = {
      Answers : this.answers
    }

    console.log(data)
    this.communitySurveyService.submitAnswers(data).subscribe(res=>{
      if(res=="You have already answered the survey")
      {
        this.message = "You have already answered the community surveys."
      }
      else{
        this.router.navigateByUrl('communityprofile');
      }
    });

  }

  close(){
    this.router.navigateByUrl('communityprofile');
  }

}
