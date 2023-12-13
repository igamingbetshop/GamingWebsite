import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {GlobalBalanceDpdComponent} from "./global-balance-dpd.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ToNumberPipeModule} from "../../pipes/to-number/to-number-pipe.module";

@NgModule({
    declarations:[GlobalBalanceDpdComponent],
    exports:[GlobalBalanceDpdComponent],
    imports:[
        CommonModule,
        FontAwesomeModule,
        ToNumberPipeModule,
        TranslateModule
    ]
})

export class BalanceListModule
{

}
