import {Component, Injector} from '@angular/core';
import {BaseDepositType11Component} from "../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type11/base-deposit-type11.component";

@Component({
  selector: 'app-mobile-deposit-type11-default',
  templateUrl: './mobile-deposit-type11-default.component.html',
  styleUrls: ['./mobile-deposit-type11-default.component.scss']
})
export class MobileDepositType11DefaultComponent extends BaseDepositType11Component{

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
