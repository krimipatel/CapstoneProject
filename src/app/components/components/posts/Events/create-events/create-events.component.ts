import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/ResidentialUser/posts/posts.service';

@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.css']
})
export class CreateEventsComponent implements OnInit {

  pageNumber:number=1;

  cateogryDropdown:Boolean=false;
  requirementDropdown :Boolean  = false;
  descriptionDropdown : Boolean =false;

  categories !: string[];

  requirements !: string[];
  description  !: string[];
  chosenRequiremnets : string[] =[] ;
  chosenDescriptions : string[] =[] ;

  eventsForm =  new FormGroup({
    title  : new FormControl(''),
    category : new FormControl(''),
    eventsDate  : new FormControl(''),
    eventsTime : new FormControl(''),
    requirements : new FormControl(''),
    descriptions : new FormControl(''),
    freeText : new FormControl(''),
    address : new FormControl(''),
    min :  new FormControl(''),
    max : new FormControl(''),
  })


  characterCount:any = 0;

  constructor(private postService:PostsService) { }

  ngOnInit(): void {
    this.categories = this.postService.eventsSubCategory;
    this.requirements = this.postService.eventsRequirementTags;
    this.description = this.postService.eventsDescriptionTags;

  }



  categorytoggleDropDownClose(){
    this.cateogryDropdown = false;
  }

  categorytoggleDropDown(){
    this.cateogryDropdown = true;
  }

  requirementtoggleDropDownClose(){
    this.requirementDropdown = false;
  }

  requirementtoggleDropDown(){
    this.requirementDropdown = true;
  }

  descriptiontoggleDropDownClose(){
    this.descriptionDropdown = false;
  }

  descriptiontoggleDropDown(){
    this.descriptionDropdown = true;
  }


  selectCategory(category:any){
    this.eventsForm.controls.category.setValue(category);
  }

  selectRequirements(item:any,index:any){
    this.chosenRequiremnets.push(item);
    this.requirements.splice(index,1);
  }

  removeRequirements(index:any,item:any){
    this.requirements.push(item);
    this.chosenRequiremnets.splice(index,1);
  }

  selectedDescriptions(item:any,index:any){
    this.chosenDescriptions.push(item);
    this.description.splice(index,1);
  }
  removeDescriptions(index:any,item:any){
    this.description.push(item);
    this.chosenDescriptions.splice(index,1);
  }

  nextPage(){
      if (this.pageNumber<3) {
        this.pageNumber = this.pageNumber + 1;
      }
  }

  //this method for going to previous page will work for every posts type...
  prePage(){
      if (this.pageNumber>=2) {
        this.pageNumber = this.pageNumber - 1;
      }
  }

  err:string= "";
  loading=false;

  createPost(){
    if(this.eventsForm.controls.category.value==""
    ||this.eventsForm.controls.eventsDate.value==""
    ||this.eventsForm.controls.eventsTime.value==""
    ||this.eventsForm.controls.address.value==""
    ||this.eventsForm.controls.title.value==""){
      this.err= "Please fill all the require feilds. Required fields are marked with a asterisk "
    }
    else{

      this.err="";
      this.loading=true;

      var data = {
        post_type:"event",
        title : this.eventsForm.controls.title.value,
        subcategory : this.eventsForm.controls.category.value,
        Date :this.eventsForm.controls.eventsDate.value,
        Time :this.eventsForm.controls.eventsTime.value,
        requirements_tags : [], //this.chosenRequiremnets,
        description_tags : [], // this.chosenDescriptions,
        clarification : this.eventsForm.controls.freeText.value,
        address:this.eventsForm.controls.address.value,
        min_people : 0, //this.eventsForm.controls.min.value,
        max_people : 0, // this.eventsForm.controls.max.value,
        website : ""
      }

     this.postService.createEvents(data).subscribe(res=>{

        window.location.reload()
        this.loading=false;
     })

    }
  }

}
