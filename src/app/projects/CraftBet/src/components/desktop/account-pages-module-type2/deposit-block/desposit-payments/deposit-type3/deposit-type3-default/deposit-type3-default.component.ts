import {Component, Injector } from '@angular/core';
import {BaseDepositType3Component} from '../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type3/base-deposit-type3.component';

@Component({
  selector: 'app-deposit-type3-default',
  templateUrl: './deposit-type3-default.component.html'
})
export class DepositType3DefaultComponent extends BaseDepositType3Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
