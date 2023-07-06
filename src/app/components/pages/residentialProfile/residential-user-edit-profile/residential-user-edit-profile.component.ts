import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup,FormControl, Validators, ValidationErrors, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/ResidentialUser/profile/profile.service';
import { ProfilephotoService } from 'src/app/services/ResidentialUser/profile/profilephoto.service';


class CustomValidators {
  static phoneNumber (control: AbstractControl): ValidationErrors |null{
    const phoneNumber = control.get('phone')!.value;

    if(phoneNumber=="" || null){
      return null;
    } else {
      return {Validators:Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")};
    }
  }
}

@Component({
  selector: 'app-residential-user-edit-profile',
  templateUrl: './residential-user-edit-profile.component.html',
  styleUrls: ['./residential-user-edit-profile.component.css']
})
export class ResidentialUserEditProfileComponent implements OnInit {

  ///for picture
  uploadForm! : FormGroup;

  //path for the image
  path: any;

  //error message
  errorMessage:any;

  //form group
  profileForm = new FormGroup({
    fname : new FormControl('',Validators.required),
    lname: new FormControl('',Validators.required),
    alias :  new FormControl('',[Validators.minLength(2), Validators.required]),
    email :  new FormControl(''),
    phone : new FormControl('',[Validators.minLength(10)]),
    about : new FormControl(''),
    unit : new FormControl('',Validators.required),
    address : new FormControl('')

  },{
    //validators: CustomValidators.phoneNumber
  });




  constructor(private profileService : ProfileService,private router:Router,private formBuilder:FormBuilder,private profilepicture : ProfilephotoService) { }

  profileData :any;

  profileDataInput: any;



  ngOnInit(): void {

    this.getProfileData();

    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });

    this.profilepicture.getProfile().subscribe(res=>{
      this.path = res;
    });

  }

  getProfileData(){
    this.profileService.getInfo().subscribe(res=>{
      console.log(res);
      this.profileData = res;
      this.profileForm.controls.fname.setValue(this.profileData.first_name);
      this.profileForm.controls.lname.setValue(this.profileData.last_name);
      this.profileForm.controls.email.setValue(this.profileData.email);
      this.profileForm.controls.alias.setValue(this.profileData.alias);
      this.profileForm.controls.about.setValue(this.profileData.about);
      this.profileForm.controls.phone.setValue(this.profileData.phone);
      this.profileForm.controls.unit.setValue(this.profileData.unit);
      this.profileForm.controls.address.setValue(this.profileData.address);
    });
  }

  setProfileInfo(){
    this.profileDataInput = {
      first_name : this.profileForm.controls.fname.value,
      last_name : this.profileForm.controls.lname.value,
      alias : this.profileForm.controls.alias.value,
      phone : this.profileForm.controls.phone.value,
      about : this.profileForm.controls.about.value,
      unit : this.profileForm.controls.unit.value,
      address : this.profileForm.controls.address.value,
    }

    this.profileService.setInfo(this.profileDataInput).subscribe(res=>{
      console.log(res);
      if(res=="Details Updated Successfully"){
        window.location.reload();
      }
    },(err => {
      this.gotError();
    }));

  }


  gotError(){
    this.errorMessage = "Couldn't save, please try again later";
    setTimeout(() => {
      this.errorMessage='';
    }, 5000);
  }

}

