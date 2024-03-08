import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfigService, SaveData } from '../../../../../../../@core/services';
import { BaseApiService } from '../../../../../../../@core/services/api/base-api.service';
import { UtilityService } from '../../../../../../../@core/services/app/utility.service';
import { GetSettingsInfoService } from '../../../../../../../@core/services/app/getSettingsInfo.service';
import { Controllers, Methods } from '../../../../../../../@core/enums';


@Component({
  selector: 'app-mobile-account-page-type3-credit-check',
  templateUrl: './mobile-account-page-type3-credit-check.component.html',
  styleUrls: ['./mobile-account-page-type3-credit-check.component.scss']
})
export class MobileAccountPageType3CreditCheckComponent implements OnInit {
  public verificationUrl;
  public statusMessage;
  public limits: any;
  public isShopWallet = false;
  public selectedAccount;
  @ViewChild('verificationIframe') verificationIframe: ElementRef;

  constructor(public simpleModalService: SimpleModalService, public savedDateService: SaveData,
              private baseApiService: BaseApiService, private utilsService: UtilityService,
              public getSettingsInfoService: GetSettingsInfoService, private router: Router,
              public configService: ConfigService) {
    this.selectedAccount = JSON.parse(localStorage.getItem('selectedAccountId'));
    if (this.selectedAccount.BetShopId !== null && this.selectedAccount.PaymentSystemId === null) {
      this.isShopWallet = true;
    }
    window.scroll(0,0);
  }

  ngOnInit(): void {
    this.onGetLimits();
  }

  getVerificationPageUrl() {
    this.baseApiService.apiRequest('2', Controllers.CLIENT, Methods.GET_VERIFICATION_PAGE_URL).subscribe((data) => {
      if (data['ResponseCode'] == 0) {
        this.verificationUrl = data.ResponseObject;
        this.verificationIframe.nativeElement.src = this.verificationUrl;
      } else {
        this.utilsService.showMessageWithDelay(this, [{ statusMessage: data.Description }]);
      }
    });
  }

  public onGetLimits() {
    this.getSettingsInfoService.getLimits().pipe(take(1)).subscribe(data => {
      if (data.ResponseCode == 0) {
        this.limits = data.ResponseObject;
        if (!this.limits.IsHighCreditVerified || !this.limits.IsCreditVerified) {
          this.getVerificationPageUrl();
        }
      }

    });
  }

  openLimitsBlocks() {
    const url = '/user/' + (this.configService.defaultOptions.AccountTemplateType == undefined ? '1' : this.configService.defaultOptions.AccountTemplateType) + '/self-limitation';
    this.router.navigate([url]);
  }

}
