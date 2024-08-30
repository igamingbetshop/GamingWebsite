import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPattern'
})
export class FilterPatternPipe implements PipeTransform {

  transform(args: any[], searchTerm: string, isHidden: boolean, ...keys: string[]): any[] {
    if (!args) return [];
    if (isHidden && !searchTerm) {
      return [];
    }
    if (!searchTerm && !isHidden) {
      return args;
    }
    return args.filter(arg => {
      return keys.some(key => arg[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }

}
