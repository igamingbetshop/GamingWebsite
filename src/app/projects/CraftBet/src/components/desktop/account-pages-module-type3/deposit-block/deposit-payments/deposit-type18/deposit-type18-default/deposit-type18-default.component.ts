import {Component, Injector} from '@angular/core';
import {BaseDepositType18Component} from '../../../../../../../../../../@theme/components/common/base_deposit_payment/base-deposit-type18/base-deposit-type18.component';
import {Controllers, Methods} from "../../../../../../../../../../@core/enums";
import {take} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {SaveData} from "../../../../../../../../../../@core/services";
import {BaseApiService} from "../../../../../../../../../../@core/services/api/base-api.service";
import {SimpleModalService} from "ngx-simple-modal";

@Component({
  selector: 'app-deposit-type18-default',
  templateUrl: './deposit-type18-default.component.html',
  styleUrls: ['./deposit-type18-default.component.scss']
})
export class DepositType18DefaultComponent extends BaseDepositType18Component {
  public translate: TranslateService;
  public savedDateService: SaveData;
  public baseApiService: BaseApiService;
  public simpleModalService: SimpleModalService;
  messageKey;
  public userData;
  public depositLimit;
  constructor(public injector: Injector) {
    super(injector);
    this.simpleModalService = injector.get(SimpleModalService);
    this.saveData = injector.get(SaveData);
    this.translate = injector.get(TranslateService);
    this.baseApiService = injector.get(BaseApiService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.baseApiService.apiRequest('', Controllers.CLIENT, Methods.GET_DEPOSIT_LIMITS).pipe(take(1)).subscribe((data) => {
      this.depositLimit = data.ResponseObject;
      this.translate.get('User.Deposit-Self-Limitation').subscribe((res: string) => {
        let currentValue = null;
        if (this.depositLimit?.DailyDepositLimitAmountLeft != null && this.depositLimit?.MonthlyDepositLimitAmountLeft != null && this.depositLimit?.WeeklyDepositLimitAmountLeft != null) {
          currentValue = Math.min(this.depositLimit.DailyDepositLimitAmountLeft, this.depositLimit.MonthlyDepositLimitAmountLeft, this.depositLimit.WeeklyDepositLimitAmountLeft);
        } else {
          const non_null_limits = [this.depositLimit?.DailyDepositLimitAmountLeft, this.depositLimit?.MonthlyDepositLimitAmountLeft, this.depositLimit?.WeeklyDepositLimitAmountLeft].filter(Boolean);
          if (non_null_limits.length > 0) {
            currentValue = Math.min(...non_null_limits);
          } else {
            currentValue = 0;
          }
        }
        const smallestLimitString = currentValue.toString();
        this.messageKey = res.replace('value', smallestLimitString);
      });
    });
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

}
