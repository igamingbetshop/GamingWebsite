import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {GlobalChangeLoginUsernameComponent} from "./global-change-login-username.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations:[GlobalChangeLoginUsernameComponent],
    exports:[GlobalChangeLoginUsernameComponent],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        TranslateModule,
    ]
})

export class GlobalChangeLoginUsernameModule
{

}