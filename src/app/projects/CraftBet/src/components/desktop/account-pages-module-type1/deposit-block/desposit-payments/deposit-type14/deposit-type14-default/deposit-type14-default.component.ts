import {Component, Injector} from '@angular/core';
import {BaseDepositType14Component} from '../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type14/base-deposit-type14.component';

@Component({
  selector: 'app-deposit-type14-default',
  templateUrl: './deposit-type14-default.component.html',
  styleUrls: ['./deposit-type14-default.component.scss']
})
export class DepositType14DefaultComponent extends BaseDepositType14Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
