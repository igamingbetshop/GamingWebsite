import {Component, inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-app-common-bank-message-modal',
  templateUrl: './app-common-bank-message-modal.component.html',
  styleUrls: ['./app-common-bank-message-modal.component.scss']
})
export class AppCommonBankMessageModalComponent  {
  data:any = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<AppCommonBankMessageModalComponent>);

  saveChanges()
  {
    this.data.bank.data.data.paymentService.removeBankAccount(this.data.bank.data.data.accountId);
    const index = this.data.bank.data.data.paymentService.bankAccounts.findIndex((item:any) => {
        return item.Id === this.data.bank.data.accountId;
    });
    this.data.bank.data.data.paymentService.bankAccounts.splice(index, 1);
    this.close();
  }
  close()
  {
    this.dialogRef.close();
  }

}
