import {Component, Injector} from '@angular/core';
import {BaseWithdrawType6Component} from "../../../../../../../../../../@theme/components/common/base_withdraw_payments/base-withdraw-type6/base-withdraw-type6.component";

@Component({
    selector: 'app-withdraw-type6-default',
    templateUrl: './withdraw-type6-default.component.html'
})
export class WithdrawType6DefaultComponent extends BaseWithdrawType6Component {

    public paymentSystemId: number;
    public regionValue: '';
    public betshopValue: '';

    constructor(public injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    changeRegion(betShop) {
        this.selectedBetShopRegion = betShop['Betshops'];
    }

}
