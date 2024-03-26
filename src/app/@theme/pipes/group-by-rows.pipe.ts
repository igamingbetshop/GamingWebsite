import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'groupByRows',
  standalone:true
})
export class GroupByRowsPipe implements PipeTransform {
  transform(value: any[], config?: any): any[]
  {
    const result = [];
    if(!!config && config.count && config.rowCount > 0 &&  config.columnCount)
    {
      const groupItemsCount = config.rowCount * config.columnCount;
      const groupCount = Math.trunc( config.count / groupItemsCount);

      for(let i = 0, gIndex = 0; i < groupCount; i++)
      {
        result.push(value.slice(gIndex, (i + 1)*groupItemsCount));
        gIndex += groupItemsCount;
      }
      return result;
    }
    else
      return [];
  }
}
