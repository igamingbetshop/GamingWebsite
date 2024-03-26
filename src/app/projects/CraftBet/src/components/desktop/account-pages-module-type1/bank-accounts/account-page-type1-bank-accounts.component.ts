import {Component, OnInit} from '@angular/core';
import {BaseBankAccounts} from "../../../../../../../@theme/components/common/base-bank-accounts/base-bank-accounts";

@Component({
  selector: 'app-account-page-type1-bank-accounts',
  templateUrl: './account-page-type1-bank-accounts.component.html'
})

export class AccountPageType1BankAccountsComponent extends BaseBankAccounts implements OnInit {

  addAccount() {
    this.addBankAccount = true;
    this.router.navigate(
        [],
        { relativeTo: this.route, queryParams: { openBankAccounts: this.addBankAccount } }
    );
  }
  closeAddPage() {
    this.addBankAccount = false;
    const snapshot = this.route.snapshot;
    const params = { ...snapshot.queryParams };
    delete params.openBankAccounts;
    this.router.navigate([], { queryParams: params });
    this.selectedBankAccount = undefined;
  }

  ngOnInit()
  {
    super.ngOnInit();
    if (this.router.url === '/user/1/bankAccounts?openBankAccounts=true') {
      this.addBankAccount = true;
    }
    this.subscriptions.push(this.paymentService.notifyAddBankAccount$.subscribe(data => {
      if (data === true)
      {
        this.closeAddPage();
      }
    }));
  }
}
