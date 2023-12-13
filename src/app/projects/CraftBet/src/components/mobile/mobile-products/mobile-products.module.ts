import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MobileProductsComponent} from "./mobile-products.component";

const routes: Routes = [
    {
        path:"",
        component:MobileProductsComponent,
    }
];
@NgModule({
    declarations:[MobileProductsComponent],
    imports:[
        CommonModule,
        RouterModule.forChild(routes)
    ]
})

export class MobileProductsModule
{

}