import {Component, Injector, OnInit} from '@angular/core';
import {BaseDepositType15Component} from "../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type15/base-deposit-type15.component";

@Component({
  selector: 'app-mobile-deposit-type15-default',
  templateUrl: './mobile-deposit-type15-default.component.html',
  styleUrls: ['./mobile-deposit-type15-default.component.scss']
})
export class MobileDepositType15DefaultComponent extends BaseDepositType15Component implements OnInit {

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
