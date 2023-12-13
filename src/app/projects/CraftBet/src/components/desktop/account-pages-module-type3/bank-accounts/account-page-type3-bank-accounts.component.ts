import { Component, OnInit } from '@angular/core';
import { BaseBankAccounts } from '../../../../../../../@theme/components/common/base-bank-accounts/base-bank-accounts';

@Component({
  selector: 'app-account-page-type3-bank-accounts',
  templateUrl: './account-page-type3-bank-accounts.component.html',
  styleUrls: ['./account-page-type3-bank-accounts.component.scss']
})
export class AccountPageType3BankAccountsComponent extends BaseBankAccounts implements OnInit {

  ngOnInit(): void {
    super.ngOnInit();
  }

  addAccount() {
    this.addBankAccount = true;
  }

  closeAddPage() {
    this.addBankAccount = false;
  }

}
