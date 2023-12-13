import {Component, Injector } from '@angular/core';
import {BaseDepositType2Component} from "../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type2/base-deposit-type2.component";

@Component({
  selector: 'app-mobile-deposit-type2-default',
  templateUrl: './mobile-deposit-type2-default.component.html'
})
export class MobileDepositType2DefaultComponent extends BaseDepositType2Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
