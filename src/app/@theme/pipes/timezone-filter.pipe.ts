import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timezoneFilter',
  standalone: true
})
export class TimezoneFilterPipe implements PipeTransform {

  transform(value:any[], ...args: any[]): any[]
  {
    if(!args[0] )
      return value;

    if(args[0] && args[0].length > 2)
    {
      const filteredData = [];

      for(let i = 0; i < value.length; i++)
      {
        for(let j = 0; j < value[i].utc.length; j++)
        {
          if(value[i].utc[j].toLocaleLowerCase().includes(args[0].toLocaleLowerCase()))
            filteredData.push(value[i]);
        }
      }
      return filteredData;
    }
    else return value;

  }

}
