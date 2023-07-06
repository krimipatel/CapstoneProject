import { Pipe, PipeTransform } from '@angular/core';
import { MarketService } from '../services/ResidentialUser/market/market.service';

@Pipe({
  name: 'getVariant'
})
export class GetVariantPipe implements PipeTransform {

  constructor(private marketService:MarketService){}

  transform(metadata:any):any {
    var title = " default "

    this.marketService.getProduct(metadata.product_id).subscribe(res=>{
      for(let i=0;i<res.variants.length;i++){
        if(res.variants[i].id==metadata.variant_id)
        {
          title = res.variants[i].title
        }
      }
    } )
    return title
  }

}
