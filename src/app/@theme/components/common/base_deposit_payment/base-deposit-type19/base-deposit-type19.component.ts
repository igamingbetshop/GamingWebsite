import {Directive, ElementRef, Injector, ViewChild} from "@angular/core";
import {BaseDepositPaymentComponent} from "../base-deposit-payment/base-deposit-payment.component";
import {GetPaymentsService} from "../../../../../@core/services/app/getPayments.service";
import {GetSettingsInfoService} from "../../../../../@core/services/app/getSettingsInfo.service";
import {UtilityService} from "../../../../../@core/services/app/utility.service";
import {FormControl, Validators} from "@angular/forms";


@Directive()
export class BaseDepositType19Component extends BaseDepositPaymentComponent {

    public getPaymentsService: GetPaymentsService;
    public getSettingsInfoService: GetSettingsInfoService;
    public utilityService: UtilityService;

    @ViewChild('documentFile') documentFileRef: ElementRef;

    public fileData: any;
    public selectedDocumentErrorMessage: any;
    public userData;
    public NameSurname: string;
    public editField = false;
    public MobileNumber: string;

    constructor(public injector: Injector) {
        super(injector);
        this.getPaymentsService = injector.get(GetPaymentsService);
        this.getSettingsInfoService = injector.get(GetSettingsInfoService);
        this.utilityService = injector.get(UtilityService);
        this.userData = this.localStorageService.get('user');
        this.NameSurname = this.userData.FirstName + " " + this.userData.LastName;
        this.MobileNumber = this.userData.MobileNumber;
    }

    ngOnInit() {
        super.ngOnInit();
        this.paymentForm.addControl('Provider', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('TxName', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('Amount', new FormControl(this.quickDepositAmount, [Validators.required]));
        this.paymentForm.addControl('PaymentForm', new FormControl('', [Validators.required]));
        this.paymentForm.addControl('ImageName', new FormControl(''));
        this.paymentForm.addControl('MobileNumber', new FormControl({
            value: this.userData.MobileNumber || ''
        }));

        this.getSettingsInfoService.notifyGetChooseFileName$.subscribe((data) => {
            this.fileData = data;
            this.paymentForm.get('PaymentForm').patchValue(data['ImageData']);
            this.paymentForm.get('ImageName').patchValue(data['Name']);

            this.utilityService.showError('', this, 'fileData');
        });

        this.getSettingsInfoService._notifyGetDocumentError.subscribe((data) => {
            this.selectedDocumentErrorMessage = data;
            this.utilityService.showError('', this, 'selectedDocumentErrorMessage');
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

    submit() {
        if (this.paymentForm.valid) {
            const requestData = this.paymentForm.getRawValue();
            requestData.paymentType = 'deposit';
            requestData.PaymentSystemId = this.paymentSystemId;
            requestData.MobileNumber = this.paymentForm.get('MobileNumber').value != '' ? this.paymentForm.get('MobileNumber').value : this.MobileNumber;
            this.createPayment(requestData);
        } else this.markFormGroupTouched(this.paymentForm);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.paymentForm.removeControl('Amount');
        this.paymentForm.removeControl('TxName');
        this.paymentForm.removeControl('Provider');
        this.paymentForm.removeControl('MobileNumber');
        this.paymentForm.removeControl('PaymentForm');
        this.paymentForm.removeControl('ImageName');
    }


}