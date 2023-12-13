import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { ConfirmModel } from '../../../../../../@core/interfaces';

@Component({
  selector: 'app-app-common-bank-message-modal',
  templateUrl: './app-common-bank-message-modal.component.html',
  styleUrls: ['./app-common-bank-message-modal.component.scss']
})
export class AppCommonBankMessageModalComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  public title: string;
  public message: boolean;
  public data: any;

  constructor()
  {
    super();
  }

  ngOnInit(): void {
  }

  saveChanges()
  {
    this.data.data.data.paymentService.removeBankAccount(this.data.data.data.accountId);
    const index = this.data.data.data.paymentService.bankAccounts.findIndex((item) => {
        return item.Id === this.data.data.data.accountId;
    });
    this.data.data.data.paymentService.bankAccounts.splice(index, 1);
    this.close();
  }

}
