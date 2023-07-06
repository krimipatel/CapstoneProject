import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'itemFilter'
})
export class ItemFilterPipe implements PipeTransform{
    transform(items:string[], filter:string):string[]{
        if (!items || !filter) {
            return items;
        }

        // search and match any option...
        return items.filter(item => item.toLowerCase().indexOf(filter.toLowerCase()) !== -1);

    }
}
