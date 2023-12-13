import {Component, Injector} from '@angular/core';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {BaseDepositComponent} from "../../../../../../../../@theme/components/common/base-deposit/base-deposit.component";

@Component({
  selector: 'app-deposit-block-default',
  templateUrl: './deposit-block-default.component.html'
})
export class DepositBlockDefaultComponent extends BaseDepositComponent {
  public faCaretDown = faCaretDown;
  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  createComponent(Id: number, Type: number, ContentType: number, info?:number[], maxMinAmount?: any) {

  }

  getPayments()
  {
    super.getPayments();
  }

  selectPayment(paymentData, changeUrl: boolean = true) {
    super.selectPayment(paymentData, false);
  }


}
