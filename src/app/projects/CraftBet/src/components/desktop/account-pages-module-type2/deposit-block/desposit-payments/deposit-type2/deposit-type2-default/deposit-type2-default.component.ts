import {Component, Injector} from '@angular/core';
import {BaseDepositType2Component} from '../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type2/base-deposit-type2.component';

@Component({
  selector: 'app-deposit-type2-default',
  templateUrl: './deposit-type2-default.component.html'
})
export class DepositType2DefaultComponent extends BaseDepositType2Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
