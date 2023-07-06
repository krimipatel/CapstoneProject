import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/vendor/orders/orders.service';

@Component({
  selector: 'app-vendor-orders',
  templateUrl: './vendor-orders.component.html',
  styleUrls: ['./vendor-orders.component.css']
})
export class VendorOrdersComponent implements OnInit {

  constructor(private orderService:OrdersService) { }
  orders:any;

  searchString:string="";

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(res=>{
      console.log(res);
      this.orders = res;
    })
  }

  openSelectedOrders(){}

  openOrder(id:any){
    console.log(id);
    location.href = "/vendor/order/"+id;
  }

  statusFilter:string='all'

  toggleStatus(status:string){
    this.statusFilter = status;
  }

}
