import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {GlobalLanguageComponent} from "./global-language.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {DropdownDirectiveModule} from "../../directives/dropdown/dropdown-directive.module";

@NgModule({
    declarations:[GlobalLanguageComponent],
    exports:[GlobalLanguageComponent],
    imports:[
        CommonModule,
        FontAwesomeModule,
        TranslateModule,
        DropdownDirectiveModule
    ]
})

export class LanguageModule
{
    constructor()
    {

    }

    getComponent()
    {
        return GlobalLanguageComponent;
    }
}
