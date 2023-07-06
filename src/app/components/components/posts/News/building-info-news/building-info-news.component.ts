import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/ResidentialUser/posts/posts.service';

@Component({
  selector: 'app-building-info-news',
  templateUrl: './building-info-news.component.html',
  styleUrls: ['./building-info-news.component.css']
})
export class BuildingInfoNewsComponent implements OnInit {

  pageNumber:number=1;

  cateogryDropdown:Boolean=false;
  requirementDropdown :Boolean  = false;
  descriptionDropdown : Boolean =false;

  categories !: string[];

  requirements !: string[];
  description !: string[];


  chosenRequiremnets : string[] =[] ;
  chosenDescriptions : string[] =[] ;

  newsForm =  new FormGroup({
    title  : new FormControl(''),
    category : new FormControl('',Validators.required),
    newsDate  : new FormControl(''),
    newsTime : new FormControl(''),
    requirements : new FormControl(''),
    descriptions : new FormControl(''),
    freeText : new FormControl(''),
  })


  characterCount:any = 0;

  constructor(private postService:PostsService) { }

  ngOnInit(): void {
    this.categories = this.postService.newsSubCategory;
  this.requirements = this.postService.newsRequirementTags;
  this.description = this.postService.newsDescriptionTags;

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
    this.newsForm.controls.category.setValue(category);
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

  fileToUpload!: File ;

  onFileSelected(event: any){
    this.fileToUpload = event.target.files.item(0);
  }

  loading:boolean=false;

  createPost(){


    if(this.newsForm.controls.category.value==""){
      this.err= "Please fill all the require feilds. Required fields are marked with a asterisk "
    }
    else{

      this.err="";

      this.loading=true;

      var data = {
        title: this.newsForm.controls.title.value,
        category : this.newsForm.controls.category.value,
        date : this.newsForm.controls.newsDate.value,
        time :  this.newsForm.controls.newsTime.value,
        requirementTags : [],  //this.chosenRequiremnets,
        descriptionTags : [], //this.chosenDescriptions,
        clarification : this.newsForm.controls.freeText.value,
      }

      const formData: FormData = new FormData();

      if(this.fileToUpload!=null){
        formData.append('post_type',"news");
        formData.append('title',data.title);
        formData.append('subcategory',data.category);
        formData.append('Date',data.date);
        formData.append('Time',data.time);
        formData.append('requirements_tags',"{"+data.requirementTags.toString()+"}");
        formData.append('description_tags',"{"+data.descriptionTags.toString()+"}");
        formData.append('clarification',data.clarification);
        formData.append('file',this.fileToUpload,this.fileToUpload?.name);

      }
      else{
        formData.append('post_type',"news");
        formData.append('title',data.title);
        formData.append('subcategory',data.category);
        formData.append('Date',data.date);
        formData.append('Time',data.time);
        formData.append('requirements_tags',"{"+data.requirementTags.toString()+"}");
        formData.append('description_tags',"{"+data.descriptionTags.toString()+"}");
        formData.append('clarification',data.clarification);
        formData.append('file',"no");
      }







       this.postService.createNews(formData).subscribe(res=>{
         window.location.reload();
         this.loading=false;
       })



    }
  }


}
