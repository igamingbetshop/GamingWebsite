import {Component, Injector } from '@angular/core';
import {AppCommonPaymentsComponent} from "../../../common/app-common-payments/app-common-payments.component";

@Component({
  selector: 'app-account-page-type2-payments',
  templateUrl: './account-page-type2-payments.component.html',
})
export class AccountPageType2PaymentsComponent extends AppCommonPaymentsComponent {

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
