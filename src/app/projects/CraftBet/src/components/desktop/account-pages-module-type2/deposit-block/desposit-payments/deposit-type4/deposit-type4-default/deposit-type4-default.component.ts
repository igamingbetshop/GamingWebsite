import {Component, Injector, OnInit} from '@angular/core';
import {BaseDepositType4Component} from '../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type4/base-deposit-type4.component';

@Component({
  selector: 'app-deposit-type4-default',
  templateUrl: './deposit-type4-default.component.html'
})
export class DepositType4DefaultComponent extends BaseDepositType4Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}