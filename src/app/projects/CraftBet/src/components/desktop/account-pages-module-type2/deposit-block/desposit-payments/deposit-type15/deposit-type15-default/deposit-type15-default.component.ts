import {Component, Injector, OnInit} from '@angular/core';
import {BaseDepositType15Component} from "../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type15/base-deposit-type15.component";

@Component({
  selector: 'app-deposit-type15-default',
  templateUrl: './deposit-type15-default.component.html',
  styleUrls: ['./deposit-type15-default.component.scss']
})
export class DepositType15DefaultComponent extends BaseDepositType15Component implements OnInit {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
