import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {

  transform(orders: any[], filter: string): any[] {
    if(!orders||!filter) return orders;

    return orders.filter(order=>(order.order_id.toLowerCase().indexOf(filter.toLowerCase()) !== -1 || new Date(order.created).toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1||order.amount.toString().indexOf(filter.toLowerCase()) !== -1))
  }

}
