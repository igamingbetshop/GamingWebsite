import {Component, Injector } from '@angular/core';
import {BaseDepositType7Component} from "../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type7/base-deposit-type7.component";

@Component({
  selector: 'app-deposit-type7-default',
  templateUrl: './deposit-type7-default.component.html'
})
export class DepositType7DefaultComponent extends BaseDepositType7Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
