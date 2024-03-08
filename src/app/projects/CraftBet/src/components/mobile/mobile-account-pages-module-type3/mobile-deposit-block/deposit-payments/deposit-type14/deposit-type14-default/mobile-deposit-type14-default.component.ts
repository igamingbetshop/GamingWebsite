import {Component, Injector} from '@angular/core';
import {BaseDepositType14Component} from "../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type14/base-deposit-type14.component";

@Component({
  selector: 'app-mobile-deposit-type14-default',
  templateUrl: './mobile-deposit-type14-default.component.html',
  styleUrls: ['./mobile-deposit-type14-default.component.scss']
})
export class MobileDepositType14DefaultComponent extends BaseDepositType14Component{

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
