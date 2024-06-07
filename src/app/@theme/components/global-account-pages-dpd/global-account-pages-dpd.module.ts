import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {GlobalAccountPagesDpdComponent} from "./global-account-pages-dpd.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {GlobalLogoutModule} from "../global-logout/global-logout.module";
import {DropdownDirectiveModule} from "../../directives/dropdown/dropdown-directive.module";
import {PointerOnLinkDirective} from "../../directives/pointer-on-link/pointer-on-link.directive";

@NgModule({
    declarations:[GlobalAccountPagesDpdComponent],
    exports:[GlobalAccountPagesDpdComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        TranslateModule,
        GlobalLogoutModule,
        DropdownDirectiveModule,
        PointerOnLinkDirective
    ]
})

export class GlobalAccountPagesDpdModule
{

}