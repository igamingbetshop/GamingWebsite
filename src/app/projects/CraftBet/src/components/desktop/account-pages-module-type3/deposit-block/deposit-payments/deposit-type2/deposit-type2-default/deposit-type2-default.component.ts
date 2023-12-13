import {Component, Injector} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BaseDepositType2Component} from '../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type2/base-deposit-type2.component';
import {GetPaymentsService} from '../../../../../../../../../../@core/services/app/getPayments.service';
import {LocalStorageService, SaveData} from '../../../../../../../../../../@core/services';
import {Controllers, Methods} from "../../../../../../../../../../@core/enums";
import {BaseApiService} from "../../../../../../../../../../@core/services/api/base-api.service";
import {take} from "rxjs";

@Component({
    selector: 'app-deposit-type2-default',
    templateUrl: './deposit-type2-default.component.html',
    styleUrls: ['./deposit-type2-default.component.scss']
})
export class DepositType2DefaultComponent extends BaseDepositType2Component {
    public translate: TranslateService;
    public getPaymentsService: GetPaymentsService;
    public savedDateService: SaveData;
    public localStorageService: LocalStorageService;
    public baseApiService: BaseApiService;
    public bankTransferValue = false;
    messageKey;
    public banks = [];
    public userData;
    public depositLimit;

    constructor(public injector: Injector) {
        super(injector);
        this.translate = injector.get(TranslateService);
        this.getPaymentsService = injector.get(GetPaymentsService);
        this.savedDateService = injector.get(SaveData);
        this.localStorageService = injector.get(LocalStorageService);
        this.userData = this.localStorageService.get('user');
        this.baseApiService = injector.get(BaseApiService);
    }

    ngOnInit() {
        super.ngOnInit();
        // this.baseApiService.apiRequest('', Controllers.CLIENT, Methods.GET_DEPOSIT_LIMITS).pipe(take(1)).subscribe((data) => {
        //     this.depositLimit = data.ResponseObject;
        //     this.translate.get('User.Deposit-Self-Limitation').subscribe((res: string) => {
        //         let currentValue = null;
        //         if (this.depositLimit.DailyDepositLimitAmountLeft != null && this.depositLimit.MonthlyDepositLimitAmountLeft != null && this.depositLimit.WeeklyDepositLimitAmountLeft != null) {
        //             currentValue = Math.min(this.depositLimit.DailyDepositLimitAmountLeft, this.depositLimit.MonthlyDepositLimitAmountLeft, this.depositLimit.WeeklyDepositLimitAmountLeft);
        //         } else {
        //             const non_null_limits = [this.depositLimit.DailyDepositLimitAmountLeft, this.depositLimit.MonthlyDepositLimitAmountLeft, this.depositLimit.WeeklyDepositLimitAmountLeft].filter(Boolean);
        //             if (non_null_limits.length > 0) {
        //                 currentValue = Math.min(...non_null_limits);
        //             } else {
        //                 currentValue = 0;
        //             }
        //         }
        //         const smallestLimitString = currentValue.toString();
        //         this.messageKey = res.replace('value', smallestLimitString);
        //     });
        // });
        this.getPaymentsService.getBanks(11);
        this.getPaymentsService.notifyGetBanksList$.subscribe((data) => {
            this.banks = data;
        });
    }

    showBankTransfer() {
        this.bankTransferValue = true;
    }

    async redirectToSelfLimitation() {
        const { AccountPageType3DefaultComponent } = await import('../../../../default/account-page-type3-default.component');
        this.simpleModalService.removeAll().then();
        setTimeout(() => {
            this.simpleModalService.addModal(AccountPageType3DefaultComponent,
                {title: 'self-limitation'}, {closeOnClickOutside: true}).subscribe(() => {
            });
            this.savedDateService.selectedItem.Href = 'self-limitation';
        }, 100);
    }

    onKeyDown(event: any, controlName: string) {
        const input = event.target as HTMLInputElement;
        const value = input.value;
        const maxLen = 11;

        if (value.length > maxLen) {
            input.value = value.substr(0, maxLen);
        }

        if (value.length >= 7 && value.indexOf('.') === -1) {
            const newValue = value.replace(/(\d{1,6})(\d{1,4})?(\d{1,4})?(\d{1,4})?/, (match, p1, p2, p3, p4) => {
                let result = p1;
                if (p2) result += '.' + p2;
                if (p3) result += '.' + p3;
                if (p4) result += '.' + p4;
                return result;
            });
            input.value = newValue;
        }
        this.paymentForm.controls[controlName].setValue(input.value);
    }

    onInput(event) {
        const input = event.target as HTMLInputElement;
        const value = input.value;
        const maxLength = 11;
        const key = event.key;
        if (value.length >= maxLength) {
            event.preventDefault();
        }
    }

    preventKeys(event: KeyboardEvent) {
        const key = event.key;
        const input = event.target as HTMLInputElement;
        const value = input.value;
        if (key === '+' || key === '-') {
            event.preventDefault();
        }
    }

    inputChanging(event) {
        const key = event.key;
        const input = event.target as HTMLInputElement;
        const value = input.value;
        const digits = value.replace(/[^\d.]/g, '');
        const parts = digits.split('.');
        if (parts.length > 1) {
            parts[1] = parts[1].slice(0, 4);
        } else {
            if (value.startsWith('0') && key !== '.') {
                if (value === '0') {
                    event.preventDefault();
                    return;
                }
                const newValue1 = value.slice(1);
                input.value = newValue1;
                event.preventDefault();
                return;
            }
        }
        const newValue = parts.join('.');
        if (newValue !== value) {
            input.value = newValue;
            event.preventDefault();
        }
    }

}
