import {Component, Injector } from '@angular/core';
import {BaseDepositType5Component} from '../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type5/base-deposit-type5.component';

@Component({
  selector: 'app-deposit-type5-default',
  templateUrl: './deposit-type5-default.component.html'
})
export class DepositType5DefaultComponent extends BaseDepositType5Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
