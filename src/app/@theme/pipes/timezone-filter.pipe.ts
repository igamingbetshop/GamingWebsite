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

    if(args[0] && args[0].length > 0)
    {
      const filteredData = [];
      const addedValues = new Set();
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < value[i].utc.length; j++) {
          if (value[i].utc[j].toLocaleLowerCase().includes(args[0].toLocaleLowerCase()) || value[i].utcText.toString().toLocaleLowerCase().includes(args[0].toLocaleLowerCase())) {
            if (!addedValues.has(value[i].value)) {
              filteredData.push(value[i]);
              addedValues.add(value[i].value);
            }
          }
        }
      }
      return filteredData;
    }
    else return value;

  }

}
