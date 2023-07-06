import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/ResidentialUser/notification/notification.service';
import { notification } from '../../../../classes/notifications';

@Component({
  selector: 'app-notification-main',
  templateUrl: './notification-main.component.html',
  styleUrls: ['./notification-main.component.css']
})
export class NotificationMainComponent implements OnInit {

  constructor(private notificationService: NotificationService, private router: Router) { }

  loading:boolean = true;

  notifications:any[]=[];



  ngOnInit(): void {
    this.getNotification();

  }

  getNotification(){
    this.loading=true;
    this.notificationService.getNotifications().subscribe(res=>{
      this.notifications = res;
      let currentDate = new Date();
      var day=60*60*24*1000
      for(let i=0;i<this.notifications.length;i++){
        if(this.notifications[i].notification_type=='deal'){

          let startDate = new Date(this.notifications[i].deal.deal_start_date + " 00:00 ")
          let endDate = new Date(this.notifications[i].deal.deal_end_date + " 00:00 ")

          if(currentDate<startDate){
            this.notifications[i].dealStatus="notStarted"
          }
          else if(currentDate>=startDate&&currentDate<=endDate){
            this.notifications[i].dealStatus="started"
          }
          else{
            this.notifications[i].dealStatus="completed"
          }
          console.log( this.notifications[i].deal.deal_start_date + " |||| " + this.notifications[i].deal.deal_end_date )
          console.log(startDate +  " |||| " + endDate)
          console.log(this.notifications[i].dealStatus)
        }
      }

      this.loading = false;



    });
  }











}
