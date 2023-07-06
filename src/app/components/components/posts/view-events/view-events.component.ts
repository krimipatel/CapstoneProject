import { NgIf } from '@angular/common';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/ResidentialUser/posts/posts.service';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css']
})
export class ViewEventsComponent implements OnInit {

  @Input() event:any;
  profilePicture : any;
  loading: boolean = true;

  constructor(private postService:PostsService) { }

  ngOnInit(): void {

  }

  rsvp(action:any,id:any){
    var data = {
      post_id:id,
      action:action,
    }

    this.f_res(action);

    this.postService.rsvp(data).subscribe(res=>{
      this.event.attend = res.attending;
      this.event.not_attend = res.not_attending;
      this.event.not_sure =res.not_sure;
      this.event.user_action = res.user_action;
    })
  }


  f_res(action:any){
    let userAction = this.event.user_action;

    if(action=="attend"){
      if(userAction=="attend"){
        userAction="none"
      }
      else if(userAction=="not attend"){
        userAction="attend"
      }
      else if(userAction=="not sure"){
        userAction="attend"
      }
      else {
        userAction="attend"
      }
    }
    else if(action=="not attend"){
      if(userAction=="attend"){
        userAction="not attend"
      }
      else if(userAction=="not attend"){
        userAction="none"
      }
      else if(userAction=="not sure"){
        userAction="not attend"
      }
      else {
        userAction="not attend"
      }
    }
    else if(action=="not sure"){
      if(userAction=="attend"){
        userAction="not sure"
      }
      else if(userAction=="not attend"){
        userAction="not sure"
      }
      else if(userAction=="not sure"){
        userAction="none"
      }
      else {
        userAction="not sure"
      }
    }

    this.event.user_action = userAction;


  }

}
