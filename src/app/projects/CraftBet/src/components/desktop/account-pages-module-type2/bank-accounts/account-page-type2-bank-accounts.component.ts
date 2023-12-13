import { Component  } from '@angular/core';
import {BaseBankAccounts} from "../../../../../../../@theme/components/common/base-bank-accounts/base-bank-accounts";

@Component({
  selector: 'app-account-page-type2-bank-accounts',
  templateUrl: './account-page-type2-bank-accounts.component.html'
})
export class AccountPageType2BankAccountsComponent extends BaseBankAccounts
{

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
    if (this.router.url === '/user/2/bankAccounts?openBankAccounts=true') {
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
