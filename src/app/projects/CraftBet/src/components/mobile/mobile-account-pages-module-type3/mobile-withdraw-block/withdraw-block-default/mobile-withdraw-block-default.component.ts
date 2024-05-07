import {Component, Injector} from '@angular/core';
import {BaseWithdrawComponent} from "../../../../../../../../@theme/components/common/base-withdraw/base-withdraw.component";

import {LayoutService} from "@core/services/app/layout.service";
import {MobileWithdrawType1Component} from "../withdraw-payments/withdraw-type1/mobile-withdraw-type1.component";
import {MobileWithdrawType2Component} from "../withdraw-payments/withdraw-type2/mobile-withdraw-type2.component";
import {MobileWithdrawType3Component} from "../withdraw-payments/withdraw-type3/mobile-withdraw-type3.component";
import {MobileWithdrawType4Component} from "../withdraw-payments/withdraw-type4/mobile-withdraw-type4.component";
import {MobileWithdrawType5Component} from "../withdraw-payments/withdraw-type5/mobile-withdraw-type5.component";
import {MobileWithdrawType6Component} from "../withdraw-payments/withdraw-type6/mobile-withdraw-type6.component";
import {MobileWithdrawType7Component} from "../withdraw-payments/withdraw-type7/mobile-withdraw-type7.component";
import {MobileWithdrawType8Component} from "../withdraw-payments/withdraw-type8/mobile-withdraw-type8.component";
import {MobileWithdrawType9Component} from "../withdraw-payments/withdraw-type9/mobile-withdraw-type9.component";
import {MobileWithdrawType10Component} from "../withdraw-payments/withdraw-type10/mobile-withdraw-type10.component";
import {MobileWithdrawType11Component} from "../withdraw-payments/withdraw-type11/mobile-withdraw-type11.component";
import {MobileWithdrawType12Component} from "../withdraw-payments/withdraw-type12/mobile-withdraw-type12.component";
import {MobileWithdrawType13Component} from "../withdraw-payments/withdraw-type13/mobile-withdraw-type13.component";
import {MobileWithdrawType14Component} from "../withdraw-payments/withdraw-type14/mobile-withdraw-type14.component";
import {MobileWithdrawType15Component} from "../withdraw-payments/withdraw-type15/mobile-withdraw-type15.component";
import {MobileWithdrawType16Component} from "../withdraw-payments/withdraw-type16/mobile-withdraw-type16.component";
import {MobileWithdrawType18Component} from "../withdraw-payments/withdraw-type18/mobile-withdraw-type18.component";
import {MobileWithdrawType21Component} from "../withdraw-payments/withdraw-type21/mobile-withdraw-type21.component";
import {MobileWithdrawType22Component} from "../withdraw-payments/withdraw-type22/mobile-withdraw-type22.component";
import {MobileWithdrawType23Component} from "../withdraw-payments/withdraw-type23/mobile-withdraw-type23.component";
import {MobileWithdrawType24Component} from "../withdraw-payments/withdraw-type24/mobile-withdraw-type24.component";
import {MobileWithdrawType20Component} from "../withdraw-payments/withdraw-type20/mobile-withdraw-type20.component";


@Component({
    selector: 'app-mobile-withdraw-block-default',
    templateUrl: './mobile-withdraw-block-default.component.html',
    styleUrls: ['./mobile-withdraw-block-default.component.scss']
})
export class MobileWithdrawBlockDefaultComponent extends BaseWithdrawComponent {

    constructor(public injector: Injector, public layoutService: LayoutService) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    createComponent(Id: number, Type: number, ContentType: number, info?: number[], CommissionPercent?: number) {
        super.createComponent(Id, Type,  ContentType, info, CommissionPercent);
        switch (Type) {
            case 1: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType1Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
            case 2: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType2Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
            case 3: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType3Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
            case 4: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType4Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
            case 5: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType5Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
            case 6: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType6Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
            case 7: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType7Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
            case 8: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType8Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }

            case 9: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType9Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }

            case 10: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType10Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
            case 11: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType11Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
            case 12: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType12Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
            case 13: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType13Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
            case 14: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType14Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.CommissionPercent = CommissionPercent;
                break;
            }
            case 15: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType15Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                break;
            }
            case 16: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType16Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.nominals = info;
                break;
            }
            case 18: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType18Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                break;
            }
            case 20: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType20Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                break;
            }
            case 21: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType21Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                break;
            }
            case 22: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType22Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                break;
            }
            case 23: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType23Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                break;
            }
            case 24: {
                this.componentRef = this.entry.createComponent(MobileWithdrawType24Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = ContentType;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                break;
            }
        }

    }
}
