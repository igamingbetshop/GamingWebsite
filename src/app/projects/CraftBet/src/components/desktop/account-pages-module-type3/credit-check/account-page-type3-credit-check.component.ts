import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { SaveData } from '@core/services';
import { Controllers, Methods } from '@core/enums';
import { BaseApiService } from '@core/services/api/base-api.service';
import { UtilityService } from '@core/services/app/utility.service';
import { take } from 'rxjs/operators';
import { GetSettingsInfoService } from '@core/services/app/getSettingsInfo.service';

@Component({
  selector: 'app-credit-check',
  templateUrl: './account-page-type3-credit-check.component.html',
  styleUrls: ['./account-page-type3-credit-check.component.scss']
})
export class AccountPageType3CreditCheckComponent implements OnInit {
  public verificationUrl;
  public statusMessage;
  public limits: any;
  @ViewChild('verificationIframe') verificationIframe: ElementRef;

  constructor(public simpleModalService: SimpleModalService, public savedDateService: SaveData,
              private baseApiService: BaseApiService, private utilsService: UtilityService,
              public getSettingsInfoService: GetSettingsInfoService) { }

  ngOnInit(): void {
    this.onGetLimits();
  }

  async openLimitsBlocks() {
    const { AccountPageType3DefaultComponent } = await import('../default/account-page-type3-default.component');
    setTimeout(() => {
      this.simpleModalService.removeAll().then();
      this.simpleModalService.addModal(AccountPageType3DefaultComponent,
          { title: 'self-limitation' }, { closeOnClickOutside: true }).subscribe(() => {
      });
      this.savedDateService.selectedItem.Href = 'self-limitation';
    }, 100);
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

}
