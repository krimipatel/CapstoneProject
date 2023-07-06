import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/ResidentialUser/posts/posts.service';

@Component({
  selector: 'app-view-issues',
  templateUrl: './view-issues.component.html',
  styleUrls: ['./view-issues.component.css']
})
export class ViewIssuesComponent implements OnInit {

  @Input() issue:any;

  constructor(private postService : PostsService) { }

  ngOnInit(): void {
  }


  vote(voteAction:string,id:any){

    this.interactionUpdate(voteAction);


    var data = {
      post_id:id,
      action:voteAction
    }



    this.postService.up_down(data).subscribe(res=>{
      this.issue.upvote = res.upvotes;
      this.issue.downvote = res.downvotes;
      this.issue.user_action = res.user_action;

    },(err)=>{

    });

  }


  interactionUpdate(voteAction : any){
    if (voteAction=="up") {
      if (this.issue.user_action =="upvote") {
        this.issue.upvote.splice(0,1);
        this.issue.user_action = "none"
      } else if (this.issue.user_action =="downvote"){
        this.issue.downvote.splice(0,1);
        this.issue.upvote.push(-1);
        this.issue.user_action = "upvote"
      } else{
        this.issue.upvote.push(-1);
        this.issue.user_action = "upvote"
      }
    } else if (voteAction=="down"){
      if (this.issue.user_action =="downvote") {
       this.issue.downvote.splice(0,1);
       this.issue.user_action = "none"
      } else if (this.issue.user_action =="upvote"){
        this.issue.downvote.push(-1);
        this.issue.upvote.splice(0,1);
        this.issue.user_action = "downvote"
      } else{
        this.issue.downvote.push(-1);
        this.issue.user_action = "downvote"
      }
    }
  }

}
