import { Component, Input, OnInit } from '@angular/core';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { PostsService } from 'src/app/services/ResidentialUser/posts/posts.service';

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.component.html',
  styleUrls: ['./view-news.component.css']
})
export class ViewNewsComponent implements OnInit {

  @Input() news:any;

  constructor(private postService:PostsService) { }

  ngOnInit(): void {
  }

  vote(voteAction:string,id:any){


    this.interactionUpdate(voteAction);

    var data = {
      post_id:id,
      action:voteAction
    }

    this.postService.up_down(data).subscribe(res=>{
      console.log(res);
      this.news.upvote = res.upvotes;
      this.news.downvote = res.downvotes;
      this.news.user_action = res.user_action;
      console.log(this.news);
    });

  }


  interactionUpdate(voteAction : any){
    if (voteAction=="up") {
      if (this.news.user_action =="upvote") {
        this.news.upvote.splice(0,1);
        this.news.user_action = "none"
      } else if (this.news.user_action =="downvote"){
        this.news.downvote.splice(0,1);
        this.news.upvote.push(-1);
        this.news.user_action = "upvote"
      } else{
        this.news.upvote.push(-1);
        this.news.user_action = "upvote"
      }
    } else if (voteAction=="down"){
      if (this.news.user_action =="downvote") {
       this.news.downvote.splice(0,1);
       this.news.user_action = "none"
      } else if (this.news.user_action =="upvote"){
        this.news.downvote.push(-1);
        this.news.upvote.splice(0,1);
        this.news.user_action = "downvote"
      } else{
        this.news.downvote.push(-1);
        this.news.user_action = "downvote"
      }
    }
  }

}
