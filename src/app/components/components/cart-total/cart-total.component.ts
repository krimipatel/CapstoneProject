import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.css']
})
export class CartTotalComponent implements OnInit {

  constructor() { }

  @Input()
  cart:any;

  ngOnInit(): void {
  }

}
