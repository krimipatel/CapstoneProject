import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

import { KnockService } from 'src/app/services/ResidentialUser/knock/knock.service';
import { NotificationService } from 'src/app/services/ResidentialUser/notification/notification.service';

import { notification } from '../../../../classes/notifications';

@Component({
  selector: 'app-indiv-notification',
  templateUrl: './indiv-notification.component.html',
  styleUrls: ['./indiv-notification.component.css']
})
export class IndivNotificationComponent implements OnInit {

  constructor(private knockService : KnockService,private notificationService: NotificationService) { }

  @Output() knockActionEvent = new EventEmitter();
  @Output() Completed = new EventEmitter();

  @Input()
  notification :any;


  ngOnInit(): void {
  }

  acceptKnock(object:any){
    var data = {
      action : "accept",
      object_id : object
    }

    this.knockService.replyKnock(data).subscribe(res=>{
      if(res=="Accept Success"){
        this.knockActionEvent.emit("true");
        this.ngOnInit();
     }
    });
  }

  ignoreKnock(object:any){
    var data = {
      action :"ignore",
      object_id : object
    }


    this.knockService.replyKnock(data).subscribe(res=>{
      if(res=="Knock Ignored"){

        this.knockActionEvent.emit("true");
        this.ngOnInit();

      }
    });
  }


  getDate(date:any)
  {
     var year = date.substring(0,4);
     var month = date.substring(5,7);
     var day = date.substring(8,10);
     var hour = date.substring(11,13);
     var minute = date.substring(14,16)

     let notificationDate: Date = new Date(year,month-1,day, hour, minute, 0, 0);
     let currentDate:Date = new Date();



      if(notificationDate.toLocaleString().substring(0,9) == currentDate.toLocaleString().substring(0,9)){
        return "Today at " + notificationDate.toLocaleTimeString();
      }
      else{
        return notificationDate.toLocaleString();
      }


  }

  viewDeal(deal_id:string){
    if(this.notification.dealStatus=="notStarted"||this.notification.dealStatus=="completed") return;
    location.href = "market/deal/"+deal_id
  }

  deleteNotification(notId:any){
    var data = {
      notification_id : notId
    }
    this.notificationService.deleteNotification(data);

  }






}
