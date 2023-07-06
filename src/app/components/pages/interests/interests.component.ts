import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InterestSurveyService } from 'src/app/services/ResidentialUser/interestSurvey/interest-survey.service';


@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {

  globalList:string[]=[]

  list:string[]=[]

  selected:string[] = [];

  showDropDown:boolean=false;

  selectedItem: any; //to fiter the dropdownList

  constructor(private router:Router, private interestService:InterestSurveyService) { }

  ngOnInit(): void {
    this.list = this.interestService.getList();
    this.globalList = this.interestService.getGlobalList();
    this.selected = this.interestService.getSelectedList();
  }


  //when clicked on perticular interest
  onCheck(interest:string) {
    //if the interest is not selected
    if (!this.selected.includes(interest)) {
      this.selected.push(interest);
    } else {
      //if the interest is selected => through it out
      var index = this.selected.indexOf(interest);
      if (index > -1) {
        this.selected.splice(index, 1);
      }
    }
    console.log(this.selected);
  }

  //when input is clicked
  toggleDropDown(){
    this.showDropDown=!this.showDropDown;
  }

  //when dropdown is already open and click outside
  toggleDropDownOut(){
    if(this.showDropDown==true){
      this.toggleDropDown();
    }
  }

  //item clicked from dropdown...
  itemClicked(item:string){
    if (!this.list.includes(item)) {
      this.list.push(item);
    }else{
      console.log("this item is already in the below list...");
    }
  }

  close(){
    this.router.navigateByUrl('profile');
  }



  submit(){
    var data = {
      Interests : this.selected
    }
    this.interestService.postInterest(data).subscribe(res=>{
      console.log(res);
      if(res){
        this.router.navigateByUrl('profile');

      }

    });


  }



}
