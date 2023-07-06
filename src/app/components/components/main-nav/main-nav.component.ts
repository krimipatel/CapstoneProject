import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/ResidentialUser/notification/notification.service';
import { ProfilephotoService } from 'src/app/services/ResidentialUser/profile/profilephoto.service';
import { WalletService } from 'src/app/services/ResidentialUser/wallet/wallet.service';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  constructor(private dpService : ProfilephotoService,private router:Router,private notificationService:NotificationService,private walletService:WalletService) { }

  showNotification : boolean = false;
  showOptions : boolean = false;

  profilePicture : any;

  active:string=""

  showbadge:boolean = false;

  walletBalance!:number;

  ngOnInit(): void {

    let lastLogin = localStorage.getItem("lastLogin");


    if(lastLogin){
      let unixLastLogin = parseInt(lastLogin);
      let loginDate = new Date("2022-10-05");
      this.notificationService.getNotifications().subscribe(res=>{
        let lastNotification = res[0];
        let lastNotificationDateTime = new Date(lastNotification.created_on)
        if(lastNotificationDateTime>loginDate){
          this.showbadge=true
        }
      })
    }
    else
    {
      this.showbadge = true;
    }


    var cacheImage = sessionStorage.getItem("cacheImage");

    if(cacheImage){
      this.profilePicture = cacheImage
    }

    this.dpService.getProfile().subscribe(res=>{
      this.profilePicture = res + "?" + new Date().getTime().toString();
      sessionStorage.setItem("cacheImage",this.profilePicture)
    });

    this.walletService.getWalletInfo().subscribe(res=>{
      console.log(res);
      this.walletBalance = res.balance
    },err=>{
      console.log(err);
    })


    var url = this.router.url;
    if(url.includes("home")){
      this.active="home"
    }
    else if(url.includes("community")){
      this.active="community"
    }
    else if(url.includes("market")||url.includes("product")||url.includes("cart")||url.includes("checkout"))
    {
      this.active="market"
    }

    lastLogin = new Date().getTime().toString();
    localStorage.setItem("lastLogin",lastLogin);
  }

  openNotification(state: boolean) {
    this.showNotification = state;
    this.showbadge = false;
  }

  openOptions(state: boolean) {
     this.showOptions = state;
  }

  redirectWallet(){
    location.href = "/wallet"
  }


}
