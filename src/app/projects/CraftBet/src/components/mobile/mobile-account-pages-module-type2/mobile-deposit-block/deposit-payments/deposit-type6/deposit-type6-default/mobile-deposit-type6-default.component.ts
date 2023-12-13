import {Component, Injector, OnInit} from '@angular/core';
import {BaseDepositType6Component} from "../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type6/base-deposit-type6.component";

@Component({
  selector: 'app-mobile-deposit-type6-default',
  templateUrl: './mobile-deposit-type6-default.component.html'
})
export class MobileDepositType6DefaultComponent extends BaseDepositType6Component {

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
