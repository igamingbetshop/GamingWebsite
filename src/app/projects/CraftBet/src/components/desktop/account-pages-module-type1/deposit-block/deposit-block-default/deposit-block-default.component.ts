import {Component, Injector, OnInit} from '@angular/core';
import {BaseDepositComponent} from "../../../../../../../../@theme/components/common/base-deposit/base-deposit.component";
import {DepositType1Component} from "../desposit-payments/deposit-type1/deposit-type1.component";
import {DepositType2Component} from "../desposit-payments/deposit-type2/deposit-type2.component";
import {DepositType3Component} from "../desposit-payments/deposit-type3/deposit-type3.component";
import {DepositType4Component} from "../desposit-payments/deposit-type4/deposit-type4.component";
import {DepositType5Component} from "../desposit-payments/deposit-type5/deposit-type5.component";
import {DepositType6Component} from "../desposit-payments/deposit-type6/deposit-type6.component";
import {DepositType7Component} from "../desposit-payments/deposit-type7/deposit-type7.component";
import {DepositType8Component} from "../desposit-payments/deposit-type8/deposit-type8.component";
import {DepositType9Component} from "../desposit-payments/deposit-type9/deposit-type9.component";
import {DepositType10Component} from "../desposit-payments/deposit-type10/deposit-type10.component";
import {DepositType11Component} from "../desposit-payments/deposit-type11/deposit-type11.component";
import {DepositType13Component} from "../desposit-payments/deposit-type13/deposit-type13.component";
import {DepositType14Component} from "../desposit-payments/deposit-type14/deposit-type14.component";
import {DepositType15Component} from "../desposit-payments/deposit-type15/deposit-type15.component";
import {DepositType16Component} from "../desposit-payments/deposit-type16/deposit-type16.component";
import {DepositType17Component} from "../desposit-payments/deposit-type17/deposit-type17.component";

@Component({
  selector: 'app-deposit-block-default',
  templateUrl: './deposit-block-default.component.html'
})
export class DepositBlockDefaultComponent extends BaseDepositComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.scrollToTop();
  }

  createComponent(Id: number, Type: number, ContentType: number, info?:number[], maxMinAmount?: any) {
    super.createComponent(Id, Type, ContentType, info, maxMinAmount);
    switch (Type) {
      case 1: {
        this.componentRef = this.entry.createComponent(DepositType1Component);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        break;
      }

      case 2: {
        this.componentRef = this.entry.createComponent(DepositType2Component);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.nominals = info;
        this.componentRef.instance.maxMinAmount = maxMinAmount;
        break;
      }

      case 3: {
        this.componentRef = this.entry.createComponent(DepositType3Component);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.maxMinAmount = maxMinAmount;
        break;
      }

      case 4: {
        this.componentRef = this.entry.createComponent(DepositType4Component);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        break;
      }

      case 5: {
        this.componentRef = this.entry.createComponent(DepositType5Component);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        break;
      }

      case 6: {
        this.componentRef = this.entry.createComponent(DepositType6Component);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.maxMinAmount = maxMinAmount;
        break;
      }

      case 7: {
        this.componentRef = this.entry.createComponent(DepositType7Component);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.maxMinAmount = maxMinAmount;
        break;
      }

      case 8: {
        this.componentRef = this.entry.createComponent(DepositType8Component);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.maxMinAmount = maxMinAmount;
        break;
      }

      case 9: {
        this.componentRef = this.entry.createComponent(DepositType9Component);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.maxMinAmount = maxMinAmount;
        break;
      }

      case 10: {
        this.componentRef = this.entry.createComponent(DepositType10Component);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        break;
      }

      case 11: {
        this.componentRef = this.entry.createComponent(DepositType11Component);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.maxMinAmount = maxMinAmount;
        break;
      }
      case 13: {
        this.componentRef = this.entry.createComponent(DepositType13Component);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.maxMinAmount = maxMinAmount;
        break;
      }
      case 14: {
        this.componentRef = this.entry.createComponent(DepositType14Component);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.maxMinAmount = maxMinAmount;
        break;
      }
      case 15: {
        this.componentRef = this.entry.createComponent(DepositType15Component);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.maxMinAmount = maxMinAmount;
        break;
      }
      case 16: {
        this.componentRef = this.entry.createComponent(DepositType16Component);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.maxMinAmount = maxMinAmount;
        break;
      }
      case 17: {
        this.componentRef = this.entry.createComponent(DepositType17Component);
        this.componentRef.instance.paymentSystemId = Id;
        this.componentRef.instance.contentType = ContentType;
        this.componentRef.instance.maxMinAmount = maxMinAmount;
        this.componentRef.instance.walletAddress = this.currentPayment.Address;
        this.componentRef.instance.DestinationTag = this.currentPayment.DestinationTag;
        break;
      }
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

}
