import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-cancellation',
  templateUrl: './payment-cancellation.component.html',
  styleUrls: ['./payment-cancellation.component.css']
})
export class PaymentCancellationComponent implements OnInit {

  constructor() { }

  loading:boolean=true;

  ngOnInit(): void {
  }

}
