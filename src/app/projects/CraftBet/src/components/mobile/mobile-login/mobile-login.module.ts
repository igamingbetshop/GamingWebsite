import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MobileLoginComponent} from "./mobile-login.component";

const routes: Routes = [
    {
        path:"",
        component:MobileLoginComponent,
    }
];
@NgModule({
    declarations:[MobileLoginComponent],
    imports:[
        CommonModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})

export class MobileLoginModule
{

}
