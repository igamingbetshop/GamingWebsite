import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DepositBlockDefaultComponent} from "./deposit-block-default/deposit-block-default.component";


const routes: Routes = [
    {
        path: '',
        component: DepositBlockDefaultComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class AccountType2DepositBlockRoutingModule {
}
