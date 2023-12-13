import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'filterByKey'})

export class FilterByKeyPipe implements PipeTransform {
    transform(value, pattern, key)
    {
        if (!pattern) return value;
        return value.filter(el => {
            return el[key]?.toLocaleLowerCase().startsWith(pattern.toLocaleLowerCase());
        });
    }
}
