import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {GlobalChangePasswordComponent} from "./global-change-password.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations:[GlobalChangePasswordComponent],
    exports:[GlobalChangePasswordComponent],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        TranslateModule
    ]
})

export class GlobalChangePasswordModule
{

}