import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'filterByMobileCode'})

export class FilterMobileCodePipe implements PipeTransform {
    transform(value, pattern)
    {
        if (!pattern) return value;
        return value.filter(el =>
        {
            const p = pattern.toLocaleLowerCase();
            return el['Title'].toLocaleLowerCase().startsWith(p) || el['Type'].startsWith(p) || el['Country']?.toLocaleLowerCase().startsWith(p);
        });
    }
}
