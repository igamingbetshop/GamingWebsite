import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SendCodeComponent} from "./send-code.component";
import {NgxMaskDirective} from "ngx-mask";
import {DropdownDirectiveModule} from "../../../../../directives/dropdown/dropdown-directive.module";
import {OnlyNumberDirectiveModule} from "../../../../../directives/only-number/only-number.directive.module";
import {FilterMobileCodePipeModule} from "../../../../../pipes/filter-by-mobile-code/filter-mobile-code-pipe.module";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";


@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        FilterMobileCodePipeModule,
        OnlyNumberDirectiveModule,
        NgxMaskDirective,
        DropdownDirectiveModule,
        ReactiveFormsModule,
        FaIconComponent
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