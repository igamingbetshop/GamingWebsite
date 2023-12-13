import {Component, Injector} from '@angular/core';
import {BaseDepositType17Component} from '../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type17/base-deposit-type17.component';

@Component({
  selector: 'app-deposit-type17-default',
  templateUrl: './deposit-type17-default.component.html',
  styleUrls: ['./deposit-type17-default.component.scss']
})
export class DepositType17DefaultComponent extends BaseDepositType17Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
