import {Component, Injector, OnInit} from '@angular/core';
import {AppCommonPaymentsComponent} from "../../../common/app-common-payments/app-common-payments.component";
import {LayoutService} from "@core/services/app/layout.service";

@Component({
  selector: 'app-mobile-account-page-type1-payments',
  templateUrl: './mobile-account-page-type1-payments.component.html'
})
export class MobileAccountPageType1PaymentsComponent extends AppCommonPaymentsComponent {

  constructor(public injector: Injector, public layoutService:LayoutService) {
    super(injector);
  }

}