import {Component, Injector } from '@angular/core';
import {BaseDepositType1Component} from "../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type1/base-deposit-type1.component";

@Component({
  selector: 'app-mobile-deposit-type1-default',
  templateUrl: './mobile-deposit-type1-default.component.html'
})
export class MobileDepositType1DefaultComponent  extends BaseDepositType1Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
