import {Component, Injector, OnInit} from '@angular/core';
import {BaseDepositType7Component} from "../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type7/base-deposit-type7.component";

@Component({
  selector: 'app-mobile-deposit-type7-default',
  templateUrl: './mobile-deposit-type7-default.component.html'
})
export class MobileDepositType7DefaultComponent extends BaseDepositType7Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentControllerService.notifyGetCreatePaymentData.subscribe((data) => {
      this.popupCenter('', '', screen.width * 0.5, screen.height * 0.5);
      this.openedWindow.location.href = data['Url'];
    });
  }

}
