import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRegion'
})
export class FilterRegionPipe implements PipeTransform {

  transform(values: any[], searchString: string) {
    if (!values || !searchString) {
      return values.sort();
    }
    // search and match any option...
    values = values.filter(item => item.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

    return values.sort();

  }
}
