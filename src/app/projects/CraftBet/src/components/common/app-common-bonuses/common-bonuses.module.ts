import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppCommonBonusesComponent} from "./app-common-bonuses.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TranslateModule} from "@ngx-translate/core";
import {SanitizerModule} from "../../../../../../@theme/pipes/sanitizer/sanitizer.module";

@NgModule({
    declarations:[AppCommonBonusesComponent],
    exports:[AppCommonBonusesComponent],
    imports:[
        CommonModule,
        TranslateModule,
        FontAwesomeModule,
        SanitizerModule
    ]
})

export class CommonBonusesModule
{

}
