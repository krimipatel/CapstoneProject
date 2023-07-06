import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfilephotoService } from 'src/app/services/ResidentialUser/profile/profilephoto.service';

@Component({
  selector: 'app-profile-picture-change',
  templateUrl: './profile-picture-change.component.html',
  styleUrls: ['./profile-picture-change.component.css']
})
export class ProfilePictureChangeComponent implements OnInit {

  constructor(private profilepicture : ProfilephotoService,private formBuilder:FormBuilder) { }

  uploadForm! : FormGroup;

  Image: any;

  imageUploaded = false;

  imageCache:any;

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });

    this.profilepicture.getProfile().subscribe(res=>{
      this.Image = res + "?" + new Date().getTime().toString();
      this.imageCache =  res + "?" + new Date().getTime().toString();
    });
  }


  onFileSelected(event:any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile')?.setValue(file);
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
        this.Image = event.target.result;
      }

      this.imageUploaded =true;
    }
  }


  cancel(){
    location.reload();
  }

  back(){
    this.imageUploaded=false;
    this.Image = this.imageCache;
  }

  onUpload(){
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile')?.value);
    this.profilepicture.setprofile(formData).subscribe(res=>{
      console.log(res);
      if(res=="success")
      {
        location.reload();
      }
    })
  }

}
