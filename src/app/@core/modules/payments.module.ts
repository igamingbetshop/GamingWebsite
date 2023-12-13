import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaymentControllerService} from "../services/app/paymentController.services";
import {WithdrawsResolver} from "../services/resolves/withdraws-resolver.service";
import {ActiveWithdrawsResolver} from "../services/resolves/active_withdraws-resolver.service";
import {GetPaymentsService} from "../services/app/getPayments.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    PaymentControllerService,
    WithdrawsResolver,
    ActiveWithdrawsResolver,
    GetPaymentsService
  ]
})
export class PaymentsModule {

}
