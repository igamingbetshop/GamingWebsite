import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile.component";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {ProfileService} from "../../../../../../../@theme/components/profile/service/profile.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RegExpInputDirectiveModule} from "../../../../../../../@theme/directives/reg-exp-input/reg-exp-input-directive.module";

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent
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
    declarations:[
        ProfileComponent
    ],
    providers:[
        ProfileService
    ]
})
export class ProfileModule
{

}