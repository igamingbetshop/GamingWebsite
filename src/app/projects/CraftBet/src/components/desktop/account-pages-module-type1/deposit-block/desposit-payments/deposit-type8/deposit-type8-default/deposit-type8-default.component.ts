import {Component, Injector } from '@angular/core';
import {BaseDepositType8Component} from "../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type8/base-deposit-type8.component";

@Component({
  selector: 'app-deposit-type8-default',
  templateUrl: './deposit-type8-default.component.html'
})
export class DepositType8DefaultComponent extends BaseDepositType8Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }


}
