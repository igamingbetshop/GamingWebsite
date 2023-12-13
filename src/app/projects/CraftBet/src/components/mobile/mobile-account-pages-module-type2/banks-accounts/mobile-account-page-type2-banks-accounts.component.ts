import {Component} from '@angular/core';

import {MobileAccountPageType2AddBankAccountComponent} from "../add-bank-account/mobile-account-page-type2-add-bank-account.component";
import {BaseBankAccounts} from "../../../../../../../@theme/components/common/base-bank-accounts/base-bank-accounts";

@Component({
    selector: 'app-mobile-account-page-type2-banks-accounts',
    templateUrl: './mobile-account-page-type2-banks-accounts.component.html'
})
export class MobileAccountPageType2BanksAccountsComponent extends BaseBankAccounts {

    addAccount() {
        super.addAccount(MobileAccountPageType2AddBankAccountComponent);
    }
}
