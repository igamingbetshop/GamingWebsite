import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MobileOpenGamesComponent} from "./mobile-open-games.component";
import {SanitizerModule} from "../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {CommonModule} from "@angular/common";

const routes: Routes = [
    {
        path:"",
        component:MobileOpenGamesComponent,
    }
];
@NgModule({
    declarations:[MobileOpenGamesComponent],
    imports:[
        RouterModule.forChild(routes),
        CommonModule,
        SanitizerModule
    ]
})

export class MobileOpenGamesModule
{

}
