import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from '../../../../../../../@theme/components/profile/service/profile.service';
import { BaseApiService } from '../../../../../../../@core/services/api/base-api.service';
import { UtilityService } from '../../../../../../../@core/services/app/utility.service';
import { Controllers, Methods } from '../../../../../../../@core/enums';

@Component({
  selector: 'app-mobile-account-page-type3-verification',
  templateUrl: './mobile-account-page-type3-verification.component.html',
  styleUrls: ['./mobile-account-page-type3-verification.component.scss']
})
export class MobileAccountPageType3VerificationComponent implements OnInit, AfterViewInit {
  public profileDetails;
  public message;
  public currentValueName;
  public verificationUrl;
  public clickedVerificationUrl = false;
  public statusMessage;
  @ViewChild('verificationIframe') verificationIframe: ElementRef;

  constructor(public translate: TranslateService, private profileService: ProfileService,
              private baseApiService: BaseApiService, private utilsService: UtilityService) {
    this.profileService.getClientInfo();
    this.profileService.profileData$.subscribe((data) => {
      if (data) {
        this.profileDetails = data;
        this.translate.get('User.Verification-top-part').subscribe((res: string) => {
          const currentValue = this.profileDetails?.IsDocumentVerified;
          if (currentValue === false) {
            this.translate.get('User.Unverified').subscribe((res2) => {
              this.currentValueName = res2;
            });
          } else {
            this.translate.get('User.Verified').subscribe((res2) => {
              this.currentValueName = res2;
            });
          }
          this.message = res.replace('value', this.currentValueName);
        });
      }
    });
    window.scroll(0,0);
  }

  ngOnInit(): void {
  }

  updateTextColor() {
    const element = document.getElementById('currentValueNameElement');
    if (element) {
      if (this.profileDetails?.IsDocumentVerified === false) {
        element.style.color = 'red';
      } else {
        element.style.color = 'green';
      }
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateTextColor();
    }, 500);
  }

  getVerificationPageUrl() {
    this.baseApiService.apiRequest('', Controllers.CLIENT, Methods.GET_VERIFICATION_PAGE_URL).subscribe((data) => {
      if (data['ResponseCode'] == 0) {
        this.verificationUrl = data.ResponseObject;
        this.clickedVerificationUrl = true;
        this.verificationIframe.nativeElement.src = this.verificationUrl;
      } else {
        this.utilsService.showMessageWithDelay(this, [{ statusMessage: data.Description }]);
      }
    });
  }

}
