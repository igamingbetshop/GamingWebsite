import {Component, Injector} from '@angular/core';
import {BaseDepositType10Component} from "../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type10/base-deposit-type10.component";

@Component({
  selector: 'app-deposit-type10-default',
  templateUrl: './deposit-type10-default.component.html',
  styleUrls: ['./deposit-type10-default.component.scss']
})
export class DepositType10DefaultComponent extends BaseDepositType10Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit()
  {
    super.ngOnInit();
  }

}
