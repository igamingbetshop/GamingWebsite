import {Component, Injector } from '@angular/core';
import {BaseDepositType3Component} from "../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type3/base-deposit-type3.component";

@Component({
  selector: 'app-mobile-deposit-type3-default',
  templateUrl: './mobile-deposit-type3-default.component.html'
})
export class MobileDepositType3DefaultComponent extends BaseDepositType3Component {

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
