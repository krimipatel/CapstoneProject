import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/services/ResidentialUser/posts/posts.service';
import { ProfileService } from 'src/app/services/ResidentialUser/profile/profile.service';
import { ProfilephotoService } from 'src/app/services/ResidentialUser/profile/profilephoto.service';

@Component({
  selector: 'app-residential-user-profile',
  templateUrl: './residential-user-profile.component.html',
  styleUrls: ['./residential-user-profile.component.css']
})
export class ResidentialUserProfileComponent implements OnInit {

  constructor( private router:Router ,  private modalService: NgbModal , private profileService : ProfileService,private postService :PostsService,private profilephotoService:ProfilephotoService) { }

  profileData : any;

  profilephoto : any;

  posts:any = [];
  noPost:boolean=false;
  dataLoaded:boolean=false;

  ngOnInit(): void {
     this.profileService.getInfo().subscribe(res=>{
      this.profileData=res;
    });

    this.profilephotoService.getProfile().subscribe(res=>{
      this.profilephoto = res + "?" + new Date().getTime().toString();
      this.dataLoaded = true;
    })

    this.getPosts();

  }


  getPosts(){
    this.postService.getUserPost().subscribe(res=>{
      this.posts = res[0];
      this.posts.length==0 ? this.noPost=true:this.noPost=false;

    });
  }

  interestSurvey(){
    this.router.navigateByUrl('/profile/interests');
  }

  editprofile(){
    this.router.navigateByUrl("editprofile");
  }

  privacySettings(){
    this.router.navigateByUrl("privacy");
  }
}
