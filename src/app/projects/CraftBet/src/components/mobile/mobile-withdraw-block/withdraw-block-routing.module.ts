import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MobileWithdrawBlockDefaultComponent} from "./withdraw-block-default/mobile-withdraw-block-default.component";

const routes: Routes = [
    {
        path: '',
        component: MobileWithdrawBlockDefaultComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})


export class MobileWithdrawBlockRoutingModule {
}
