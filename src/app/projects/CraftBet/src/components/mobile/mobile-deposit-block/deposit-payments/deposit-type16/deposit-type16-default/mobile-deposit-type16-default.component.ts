import {Component, Injector} from '@angular/core';
import {BaseDepositType16Component} from "../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type16/base-deposit-type16.component";

@Component({
  selector: 'app-mobile-deposit-type16-default',
  templateUrl: './mobile-deposit-type16-default.component.html',
  styleUrls: ['./mobile-deposit-type16-default.component.scss']
})
export class MobileDepositType16DefaultComponent extends BaseDepositType16Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
