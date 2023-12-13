import {Component, Injector} from '@angular/core';
import {BaseDepositType9Component} from '../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type9/base-deposit-type9.component';

@Component({
  selector: 'app-deposit-type9-default',
  templateUrl: './deposit-type9-default.component.html',
  styleUrls: ['./deposit-type9-default.component.scss']
})
export class DepositType9DefaultComponent extends BaseDepositType9Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
