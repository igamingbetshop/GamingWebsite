import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MobileDepositBlockDefaultComponent} from "./deposit-block-default/mobile-deposit-block-default.component";


const routes: Routes = [
    {
        path: '',
        component: MobileDepositBlockDefaultComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class MobileDepositBlockRoutingModule {
}
