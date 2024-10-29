import {Directive, ElementRef, Injector, ViewChild} from '@angular/core';
import {BaseDepositPaymentComponent} from "../base-deposit-payment/base-deposit-payment.component";
import {FormControl, Validators} from "@angular/forms";
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {GetSettingsInfoService} from "@core/services/app/getSettingsInfo.service";
import {UtilityService} from "@core/services/app/utility.service";
import * as moment from "moment/moment";


@Directive()
export class BaseDepositType9Component extends BaseDepositPaymentComponent {

  public date: string;
  public getPaymentsService: GetPaymentsService;
  public getSettingsInfoService: GetSettingsInfoService;
  public utilityService: UtilityService;
  public selectedBank: any;

  @ViewChild('documentFile') documentFileRef: ElementRef;

  public fileData: any;
  public selectedDocumentErrorMessage: any;

  // private localStorageService:LocalStorageService;
  public userData;
  public NameSurname: string;

  constructor(public injector: Injector) {
    super(injector);
    this.getPaymentsService = injector.get(GetPaymentsService);
    this.getSettingsInfoService = injector.get(GetSettingsInfoService);
    this.utilityService = injector.get(UtilityService);
    this.date = moment(new Date()).format('YYYY-MM-DDTHH:mm');
    // this.localStorageService = injector.get(LocalStorageService);
    this.userData = this.localStorageService.get('user');
    this.NameSurname = this.userData.FirstName + " " + this.userData.LastName;
  }

  ngOnInit() {
    super.ngOnInit();
    this.paymentForm.addControl('Amount', new FormControl(this.quickDepositAmount, [Validators.required]));
    this.paymentForm.addControl('BankName', new FormControl(''));
    this.paymentForm.addControl('BankAccountNumber', new FormControl('', [Validators.required]));
    this.paymentForm.addControl('TransactionDate', new FormControl(''));
    this.paymentForm.addControl('PaymentForm', new FormControl('', [Validators.required]));
    this.paymentForm.addControl('ImageName', new FormControl(''));
    this.getBanksList(this.paymentSystemId);
    this.getPaymentsService.getBankAccounts();

    this.getPaymentsService.notifyGetBanksList$.subscribe((data) => {
      this.paymentForm.get('BankName').patchValue(data[0]?.Id);
    });

    this.getSettingsInfoService.notifyGetChooseFileName$.subscribe((data) => {
      this.fileData = data;
      this.paymentForm.get('PaymentForm').patchValue(data['ImageData']);
      this.paymentForm.get('ImageName').patchValue(data['Name']);

      this.utilityService.showError('', this, 'fileData');
    });

    this.getSettingsInfoService.onChooseFileError$.subscribe((data) => {
      this.selectedDocumentErrorMessage = data;
      this.utilityService.showError('', this, 'selectedDocumentErrorMessage');
    });

    this.paymentForm.get('PaymentForm').valueChanges.subscribe((responseData) => {

      this.paymentForm.get('BankName').clearValidators();
      this.paymentForm.get('TransactionDate').clearValidators();

      this.paymentForm.get('BankName').updateValueAndValidity();
      this.paymentForm.get('TransactionDate').updateValueAndValidity();
    });

    this.paymentControllerService.notifyGetCreatePaymentData.subscribe(() => {

      setTimeout(() => {
        this.resetChangedFile();
      }, 5000);
    });

  }

  resetChangedFile()
  {
    this.documentFileRef.nativeElement.value = '';
  }

  handleInputChange(e) {
    this.getSettingsInfoService.uploadFile(e);
  }

  getBanksList(paymentSystemId) {
    this.getPaymentsService.getBanks(paymentSystemId);
  }

  selectBankAccount(bankId)
  {
    this.selectedBank = this.getPaymentsService.banksList.find(bank => bank.Id == bankId);
  }


  submit() {
    if (this.paymentForm.valid) {
      const requestData = this.paymentForm.getRawValue();
      requestData.BankId = this.selectedBank.Id;
      requestData.BankName = this.selectedBank.BankName;
      requestData.paymentType = 'deposit';
      requestData.NameSurname = this.NameSurname;
      requestData.PaymentSystemId = this.paymentSystemId;
      this.createPayment(requestData);
    } else this.markFormGroupTouched(this.paymentForm);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.paymentForm.removeControl('Amount');
    this.paymentForm.removeControl('BankName');
    this.paymentForm.removeControl('BankAccountNumber');
    this.paymentForm.removeControl('TransactionDate');
    this.paymentForm.removeControl('PaymentForm');
    this.paymentForm.removeControl('ImageName');
  }

}
