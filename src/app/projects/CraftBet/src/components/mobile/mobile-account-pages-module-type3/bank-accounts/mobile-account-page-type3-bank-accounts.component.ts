import { Component, OnInit } from '@angular/core';
import { BaseBankAccounts } from '../../../../../../../@theme/components/common/base-bank-accounts/base-bank-accounts';
import { MobileAccountPageType3AddBankAccountsComponent } from '../add-bank-accounts/mobile-account-page-type3-add-bank-accounts.component';

@Component({
  selector: 'app-mobile-account-page-type3-bank-accounts',
  templateUrl: './mobile-account-page-type3-bank-accounts.component.html',
  styleUrls: ['./mobile-account-page-type3-bank-accounts.component.scss']
})
export class MobileAccountPageType3BankAccountsComponent extends BaseBankAccounts implements OnInit {

  ngOnInit(): void {
    super.ngOnInit();
    window.scroll(0,0);
  }

  addAccount() {
    super.addAccount(MobileAccountPageType3AddBankAccountsComponent);
  }

}
