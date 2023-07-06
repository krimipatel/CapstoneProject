import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginVendorService } from 'src/app/services/vendor/loginVendor/login-vendor.service';

@Component({
  selector: 'app-edit-profile-vendor',
  templateUrl: './edit-profile-vendor.component.html',
  styleUrls: ['./edit-profile-vendor.component.css']
})
export class EditProfileVendorComponent implements OnInit {

  @Output() closeModal = new EventEmitter<string>();

  profileDetails: any;

  profileForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    sname: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    webLink: new FormControl(''),
  });

  constructor(private router: Router, private profileService: LoginVendorService) { }

  ngOnInit(): void {

    this.profileService.getProfile().subscribe(res => {
      this.profileDetails = res[0];

      this.profileForm.controls.fname.setValue(this.profileDetails.firstname);
      this.profileForm.controls.lname.setValue(this.profileDetails.lastname);
      this.profileForm.controls.sname.setValue(this.profileDetails.shopname);
      this.profileForm.controls.phone.setValue(this.profileDetails.phonenumber);
      this.profileForm.controls.email.setValue(this.profileDetails.email);
      this.profileForm.controls.address.setValue(this.profileDetails.address);
      this.profileForm.controls.webLink.setValue(this.profileDetails.website);
    })

    console.log(this.profileForm.controls.fname.value);
  }

  discard(){
    this.closeModal.emit("closed");
  }

  saveProfile() {
    console.log(this.profileForm.controls);

    var data = {
        "firstname": this.profileForm.controls.fname.value,
        "lastname": this.profileForm.controls.lname.value,
        "shopname": this.profileForm.controls.sname.value,
        "phonenumber": this.profileForm.controls.phone.value,
        "address": this.profileForm.controls.address.value,
        "website": this.profileForm.controls.webLink.value
    }
    console.log(data);
    this.profileService.editProfile(data).subscribe(res=>{
      if(res){
        location.href="vendor/profile"
      }
    })
  }

}
