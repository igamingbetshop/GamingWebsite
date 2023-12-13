import {Component, OnInit} from '@angular/core';
import {BaseBankAccounts} from "../../../../../../../@theme/components/common/base-bank-accounts/base-bank-accounts";
import {MobileAccountPageType1AddBankAccountComponent} from "../add-bank-account/mobile-account-page-type1-add-bank-account.component";


@Component({
  selector: 'app-mobile-account-page-type1-banks-accounts',
  templateUrl: './mobile-account-page-type1-banks-accounts.component.html'
})
export class MobileAccountPageType1BanksAccountsComponent extends BaseBankAccounts implements OnInit {

  addAccount() {
    this.selectedBankAccount = undefined;
    super.addAccount(MobileAccountPageType1AddBankAccountComponent);
  }
  editBank(account) {
    this.addBankAccount = true;
    this.isEditMode = true;
    this.selectedBankAccount = account;
    super.addAccount(MobileAccountPageType1AddBankAccountComponent);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.router.url === '/user/1/bankAccounts?openBankAccounts=true') {
      this.addAccount();
    }
  }

}
