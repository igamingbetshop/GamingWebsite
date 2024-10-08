import {RouterModule, Routes} from "@angular/router";
import {MobileProfileComponent} from "./mobile-profile.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RegExpInputDirectiveModule} from "../../../../../../../@theme/directives/reg-exp-input/reg-exp-input-directive.module";
import {LayoutService} from "../../../../../../../@core/services/app/layout.service";
import {
    ProfileImageComponent
} from "../../../../../../../@theme/components/profile/profile-image/profile-image.component";

const routes: Routes = [
    {
        path: '',
        component: MobileProfileComponent
    }
]
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        RouterModule.forChild(routes),
        FontAwesomeModule,
        RegExpInputDirectiveModule,
        ProfileImageComponent
    ],
    declarations:[
        MobileProfileComponent
    ],
    providers:[
        LayoutService
    ]
})
export class MobileProfileModule
{

}