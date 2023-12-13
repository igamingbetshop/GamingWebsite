import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MobileFooterComponent} from "./mobile-footer.component";
import {SanitizerModule} from "../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {CollapseDirectiveModule } from "../../../../../../@theme/directives/collapse/collapse-directive.module";
import {FunctionalBtnModule} from "../../../../../../@theme/components/functional-btn/functional-btn.module";


@NgModule({
  declarations:[MobileFooterComponent],
  exports:[MobileFooterComponent],
    imports: [
        CommonModule,
        SanitizerModule,
        TranslateModule,
        CollapseDirectiveModule,
        FunctionalBtnModule
    ]
})

export class MobileFooterModule
{
    constructor()
    {

    }

    getComponent()
    {
        return MobileFooterComponent;
    }
}
