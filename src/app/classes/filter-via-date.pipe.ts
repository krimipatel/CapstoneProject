import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'SortWithDate'
})
export class FilterViaDatePipe implements PipeTransform {

  constructor(public datepipe: DatePipe){}

  transform(value: any[], months:number, ...args: unknown[]) {
    let datePast= new Date();

    datePast.setMonth(new Date().getMonth() - months);

    const newArr = value.reduce((resultArr, obj)=>{
      if (datePast.getTime() < new Date(obj.created).getTime()) {
         resultArr.push(obj);
         return resultArr;
      }else{
        return resultArr;
      }
    }, [])

    const sortedActivities = newArr.sort((a:any, b:any) => new  Date(b.created).getTime() - new Date(a.created).getTime());


    return sortedActivities;
  }

}
