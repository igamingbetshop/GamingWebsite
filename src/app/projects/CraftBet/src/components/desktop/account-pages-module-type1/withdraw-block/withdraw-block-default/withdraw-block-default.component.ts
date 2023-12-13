import {Component, Injector} from '@angular/core';
import {BaseWithdrawComponent} from "../../../../../../../../@theme/components/common/base-withdraw/base-withdraw.component";
import {WithdrawType1Component} from "../withdraw-payments/withdraw-type1/withdraw-type1.component";
import {WithdrawType2Component} from "../withdraw-payments/withdraw-type2/withdraw-type2.component";
import {WithdrawType3Component} from "../withdraw-payments/withdraw-type3/withdraw-type3.component";
import {WithdrawType4Component} from "../withdraw-payments/withdraw-type4/withdraw-type4.component";
import {WithdrawType5Component} from "../withdraw-payments/withdraw-type5/withdraw-type5.component";
import {WithdrawType6Component} from "../withdraw-payments/withdraw-type6/withdraw-type6.component";
import {WithdrawType7Component} from "../withdraw-payments/withdraw-type7/withdraw-type7.component";
import {WithdrawType8Component} from "../withdraw-payments/withdraw-type8/withdraw-type8.component";
import {WithdrawType9Component} from "../withdraw-payments/withdraw-type9/withdraw-type9.component";
import {WithdrawType10Component} from "../withdraw-payments/withdraw-type10/withdraw-type10.component";
import {WithdrawType11Component} from "../withdraw-payments/withdraw-type11/withdraw-type11.component";
import {WithdrawType12Component} from "../withdraw-payments/withdraw-type12/withdraw-type12.component";
import {WithdrawType13Component} from "../withdraw-payments/withdraw-type13/withdraw-type13.component";
import {WithdrawType14Component} from "../withdraw-payments/withdraw-type14/withdraw-type14.component";
import {WithdrawType15Component} from "../withdraw-payments/withdraw-type15/withdraw-type15.component";
import {WithdrawType16Component} from "../withdraw-payments/withdraw-type16/withdraw-type16.component";
import {WithdrawType17Component} from "../withdraw-payments/withdraw-type17/withdraw-type17.component";
import {WithdrawType18Component} from "../withdraw-payments/withdraw-type18/withdraw-type18.component";
import {WithdrawType21Component} from "../withdraw-payments/withdraw-type21/withdraw-type21.component";
import {WithdrawType22Component} from "../withdraw-payments/withdraw-type22/withdraw-type22.component";
import {WithdrawType23Component} from "../withdraw-payments/withdraw-type23/withdraw-type23.component";
import {WithdrawType24Component} from "../withdraw-payments/withdraw-type24/withdraw-type24.component";
import {WithdrawType25Component} from "../withdraw-payments/withdraw-type25/withdraw-type25.component";
import {WithdrawType20Component} from "../withdraw-payments/withdraw-type20/withdraw-type20.component";

@Component({
    selector: 'app-withdraw-block-default',
    templateUrl: './withdraw-block-default.component.html'
})
export class WithdrawBlockDefaultComponent extends BaseWithdrawComponent {

    constructor(public injector: Injector) {
        super(injector);
    }

    ngOnInit()
    {
        super.ngOnInit();
    }

    createComponent(Id: number, Type: number, info?: number[], maxMinAmount?: any) {
        super.createComponent(Id, Type, info, maxMinAmount);
        switch (Type) {
            case 1: {
                this.componentRef = this.entry.createComponent(WithdrawType1Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 2: {
                this.componentRef = this.entry.createComponent(WithdrawType2Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 3: {
                this.componentRef = this.entry.createComponent(WithdrawType3Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 4: {
                this.componentRef = this.entry.createComponent(WithdrawType4Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 5: {
                this.componentRef = this.entry.createComponent(WithdrawType5Component);
                this.componentRef.instance.paymentSystemId = Id;
                break;
            }
            case 6: {
                this.componentRef = this.entry.createComponent(WithdrawType6Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 7: {
                this.componentRef = this.entry.createComponent(WithdrawType7Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 8: {
                this.componentRef = this.entry.createComponent(WithdrawType8Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }

            case 9: {
                this.componentRef = this.entry.createComponent(WithdrawType9Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }

            case 10: {
                this.componentRef = this.entry.createComponent(WithdrawType10Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 11: {
                this.componentRef = this.entry.createComponent(WithdrawType11Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 12: {
                this.componentRef = this.entry.createComponent(WithdrawType12Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 13: {
                this.componentRef = this.entry.createComponent(WithdrawType13Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 14: {
                this.componentRef = this.entry.createComponent(WithdrawType14Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 15: {
                this.componentRef = this.entry.createComponent(WithdrawType15Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 16: {
                this.componentRef = this.entry.createComponent(WithdrawType16Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 17: {
                this.componentRef = this.entry.createComponent(WithdrawType17Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 18: {
                this.componentRef = this.entry.createComponent(WithdrawType18Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 20: {
                this.componentRef = this.entry.createComponent(WithdrawType20Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 21: {
                this.componentRef = this.entry.createComponent(WithdrawType21Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 22: {
                this.componentRef = this.entry.createComponent(WithdrawType22Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 23: {
                this.componentRef = this.entry.createComponent(WithdrawType23Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 24: {
                this.componentRef = this.entry.createComponent(WithdrawType24Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
            case 25: {
                this.componentRef = this.entry.createComponent(WithdrawType25Component);
                this.componentRef.instance.paymentSystemId = Id;
                this.componentRef.instance.contentType = Type;
                this.componentRef.instance.nominals = info;
                this.componentRef.instance.maxMinAmount = maxMinAmount;
                break;
            }
        }
    }
}
