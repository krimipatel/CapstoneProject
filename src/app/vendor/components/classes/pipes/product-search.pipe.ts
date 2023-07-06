import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {

  transform(products:any[], filter:string):any[]{
    if (!products || !filter) {
        return products;
    }

    // search and match any option...
    return products.filter(product => (product.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1 || product.product_type.toLowerCase().indexOf(filter.toLowerCase()) !== -1));

  }

}
 