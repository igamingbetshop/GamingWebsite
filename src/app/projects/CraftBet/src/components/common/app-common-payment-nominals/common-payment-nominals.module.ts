import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppCommonPaymentNominalsComponent} from "./app-common-payment-nominals.component";

@NgModule({
  declarations:[AppCommonPaymentNominalsComponent],
  exports:[AppCommonPaymentNominalsComponent],
  imports:[
    CommonModule,
  ]
})

export class CommonPaymentNominalsModule
{

}
