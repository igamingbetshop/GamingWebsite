import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RegExpInputDirectiveModule} from "../../../directives/reg-exp-input/reg-exp-input-directive.module";
import {ProfileService} from "../../profile/service/profile.service";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        FontAwesomeModule,
        RegExpInputDirectiveModule
    ],
    declarations:[
        ProfileComponent
    ],
    exports:[ProfileComponent],
    providers:[
        ProfileService
    ]
})
export class ProfileModule
{
    getComponent() {
        return ProfileComponent;
    }
}