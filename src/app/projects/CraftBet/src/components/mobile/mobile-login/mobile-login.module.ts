import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MobileLoginComponent} from "./mobile-login.component";
import {LanguageModule} from "../../../../../../@theme/components/global-language/language.module";
import {SanitizerModule} from "../../../../../../@theme/pipes/sanitizer/sanitizer.module";

const routes: Routes = [
    {
        path:"",
        component:MobileLoginComponent,
    }
];
@NgModule({
    declarations:[MobileLoginComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes),
        LanguageModule,
        SanitizerModule
    ]
})

export class MobileLoginModule
{

}
