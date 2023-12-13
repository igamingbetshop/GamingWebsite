import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'filter'})

export class SearchByFirstLetterPipe implements PipeTransform {
    transform(value, args) {
        if (!args[0]) return value;
        args = args.toLocaleLowerCase();
        return value.filter(it => {
            return it.subproviderName.toLocaleLowerCase().startsWith(args);
        });
    }
}
