import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {WithdrawBlockDefaultComponent} from './withdraw-block-default/withdraw-block-default.component';


const routes: Routes = [
  {
    path: '',
    component: WithdrawBlockDefaultComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AccountType1WithdrawBlockRoutingModule {
}
