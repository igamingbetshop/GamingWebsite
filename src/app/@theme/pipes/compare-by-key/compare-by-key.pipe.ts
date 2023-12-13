import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'compareByKey'})

export class CompareByKeyPipe implements PipeTransform
{
    transform(source, compareObject, key)
    {
        if(!compareObject || !source || source && source.length === 0)
            return false;
        return !!source.find(el => el[key] === compareObject[key]);
    }
}
