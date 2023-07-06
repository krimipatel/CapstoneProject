import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/ResidentialUser/wallet/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  constructor(private walletService:WalletService) { }

  walletInformation : any;
  transactionInformation: any;

  profilePicture!:any;

  ngOnInit(): void {
    this.profilePicture = sessionStorage.getItem("cacheImage");

    this.walletService.getWalletInfo().subscribe(res=>{
      console.log(res)
      this.walletInformation=res;
    },err=>{
      console.log(err)
    })
  }

}
