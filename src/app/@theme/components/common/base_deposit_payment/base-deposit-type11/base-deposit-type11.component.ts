import {Injectable, Injector} from '@angular/core';
import {BaseDepositPaymentComponent} from "../base-deposit-payment/base-deposit-payment.component";
import {FormControl, Validators} from "@angular/forms";
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {GetSettingsInfoService} from "@core/services/app/getSettingsInfo.service";
import {BankAccount} from "@core/models";
import {UtilityService} from "@core/services/app/utility.service";

@Injectable()
export class BaseDepositType11Component extends BaseDepositPaymentComponent {

  public date: Date;
  public getPaymentsService: GetPaymentsService;
  public getSettingsInfoService: GetSettingsInfoService;
  public utilityService: UtilityService;
  public selectedBank: any;

  public fileData: any;
  public selectedDocumentErrorMessage: any;
  public userData;
  public NameSurname: string;

  public accounts: Array<BankAccount> = [];
  public banks = [];

  public showList = false;

  public bankNumberFilter: any = {BankAccountNumber: ''};

  constructor(public injector: Injector) {
    super(injector);
    this.getPaymentsService = injector.get(GetPaymentsService);
    this.getSettingsInfoService = injector.get(GetSettingsInfoService);
    this.utilityService = injector.get(UtilityService);
    this.date = new Date();
    this.userData = this.localStorageService.get('user');
    this.NameSurname = this.userData.FirstName + " " + this.userData.LastName;
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentForm.addControl('Amount', new FormControl(this.quickDepositAmount, [Validators.required]));
    this.paymentForm.addControl('BankAccountNumber', new FormControl('', [Validators.required]));
    this.paymentForm.addControl('BankName', new FormControl('', [Validators.required]));
    this.paymentForm.addControl('OperatorCardNumber', new FormControl('', [Validators.required]));
    this.paymentForm.addControl('TransactionId', new FormControl('', [Validators.required]));
    this.paymentForm.addControl('BankAccountHolder', new FormControl({
      value: this.userData.FirstName || this.userData.LastName || '',
      disabled: true
    }));



    this.getBanksList(this.paymentSystemId);

    this.getPaymentsService.notifyGetBanksList$.subscribe((data) => {
      this.paymentForm.get('BankName').patchValue(data[0].Id);
    });

    this.getSettingsInfoService.notifyGetChooseFileName$.subscribe((data) => {
      this.fileData = data;
      this.utilityService.showError('', this, 'fileData');
    });

    this.getSettingsInfoService._notifyGetDocumentError.subscribe((data) => {
      this.selectedDocumentErrorMessage = data;
      this.utilityService.showError('', this, 'selectedDocumentErrorMessage');
    });

    this.getPaymentsService.getBankAccounts();


    this.getPaymentsService._notifyGetBankAccounts.subscribe((responseData) => {
      this.accounts = responseData;
    });

    this.showList = false;

  }

  selectBankAccount(bankId) {
    this.selectedBank = this.getPaymentsService.banksList.find(bank => bank.Id == bankId);
    this.paymentForm.get('BankAccountNumber').patchValue(this.selectedBank.Accounts[0]);
  }

  getBanksList(paymentSystemId) {
    this.getPaymentsService.getBanks(0);
  }

  reSearch(el?) {
    this.showList = true;
  }

  chooseBankAccountNumber(item) {
    this.bankNumberFilter.BankAccountNumber = item.BankAccountNumber = item.BankAccountNumber;
    this.showList = false;
  }

  submit() {
    this.paymentForm.get('OperatorCardNumber').patchValue(this.bankNumberFilter.BankAccountNumber);
    if (this.paymentForm.valid) {
      const requestData = this.paymentForm.getRawValue();
      requestData.paymentType = 'deposit';
      requestData.BankId = this.selectedBank.Id;
      requestData.BankName = this.selectedBank.BankName;
      requestData.NameSurname = this.NameSurname;
      requestData.BankAccountNumber = this.bankNumberFilter.BankAccountNumber;
      requestData.PaymentSystemId = this.paymentSystemId;
      this.createPayment(requestData);
    } else this.markFormGroupTouched(this.paymentForm);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.paymentForm.removeControl('Amount');
    this.paymentForm.removeControl('BankAccountNumber');
    this.paymentForm.removeControl('OperatorCardNumber');
    this.paymentForm.removeControl('BankName');
    this.paymentForm.removeControl('BankAccountNumber');
    this.paymentForm.removeControl('TransactionId');
  }

}
