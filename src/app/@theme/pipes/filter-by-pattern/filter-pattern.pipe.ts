import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPattern'
})
export class FilterPatternPipe implements PipeTransform {

  transform(source: any[], pattern: string, ...keys: string[]): any[] {
    if (!pattern) return source;
    return source.filter(arg => {
      return keys.some(key => arg.Currency[key].toString().toLowerCase().includes(pattern.toLowerCase()));
    });
  }

}
