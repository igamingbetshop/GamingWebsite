import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {GlobalLoginBtnComponent} from "./global-login-btn.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SanitizerModule} from "../../pipes/sanitizer/sanitizer.module";

@NgModule({
    declarations:[GlobalLoginBtnComponent],
    exports:[GlobalLoginBtnComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        TranslateModule,
        SanitizerModule
    ]
})

export class LoginButtonModule
{
    getComponent()
    {
        return GlobalLoginBtnComponent;
    }
}
