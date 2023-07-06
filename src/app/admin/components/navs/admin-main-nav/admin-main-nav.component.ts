import { Component, OnInit } from '@angular/core';
import { AllComunityServicesService } from 'src/app/services/admin/allCommunityServices/all-comunity-services.service';

@Component({
  selector: 'app-admin-main-nav',
  templateUrl: './admin-main-nav.component.html',
  styleUrls: ['./admin-main-nav.component.css']
})
export class AdminMainNavComponent implements OnInit {

  adminName:string = "";
  showNotification : boolean = false;
  constructor(private service:AllComunityServicesService) { }

  ngOnInit(): void {
    this.service.getAdminName().subscribe(res=>{
      console.log(res);
      this.adminName = res.firstname + " " + res.lastname;
      
    })
  }

  logOut(){
    localStorage.clear();
    location.href = 'admin';
  }

}
