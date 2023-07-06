
import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from 'src/app/services/ResidentialUser/posts/posts.service';
import { PostSelectionComponent } from '../../components/posts/post-selection/post-selection.component';
import { CommunityService } from 'src/app/services/ResidentialUser/community/community.service';
import { ProfilephotoService } from 'src/app/services/ResidentialUser/profile/profilephoto.service';

interface users {
  alias: string;
  user_details_id: number;
  connection_status: boolean;
  profile_photo: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  eventActive:Boolean=false;
  newsActive:Boolean=false;
  pollActive:Boolean=false;

  //posts types...
  newsToggle:boolean=false;
  eventsToggle:boolean=false;
  issuesToggle:boolean=false;
  profilephoto : any;

  @ViewChild(PostSelectionComponent)
  child: PostSelectionComponent = new PostSelectionComponent;

  constructor(private postService:PostsService, private communityService: CommunityService,private profilephotoService:ProfilephotoService) { }

  posts!:any;

  title:string = "";

  loading:boolean=true;
  noPost:boolean=false;
  users !: users[];

  ngOnInit(): void {
    this.profilephotoService.getProfile().subscribe(res=>{
      this.profilephoto = res + "?" + new Date().getTime().toString();
    })

    this.communityService.getCommunityInfo().subscribe(res => {
      this.users = res.User_list;
      console.log(res);
      this.loading = false;
      this.getPosts();
    })

    
  }

  getPosts() {
    this.postService.getPosts().subscribe(res=>{
      this.posts = res;
      this.posts = this.posts[0];
      console.log(this.posts);
      
      for(let i=0;i<this.posts.length;i++){

        let postOwner = this.users.filter((user) => user.alias == this.posts[i].alias)
        console.log(postOwner)
        if(postOwner.length == 0) {
          this.posts[i].profile_photo = this.profilephoto
        }
        else if(postOwner[0].profile_photo == "https://profileappphoto.s3.us-east-2.amazonaws.com/profile_photo/default/user.png") {
          this.posts[i].profile_photo == null
        }
        else {
          this.posts[i].profile_photo = postOwner[0].profile_photo
        }

        if(this.posts[i].post_type=="deal"){
          this.posts[i].community_cart = JSON.parse(this.posts[i].community_cart)
          if(this.posts[i].community_cart.total_quantity>=this.posts[i].deal.deal_tiers[0].quantity)
          {
            this.posts[i].deal_success = true;
          }else if(this.posts[i].community_cart.total_quantity<this.posts[i].deal.deal_tiers[0].quantity){
            this.posts[i].deal_success = false;
          }


        }
      }

      console.log(this.posts);
      this.posts.length==0 ? this.noPost=true:this.noPost=false;
      this.loading = false;
    });
  }
 
  close(){
    this.newsToggle=false;
    this.issuesToggle=false;
    this.eventsToggle=false;
    this.title="";
  }

  selectType(type:any){
    this.newsToggle=false;
    this.issuesToggle=false;
    this.eventsToggle=false;
    this.title="";
    if (type=="news") {
      this.newsToggle=true;
      this.title=": Building Info/News";
    } else if(type=="events") {
      this.eventsToggle=true;
      this.title=": Events";
    } else if(type=="issues") {
      this.issuesToggle=true;
      this.title=": Issues";
    }else{
    }
  }

}
