import {Component, Injector} from '@angular/core';
import {
  BaseDepositType17Component
} from "../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type17/base-deposit-type17.component";

@Component({
  selector: 'app-mobile-deposit-type17-default',
  templateUrl: './mobile-deposit-type17-default.component.html',
  styleUrls: ['./mobile-deposit-type17-default.component.scss']
})
export class MobileDepositType17DefaultComponent extends BaseDepositType17Component {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
