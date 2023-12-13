import {Component, Injector} from '@angular/core';
import {BaseDepositType11Component} from '../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type11/base-deposit-type11.component';

@Component({
  selector: 'app-deposit-type11-default',
  templateUrl: './deposit-type11-default.component.html',
  styleUrls: ['./deposit-type11-default.component.scss']
})
export class DepositType11DefaultComponent extends BaseDepositType11Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
