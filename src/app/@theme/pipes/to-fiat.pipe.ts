import {Pipe, PipeTransform} from '@angular/core';
import {Wallet} from "../../@core/types";

@Pipe({name: 'toFiat', standalone:true})

export class ToFiatPipe implements PipeTransform {
    transform(source:Wallet, rate:number)
    {
        return source.Balance * source.Currency.CurrentRate * rate;
    }
}
