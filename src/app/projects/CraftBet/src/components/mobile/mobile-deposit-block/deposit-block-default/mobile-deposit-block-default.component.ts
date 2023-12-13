import {Component, Injector} from '@angular/core';
import {BaseDepositComponent} from "../../../../../../../@theme/components/common/base-deposit/base-deposit.component";
import {LayoutService} from "@core/services/app/layout.service";

import {MobileDepositType1Component} from "../deposit-payments/deposit-type1/mobile-deposit-type1.component";
import {MobileDepositType2Component} from "../deposit-payments/deposit-type2/mobile-deposit-type2.component";
import {MobileDepositType3Component} from "../deposit-payments/deposit-type3/mobile-deposit-type3.component";
import {MobileDepositType4Component} from "../deposit-payments/deposit-type4/mobile-deposit-type4.component";
import {MobileDepositType5Component} from "../deposit-payments/deposit-type5/mobile-deposit-type5.component";
import {MobileDepositType6Component} from "../deposit-payments/deposit-type6/mobile-deposit-type6.component";
import {MobileDepositType7Component} from "../deposit-payments/deposit-type7/mobile-deposit-type7.component";
import {MobileDepositType8Component} from "../deposit-payments/deposit-type8/mobile-deposit-type8.component";
import {MobileDepositType9Component} from "../deposit-payments/deposit-type9/mobile-deposit-type9.component";
import {MobileDepositType10Component} from "../deposit-payments/deposit-type10/mobile-deposit-type10.component";
import {MobileDepositType11Component} from "../deposit-payments/deposit-type11/mobile-deposit-type11.component";
import {MobileDepositType13Component} from "../deposit-payments/deposit-type13/mobile-deposit-type13.component";
import {MobileDepositType15Component} from "../deposit-payments/deposit-type15/mobile-deposit-type15.component";
import {MobileDepositType16Component} from "../deposit-payments/deposit-type16/mobile-deposit-type16.component";
import {MobileDepositType17Component} from "../deposit-payments/deposit-type17/mobile-deposit-type17.component";


@Component({
    selector: 'app-mobile-deposit-block-default',
    templateUrl: './mobile-deposit-block-default.component.html'
})
export class MobileDepositBlockDefaultComponent extends BaseDepositComponent {

    constructor(public injector: Injector, public layoutService: LayoutService) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    createComponent(Id: number, Type: number, ContentType: number, info?: number[]) {
        super.createComponent(Id, Type, ContentType, info);

        switch (Type) {
            case 1: {
                this.componentRef = this.entry.createComponent(MobileDepositType1Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                break;
            }

            case 2: {
                this.componentRef = this.entry.createComponent(MobileDepositType2Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.nominals = info;
                break;
            }

            case 3: {
                this.componentRef = this.entry.createComponent(MobileDepositType3Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                break;
            }

            case 4: {
                this.componentRef = this.entry.createComponent(MobileDepositType4Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                break;
            }

            case 5: {
                this.componentRef = this.entry.createComponent(MobileDepositType5Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                break;
            }

            case 6: {
                this.componentRef = this.entry.createComponent(MobileDepositType6Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                break;
            }

            case 7: {
                this.componentRef = this.entry.createComponent(MobileDepositType7Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                break;
            }

            case 8: {
                this.componentRef = this.entry.createComponent(MobileDepositType8Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                break;
            }

            case 9: {
                this.componentRef = this.entry.createComponent(MobileDepositType9Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                break;
            }

            case 10: {
                this.componentRef = this.entry.createComponent(MobileDepositType10Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                break;
            }

            case 11: {
                this.componentRef = this.entry.createComponent(MobileDepositType11Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                break;
            }
            case 13: {
                this.componentRef = this.entry.createComponent(MobileDepositType13Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                break;
            }
            case 15: {
                this.componentRef = this.entry.createComponent(MobileDepositType15Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                break;
            }
            case 16: {
                this.componentRef = this.entry.createComponent(MobileDepositType16Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                break;
            }
            case 17: {
                this.componentRef = this.entry.createComponent(MobileDepositType17Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.walletAddress = this.currentPayment.Address;
                this.componentRef.instance.DestinationTag = this.currentPayment.DestinationTag;
                break;
            }
        }
    }

}
