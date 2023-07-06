import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dealSearch'
})
export class DealSearchPipe implements PipeTransform {

  transform(deals:any[], filter:string):any[]{
    if (!deals || !filter) {
        return deals;
    }

    // search and match any option...
    return deals.filter(deal => (deal.items.deal_title.toLowerCase().indexOf(filter.toLowerCase()) !== -1 || deal.items.product.product_type.toLowerCase().indexOf(filter.toLowerCase()) !== -1|| new Date(deal.deal_start_data).toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1|| new Date(deal.deal_end_data).toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1));

  }

}
