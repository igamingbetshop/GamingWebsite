import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import {createNgModuleRef, Directive, EventEmitter, Injector, Input, OnDestroy, OnInit} from "@angular/core";
import { ConfirmModel } from '@core/interfaces';
import { GetPaymentsService } from '@core/services/app/getPayments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LocalStorageService, PaymentsService, SharedService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '@core/services';
import { UtilityService } from '@core/services/app/utility.service';
import { UserLogined } from '@core/services/app/userLogined.service';
import { ProfileService } from '../../profile/service/profile.service';
import { VerificationService } from '@core/services/api/verification.service';
import {ActivatedRoute, Router} from "@angular/router";
import {VerificationCodeTypes} from "@core/enums";

@Directive()

export class BaseAddBankAccountComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit, OnDestroy {
  public rightToLeftOrientation = false;

  public title: string;
  public message: boolean;
  public data: any;
  private activePeriodInMinutes: number;
  public isCodeSend: boolean;
  public statusMessage: string;
  public showSuccessMessage: boolean = false;
  public addNewTicket: boolean = false;

  public paymentService: GetPaymentsService;
  public paymentsService1: PaymentsService;
  public fb: FormBuilder;
  public addBankAccountForm: FormGroup;
  public userLogged: UserLogined;
  public userData;
  public profileData;

  public maskType: string;
  public paymentSystemList: Array<any> = [];
  public bankBranches: Array<any> = [];
  public paymentSystemId: any = null;
  public bankAccountTypes: Array<any> = [];

  protected subscriptions: Subscription[] = [];
  private utilsService: UtilityService;
  private translateService: TranslateService;
  private localStorageService: LocalStorageService;
  private configService: ConfigService;
  private verificationService: VerificationService;
  private simpleModalService: SimpleModalService;
  private profileService: ProfileService;
  private timeoutPromise: any;
  @Input('isEditMode') isEditMode = false;
  @Input('selectedBankAccount') selectedBankAccount;
  @Input('addBankAccount') addBankAccount;
  public router: Router;
  public route: ActivatedRoute;
  public clientBanksList = [];

  constructor(protected injector: Injector, public sharedService: SharedService) {
    super();
    this.paymentService = injector.get(GetPaymentsService);
    this.paymentsService1 = injector.get(PaymentsService);
    this.fb = injector.get(FormBuilder);
    this.utilsService = injector.get(UtilityService);
    this.translateService = injector.get(TranslateService);
    this.localStorageService = injector.get(LocalStorageService);
    this.configService = injector.get(ConfigService);
    this.userData = this.localStorageService.get('user');
    this.userLogged = injector.get(UserLogined);
    this.verificationService = injector.get(VerificationService);
    this.simpleModalService = injector.get(SimpleModalService);
    this.profileService = injector.get(ProfileService);
    this.router = injector.get(Router);
    this.route = injector.get(ActivatedRoute);
  }

  ngOnInit() {

    this.sharedService.rightToLeftOrientation.subscribe((recponceData) => {
      this.rightToLeftOrientation = recponceData;
    });

    if (typeof this.configService.defaultOptions['BankAccountMask'] == 'undefined') {
      this.maskType = '';
    } else {
      this.maskType = this.configService.defaultOptions['BankAccountMask'];
    }
    this.profileService.getClientInfo();
    this.profileService.profileData$.subscribe((data) => {
      this.profileData = data;
    });
    this.paymentService.getBankAccountTypes();
    this.addBankAccountForm = this.fb.group({
      BankAccountNumber: ['', [
        Validators.required
      ]],
      PaymentSystemId: ['', [
        Validators.required
      ]],
      BranchName: ['', [
        Validators.required
      ]],
      BankName: ['', [
        Validators.required
      ]],
      Iban: ['', [

      ]],
      BankAccountType: ['', [
      ]],
      Id: [0, [

      ]],
      // NickName: [{ value: this.userData.FirstName + ' ' + this.userData.LastName, disabled: true }]
      NickName: [{ value: this.profileData?.FirstName, disabled: true }],
      LastName: [{ value: this.profileData?.LastName, disabled: true }]
    });
    if (this.selectedBankAccount)
    {
      this.addBankAccountForm.get('PaymentSystemId').valueChanges.subscribe(data =>
      {
        console.log('data', data);
        this.paymentService.getClientBanks(data);
      });
      this.paymentSystemId = this.selectedBankAccount.PaymentSystemId;
      this.subscriptions.push(this.paymentService.notifyGetClientBanksList$.subscribe(data =>
      {
        if (data.length > 0) {
          this.bankBranches = data.find((res) => this.selectedBankAccount.BankName === res.BankName)?.Branches;
        }
      }));
      this.addBankAccountForm.patchValue(this.selectedBankAccount);

    }
    else if (this.data?.selectedBankAccount) {
      this.addBankAccountForm.get('PaymentSystemId').valueChanges.subscribe(data => {
        this.paymentService.getClientBanks(data);
      });
      this.paymentSystemId = this.data?.selectedBankAccount.PaymentSystemId;
      this.subscriptions.push(this.paymentService.notifyGetClientBanksList$.subscribe(data => {
        if (data.length > 0) {
          this.bankBranches = data.find((res) => this.data?.selectedBankAccount.BankName === res.BankName)?.Branches;
        }
      }));
      this.addBankAccountForm.patchValue(this.data?.selectedBankAccount);
    }
    else if (!this.selectedBankAccount || !this.data?.selectedBankAccount) {
      this.subscriptions.push(this.paymentService.notifyGetClientBanksList$.subscribe(data => {
        if (data.length > 0) {
          this.paymentSystemId = this.addBankAccountForm.get('PaymentSystemId').value;
          this.addBankAccountForm.get('BankName').patchValue(data[0].BankName);
          this.bankBranches = data[0].Branches;
          this.addBankAccountForm.get('BranchName').patchValue(data[0].Branches[0].BranchName);
        }
      }));
    }

    this.addBankAccountForm.get('PaymentSystemId').valueChanges.subscribe(data => {
      this.paymentService.getClientBanks(data);
      this.clientBanksList = this.paymentService.clientBanksList;
      if (this.clientBanksList.length === 0) {
        this.bankBranches = [];
      }
    });

    this.paymentService.notifyGetBankAccountTypes$.subscribe((bankAccounts: any) => {
      this.bankAccountTypes = bankAccounts;
    });

    const data = {
      PartnerId: this.configService.defaultOptions.PartnerId,
      ClientId: this.userLogged.isAuthenticated ? this.profileData?.Id : 0,
      LanguageId: localStorage.getItem('lang') || 'en'
    };

    this.paymentsService1.getPaymentSystem(data).then((data: any) => {
      if (data['ResponseCode'] === 0) {
        this.paymentSystemList = data['PartnerPaymentSystems'].filter(item => item.Type == '1' && item.HasBank);
      }
    });

    this.subscriptions.push(this.paymentService.notifySendAccountDetailsVerificationCode$.subscribe(data => {
      if (data === true) {
        this.translateService.get('Settings.VerifyMobileNumberSendCode').subscribe(message => this.utilsService.showMessageWithDelay(this, [{ statusMessage: message }]));
      } else {
        this.utilsService.showMessageWithDelay(this, [{ statusMessage: data }]);
      }
    }));

    this.subscriptions.push(this.paymentService.notifyAddBankAccount$.subscribe(data => {
      if (data === true) {
        this.addBankAccountForm.reset();
      } else {
        this.utilsService.showMessageWithDelay(this, [{ statusMessage: data }]);
      }
    }));
  }

  changedBankName(event) {
    this.clientBanksList.find((data) => {
      if (event === data.BankName) {
        this.bankBranches = data?.Branches;
        this.addBankAccountForm.get('BranchName').patchValue(data.Branches[0].BranchName);
      }
    });
  }

  changedPayment(event) {
    console.log(event);
    this.subscriptions.push(this.paymentService.notifyGetClientBanksList$.subscribe(data =>
    {
      if (data.length > 0) {
        this.clientBanksList = data;
      } else {
        this.clientBanksList = [];
        this.bankBranches = [];
      }
    }));
  }

  keyCode(event) {
    if (event.keyCode === 46) {
      return false;
    }
  }

  sendVerificationCode() {
    this.isCodeSend = true;
    if (this.timeoutPromise) {
      clearTimeout(this.timeoutPromise);
    }
    setTimeout(() => this.isCodeSend = false, 5000);
    this.paymentService.sendAccountDetailsVerificationCode();
  }

  submit()
  {

    if (this.profileService.getProfile.SecurityQuestions.length) {
      this.verificationService.getVerificationCode('mobile', VerificationCodeTypes.AddBankAccountByMobile).subscribe((responseData) => {
        if (responseData['ResponseCode'] === 0)
        {
          this.activePeriodInMinutes = responseData.ResponseObject.ActivePeriodInMinutes;
          this.openVerifyCode('mobile', this.profileService.getProfile.MobileNumber);
        }
        else
        {
          this.utilsService.showMessageWithDelay(this, [{statusMessage: responseData.Description}]);
        }
      });
    } else {
      const req = this.addBankAccountForm.getRawValue();
      req.NickName = req.NickName + ' ' + req.LastName;
      delete req.LastName;
      if (this.addBankAccountForm.valid) {
        this.addNewTicket = true;
        this.addBankAccount = false;
        const p = setTimeout(() => {
          clearTimeout(p);
          this.paymentService.addBankAccount(req);
          this.close();
        }, 3000);
      }
    }
  }

  async openVerifyCode(type:string, targetOfSource:string)
  {
    const { VerifyCodeModule } = await import('../../modals/verify-code/verify-code.module');
    const moduleRef = createNgModuleRef(VerifyCodeModule, this.injector);
    const component = moduleRef.instance.getComponent();
    const callback = new EventEmitter();
    callback.subscribe(data => {
      data.callBack({});
      const req = this.addBankAccountForm.getRawValue();
      req.NickName = req.NickName + ' ' + req.LastName;
      delete req.LastName;
      req.SMSCode = data.code;
      if (this.addBankAccountForm.valid) {
        this.addNewTicket = true;
        this.addBankAccount = false;
        const p = setTimeout(() => {
          clearTimeout(p);
          this.paymentService.addBankAccount(req);
          this.close();
        }, 3000);
      }
    });

    this.simpleModalService.addModal(component, {isModal: true, type: type, targetOfSender: targetOfSource, onVerified: callback, activePeriodInMinutes: this.activePeriodInMinutes, prefixTitle: '', verificationCodeType:VerificationCodeTypes.AddBankAccountByMobile}).subscribe(data => {

    });
  }

  ngOnDestroy(): void {
    if (this.timeoutPromise) {
      clearTimeout(this.timeoutPromise);
    }
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  openMenu() {
    this.sharedService.mobileRightSidebarOpen.next(true);
  }
}
