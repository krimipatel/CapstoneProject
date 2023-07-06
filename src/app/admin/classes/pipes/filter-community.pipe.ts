import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCommunity'
})
export class FilterCommunityPipe implements PipeTransform {

  transform(value: any[], searchString:string) {
    const resultArr:any[] = [];

    if(value.length==0 || searchString==""){
      return value;
    }

    for (let index = 0; index < value.length; index++) {

      if (value[index].community_name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
        resultArr.push(value[index]);
      }else if(value[index].address.toLowerCase().indexOf(searchString.toLowerCase()) !== -1){
        resultArr.push(value[index]);
      }
    }

    return resultArr;

  }

}
