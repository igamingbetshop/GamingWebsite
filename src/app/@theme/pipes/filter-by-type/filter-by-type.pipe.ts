import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'filterByType'})

export class FilterByTypePipe implements PipeTransform {
    transform(value, args) {
        if (!args[0] || args === 'All') return value;
        return value.filter(it => {
            return it.type === args;
        });
    }
}
