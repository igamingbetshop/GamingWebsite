import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MobileProductsComponent} from "./mobile-products.component";
import {TranslateModule} from "@ngx-translate/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

const routes: Routes = [
    {
        path:"",
        component:MobileProductsComponent,
    }
];
@NgModule({
    declarations:[MobileProductsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule,
        FontAwesomeModule
    ]
})

export class MobileProductsModule
{

}