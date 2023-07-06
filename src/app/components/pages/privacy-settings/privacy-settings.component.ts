import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PrivacySettingsService } from 'src/app/services/ResidentialUser/privacySettings/privacy-settings.service';

@Component({
  selector: 'app-privacy-settings',
  templateUrl: './privacy-settings.component.html',
  styleUrls: ['./privacy-settings.component.css']
})
export class PrivacySettingsComponent implements OnInit {
 // "Everyone", "Connections", "Noone"  : strings will be used to communicate with APIs

  privacyFormGroup!:FormGroup;

  defaults :any ;
  email : String = "";
  alerted: Number = 1;

  constructor(private router:Router, private privacyService:PrivacySettingsService) { }

  ngOnInit(): void {
    
    this.privacyFormGroup = new FormGroup({
      email : new FormControl(''),
      unit : new FormControl(''),
      image: new FormControl(''),
      about: new FormControl(''),
    })

    this.privacyService.getPrivacySettings().subscribe(res=>{
      this.defaults  = res;
      console.log(this.defaults);
      this.privacyFormGroup.controls.email.setValue(this.defaults.email);
      this.privacyFormGroup.controls.unit.setValue(this.defaults.unit);
      this.privacyFormGroup.controls.image.setValue(this.defaults.photo);
      this.privacyFormGroup.controls.about.setValue(this.defaults.about);


    });




  }

  //data = {
    //email : this.privacyFormGroup.controls.email.value,
   // unit:this.privacyFormGroup.controls.unit.value,
   // image : this.privacyFormGroup.controls.image.value,
   // about:this.privacyFormGroup.controls.about.value
 // }

  submit(){

    var data = {
      email  : this.privacyFormGroup.controls.email.value,
      photo  : this.privacyFormGroup.controls.image.value,
      about : this.privacyFormGroup.controls.about.value,
      unit : this.privacyFormGroup.controls.unit.value

    }

    this.privacyService.setPrivacySettings(data).subscribe(res=>{
      console.log(res);
      if(res=="Saved Settings"){
        console.log(res);
        this.router.navigateByUrl("/profile")
      }
      else{
        console.log("Some Error");
      }

    });



  }

  Cancel(){
    this.router.navigateByUrl('/profile');
  }

  Warning(){
    var alerted = localStorage.getItem('alerted') || '';
    if (alerted != 'yes') {
     this.alerted = 0;
     localStorage.setItem('alerted','yes');
    }
  }

}
