import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginVendorService } from 'src/app/services/vendor/loginVendor/login-vendor.service';

@Component({
  selector: 'app-view-profile-vendor',
  templateUrl: './view-profile-vendor.component.html',
  styleUrls: ['./view-profile-vendor.component.css']
})
export class ViewProfileVendorComponent implements OnInit {

  vendor:any;

  @ViewChild('modalCloser') modalCloser!: ElementRef;

  constructor(private router:Router, private profileService:LoginVendorService) { }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(res=>{
      this.vendor = res[0];
      console.log(this.vendor);
    })

    
  }

  onEditModalClosed(eventName:string){
    this.modalCloser.nativeElement.click();
  }





}
