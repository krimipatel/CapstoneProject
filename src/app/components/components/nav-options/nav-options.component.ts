import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/ResidentialUser/login.service';

@Component({
  selector: 'app-nav-options',
  templateUrl: './nav-options.component.html',
  styleUrls: ['./nav-options.component.css']
})
export class NavOptionsComponent implements OnInit {

  constructor(private service : LoginService,private router:Router) { }

  @Input()
  profilePicture:String="";

  ngOnInit(): void {
    console.log(this.profilePicture)
  }

  logout(){
    this.service.logout();
    this.router.navigateByUrl('/login');
  }

}
