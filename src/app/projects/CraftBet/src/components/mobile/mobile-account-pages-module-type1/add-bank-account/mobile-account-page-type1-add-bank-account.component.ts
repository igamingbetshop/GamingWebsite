import {Component} from '@angular/core';
import {BaseAddBankAccountComponent} from "../../../../../../../@theme/components/common/base-add-bank-account/base-add-bank-account.component";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-mobile-account-page-type1-add-bank-account',
    templateUrl: './mobile-account-page-type1-add-bank-account.component.html'
})
export class MobileAccountPageType1AddBankAccountComponent extends BaseAddBankAccountComponent {
    public faTimes = faTimes;

    closeAddPage() {
        const snapshot = this.route.snapshot;
        const params = {...snapshot.queryParams};
        delete params.openBankAccounts;
        this.router.navigate([], {queryParams: params});
        this.selectedBankAccount = undefined;
        this.dialogRef.close();
    }
}
