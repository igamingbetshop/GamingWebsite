import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { ConfigService, LocalStorageService, PaymentsService } from '../../../../../../../@core/services';
import { Controllers, Methods } from '../../../../../../../@core/enums';
import { BaseApiService } from '../../../../../../../@core/services/api/base-api.service';
import { UtilityService } from '../../../../../../../@core/services/app/utility.service';
import { UserLogined } from '../../../../../../../@core/services/app/userLogined.service';

@Component({
  selector: 'app-mobile-account-page-type3-payment',
  templateUrl: './mobile-account-page-type3-payment.component.html',
  styleUrls: ['./mobile-account-page-type3-payment.component.scss']
})
export class MobileAccountPageType3PaymentComponent implements OnInit {
  formGroup: FormGroup;
  connected = false;
  public currencySymbol: any;
  public userData: any;
  public messageBalanceKey;
  public messageDateKey;
  public statusMessage: string;
  public paymentSystemId;
  public playerDetails: any;
  public states = [];

  constructor(private fb: FormBuilder, public localStorageService: LocalStorageService,
              public translate: TranslateService, private datePipe: DatePipe, private paymentsService: PaymentsService,
              private baseApiService: BaseApiService, private utilsService: UtilityService,
              public userLogined: UserLogined, public configService: ConfigService) {
    this.userData = this.localStorageService.get('user');
    this.currencySymbol = this.userData ? this.userData.CurrencySymbol : '';
    window.scroll(0,0);
  }

  ngOnInit(): void {
    this.getClientPaymentInfoStates();
    this.getData();
    this.formGroup = this.fb.group({
      'WalletNumber': ['', [
        Validators.required
      ]],
      'AcceptTerms': [false, [
        Validators.requiredTrue
      ]]
    });
  }

  savePay3000() {
    const req = this.formGroup.getRawValue();
    if (this.formGroup.valid) {
      delete req.AcceptTerms;
      req.Type = 'Wallet'; // to delete
      req.PaymentSystemId = this.paymentSystemId;
      console.log(req);
      this.baseApiService.apiRequest(req, Controllers.CLIENT, Methods.ADD_WALLET_NUMBER).subscribe((data) => {
        if (data['ResponseCode'] == 0) {
          this.playerDetails = data.ResponseObject;
          this.playerDetails.StateName = this.states.find((state) => state.Value === this.playerDetails?.State)?.Name;
          this.connected = true;
        } else {
          this.utilsService.showMessageWithDelay(this, [{ statusMessage: data.Description }]);
        }
      });
    }
  }

  getData() {
    const inputData = {
      PartnerId: this.configService.defaultOptions.PartnerId,
      ClientId: this.userLogined.isAuthenticated ? this.userData.Id : 0,
      LanguageId: localStorage.getItem('lang') || 'en'
    };
    this.paymentsService.getPaymentSystem(inputData).then((data) => {
      if (data['ResponseCode'] === 0) {
        data['PartnerPaymentSystems'].filter((item) => {
          if (item.PaymentSystemId == 246) {
            this.paymentSystemId = item.PaymentSystemId;
            this.getClientPaymentMethods(item.PaymentSystemId);
          }
        });
      }
    });
  }

  getClientPaymentMethods(paymentSystemId) {
    this.baseApiService.apiRequest(paymentSystemId, Controllers.CLIENT, Methods.GET_CLIENT_WALLETS).subscribe((data) => {
      if (data['ResponseCode'] == 0) {
        if (data.ResponseObject[0]) {
          this.playerDetails = data.ResponseObject[0];
          this.playerDetails.StateName = this.states.find((state) => state.Value === this.playerDetails?.State)?.Name;
          this.translate.get('Settings.Player-Account-Date').subscribe((res: string) => {
            const currentValue2 = this.playerDetails?.CardExpireDate;
            const formattedDate = this.datePipe.transform(currentValue2, 'd.MM.yyyy');
            this.messageDateKey = res.replace('value', formattedDate);
          });
          this.connected = true;
        }
      }
    });
  }

  getClientPaymentInfoStates() {
    this.baseApiService.apiRequest('', Controllers.CLIENT, Methods.GET_CLIENT_PAYMENT_INFO_STATES).subscribe((data) => {
      if (data['ResponseCode'] == 0) {
        this.states = data.ResponseObject;
      }
    });
  }

  deleteBinding() {
    // const player = {
    //   WalletNumber: this.playerDetails.NickName,
    //   PaymentSystemId: this.playerDetails.PaymentSystemId,
    //   Type: this.playerDetails.Type
    // };
    const player = {
      Id: this.playerDetails.Id
    };
    this.baseApiService.apiRequest(player , Controllers.CLIENT, Methods.REMOVE_PAYMENT_WALLETS).subscribe((data) => {
      if (data['ResponseCode'] == 0) {
        this.connected = false;
      } else {
        this.utilsService.showMessageWithDelay(this, [{ statusMessage: data.Description }]);
      }
    });
  }

}
