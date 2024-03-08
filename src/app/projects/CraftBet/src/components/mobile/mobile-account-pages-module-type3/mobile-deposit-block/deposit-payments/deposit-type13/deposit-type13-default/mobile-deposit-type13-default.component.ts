import {Component, Injector} from '@angular/core';
import {BaseDepositType13Component} from "../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type13/base-deposit-type13.component";

@Component({
  selector: 'app-mobile-deposit-type13-default',
  templateUrl: './mobile-deposit-type13-default.component.html',
  styleUrls: ['./mobile-deposit-type13-default.component.scss']
})
export class MobileDepositType13DefaultComponent extends BaseDepositType13Component{

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
