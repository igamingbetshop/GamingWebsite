import {Component, Injector, OnInit} from '@angular/core';
import {BaseDepositType8Component} from "../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type8/base-deposit-type8.component";

@Component({
  selector: 'app-mobile-deposit-type8-default',
  templateUrl: './mobile-deposit-type8-default.component.html'
})
export class MobileDepositType8DefaultComponent extends BaseDepositType8Component {

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
