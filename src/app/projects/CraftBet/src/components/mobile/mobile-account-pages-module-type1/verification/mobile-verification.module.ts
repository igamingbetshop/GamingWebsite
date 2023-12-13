import {RouterModule, Routes} from "@angular/router";
import {MobileVerificationComponent} from './mobile-verification.component';
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RegExpInputDirectiveModule} from "../../../../../../../@theme/directives/reg-exp-input/reg-exp-input-directive.module";
import {LayoutService} from "../../../../../../../@core/services/app/layout.service";


const routes: Routes = [
    {
        path: '',
        component: MobileVerificationComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        RouterModule.forChild(routes),
        FontAwesomeModule,
        RegExpInputDirectiveModule
    ],
    declarations: [
        MobileVerificationComponent
    ],
    providers: [
        LayoutService
    ]
})


export class MobileVerificationModule {
}