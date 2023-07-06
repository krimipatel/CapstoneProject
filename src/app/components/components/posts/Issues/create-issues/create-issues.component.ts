import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/ResidentialUser/posts/posts.service';

@Component({
  selector: 'app-create-issues',
  templateUrl: './create-issues.component.html',
  styleUrls: ['./create-issues.component.css']
})
export class CreateIssuesComponent implements OnInit {

  pageNumber:number=1;

  cateogryDropdown:Boolean=false;
  descriptionDropdown : Boolean =false;

  categories !:string[];
  description !:string[];

  chosenDescriptions : string[] = [];

  issuesForm =  new FormGroup({
    title  : new FormControl(''),
    category : new FormControl('',Validators.required),
    descriptions : new FormControl(''),
    freeText : new FormControl(''),
  })

  characterCount:any = 0;

  constructor(private postService:PostsService) { }

  ngOnInit(): void {
    this.categories = this.postService.issuesSubCategory;
    this.description = this.postService.issuesDescriptionTags;
  }


  categorytoggleDropDownClose(){
    this.cateogryDropdown = false;
  }

  categorytoggleDropDown(){
    this.cateogryDropdown = true;
  }

  descriptiontoggleDropDownClose(){
    this.descriptionDropdown = false;
  }

  descriptiontoggleDropDown(){
    this.descriptionDropdown = true;
  }

  selectCategory(category:any){
    this.issuesForm.controls.category.setValue(category);
  }

  selectedDescriptions(item:any,index:any){
    this.chosenDescriptions.push(item);
    this.description.splice(index,1);
  }
  removeDescriptions(index:any,item:any){
    this.description.push(item);
    this.chosenDescriptions.splice(index,1);
  }

  err:string= "";

  loading :boolean = false;

  createPost(){
    this.loading = true;
    if(this.issuesForm.controls.category.value==""){
      this.err= "Please fill all the require feilds. Required fields are marked with a asterisk "
    }
    else{
      this.err="";
      this.loading=true;

      var data = {
        post_type:"issue",
        title:this.issuesForm.controls.title.value,
        subcategory : this.issuesForm.controls.category.value,
        description_tags : [], //this.chosenDescriptions,
        clarification : this.issuesForm.controls.freeText.value,
      }

      console.log(data);
      this.postService.createIssues(data).subscribe(res=>{
        window.location.reload()
        this.loading=false;
      })

    }
  }



}
