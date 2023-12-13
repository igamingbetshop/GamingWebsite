import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {MobileMoreMenuComponent} from "./mobile-more-menu.component";

const routes: Routes = [
    {
        path: "",
        component: MobileMoreMenuComponent,
    }
];
@NgModule({
    declarations: [MobileMoreMenuComponent],
    exports: [
        MobileMoreMenuComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        TranslateModule,
        CommonModule,
    ]
})

export class MobileMoreMenuModule
{

}