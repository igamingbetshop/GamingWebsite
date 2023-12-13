import {Component, Injector } from '@angular/core';
import {BaseDepositType6Component} from "../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type6/base-deposit-type6.component";

@Component({
  selector: 'app-deposit-type6-default',
  templateUrl: './deposit-type6-default.component.html'
})
export class DepositType6DefaultComponent extends BaseDepositType6Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
