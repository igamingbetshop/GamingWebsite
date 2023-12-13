import {Component, Injector} from '@angular/core';
import {AppCommonPaymentsComponent} from "../../../common/app-common-payments/app-common-payments.component";

@Component({
  selector: 'app-account-page-type1-payments',
  templateUrl: './account-page-type1-payments.component.html'
})
export class AccountPageType1PaymentsComponent extends AppCommonPaymentsComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
