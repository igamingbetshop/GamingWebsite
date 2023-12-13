import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";
import {SendCodeComponent} from "./send-code.component";
import {FilterMobileCodePipeModule} from "../../../../../../../../../@theme/pipes/filter-by-mobile-code/filter-mobile-code-pipe.module";
import {OnlyNumberDirectiveModule} from "../../../../../../../../../@theme/directives/only-number/only-number.directive.module";
import {DropdownDirectiveModule} from "../../../../../../../../../@theme/directives/dropdown/dropdown-directive.module";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        FilterMobileCodePipeModule,
        OnlyNumberDirectiveModule,
        NgxMaskModule,
        DropdownDirectiveModule
    ],
    exports: [
        SendCodeComponent
    ],
    declarations: [
        SendCodeComponent
    ]
})
export class SendCodeModule
{
    getComponent()
    {
        return SendCodeComponent;
    }
}