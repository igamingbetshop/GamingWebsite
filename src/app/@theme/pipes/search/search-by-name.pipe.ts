import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'filterByName'})

export class SearchByNamePipe implements PipeTransform {
    transform(value, args) {
        if (!args || !args[0]) return value;
        args = args.toLocaleLowerCase();
        return value.filter(it => {
            return it.Name.toLocaleLowerCase().startsWith(args);
        });
    }
}
