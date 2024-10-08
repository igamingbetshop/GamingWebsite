import { Component, Injector } from '@angular/core';
import {
  BaseDepositType19Component
} from '../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type19/base-deposit-type19.component';

@Component({
  selector: 'app-deposit-type19-default',
  templateUrl: './deposit-type19-default.component.html',
  styleUrl: './deposit-type19-default.component.scss'
})
export class DepositType19DefaultComponent extends BaseDepositType19Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
