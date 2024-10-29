import {Pipe, PipeTransform} from '@angular/core';
import {Wallet} from "../../@core/types";

@Pipe({name: 'filterByCurrencyType', standalone:true})

export class FilterByCurrencyTypePipe implements PipeTransform {
    transform(source:Wallet[], type:number)
    {
        if (!type) return source;
        return source.filter(el => {
            return el.Currency.Type === type;
        });
    }
}
