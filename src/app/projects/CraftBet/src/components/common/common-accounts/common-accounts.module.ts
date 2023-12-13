import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {CommonAccountsComponent} from "./common-accounts.component";
import {ToNumberPipeModule} from "../../../../../../@theme/pipes/to-number/to-number-pipe.module";

@NgModule({
    declarations:[CommonAccountsComponent],
    exports:[CommonAccountsComponent],
    imports:[
        CommonModule,
        TranslateModule,
        ToNumberPipeModule
    ],
})

export class CommonAccountsModule
{

}
