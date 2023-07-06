import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet-toolbox',
  templateUrl: './wallet-toolbox.component.html',
  styleUrls: ['./wallet-toolbox.component.css']
})
export class WalletToolboxComponent implements OnInit {

  constructor() { }

  @Input()
  walletInfo!:number;

  ngOnInit(): void {
    console.log(this.walletInfo)
  }

}
