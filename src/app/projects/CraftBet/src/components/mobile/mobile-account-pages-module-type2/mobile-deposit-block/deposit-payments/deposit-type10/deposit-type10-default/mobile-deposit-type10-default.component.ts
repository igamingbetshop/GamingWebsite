import {Component, Injector } from '@angular/core';
import {BaseDepositType10Component} from "../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type10/base-deposit-type10.component";

@Component({
  selector: 'app-mobile-deposit-type10-default',
  templateUrl: './mobile-deposit-type10-default.component.html'
})
export class MobileDepositType10DefaultComponent extends BaseDepositType10Component {

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
