import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {GlobalLoginBtnComponent} from "./global-login-btn.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations:[GlobalLoginBtnComponent],
    exports:[GlobalLoginBtnComponent],
    imports:[
        CommonModule,
        FontAwesomeModule,
        TranslateModule
    ]
})

export class LoginButtonModule
{
    getComponent()
    {
        return GlobalLoginBtnComponent;
    }
}
