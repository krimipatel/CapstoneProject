import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AllComunityServicesService } from 'src/app/services/admin/allCommunityServices/all-comunity-services.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  private routeSub!: Subscription;
  userId : any;

  Response :any;
  user:any;
  dataLoaded:boolean = false;

  constructor(private route : ActivatedRoute,private communityService: AllComunityServicesService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id'];
    })

    this.communityService.getUser(this.userId).subscribe(res=>{

      this.Response =res;
      this.user = this.Response[0];
      this.dataLoaded = true;
      console.log(res);
      

    })




  }

}
