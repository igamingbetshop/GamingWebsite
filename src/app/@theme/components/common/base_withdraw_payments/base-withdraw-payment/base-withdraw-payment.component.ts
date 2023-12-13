import {OnInit, Injector, Input, Directive, createNgModuleRef, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaymentControllerService} from '../../../../../@core/services/app/paymentController.services';
import {SimpleModalService} from 'ngx-simple-modal';
import {Subscription, tap} from "rxjs";
import {ConfigService, SaveData} from "@core/services";
import {LocalStorageService} from "@core/services";
import {UtilityService} from "@core/services/app/utility.service";
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {BaseApiService} from "@core/services/api/base-api.service";
import {Controllers, Methods, VerificationCodeTypes} from "@core/enums";
import {take} from "rxjs/operators";


@Directive()
export class BaseWithdrawPaymentComponent implements OnInit {

    @Input() paymentSystemId: number;
    @Input() nominals: number[];
    @Input() maxMinAmount: any;

    public fb: FormBuilder;
    public paymentForm: FormGroup;
    public submitted: boolean;
    public openedWindow: any;

    protected subscriptions: Subscription[] = [];

    public paymentControllerService: PaymentControllerService;
    public simpleModalService: SimpleModalService;
    private savedDataService: SaveData;
    public localStorageService: LocalStorageService;
    public utilityService: UtilityService;
    public configService: ConfigService;
    protected paymentService:GetPaymentsService;
    protected baseApiService:BaseApiService;

    public errorMessage: string;
    public successMessage: string;
    public currencySymbol: any;
    public currencyId: any;
    public amount: number;
    public userData:any;

    constructor(public injector: Injector) {
        this.fb = injector.get(FormBuilder);

        this.paymentControllerService = injector.get(PaymentControllerService);
        this.simpleModalService = injector.get(SimpleModalService);
        this.savedDataService = injector.get(SaveData);
        this.localStorageService = injector.get(LocalStorageService);
        this.utilityService = injector.get(UtilityService);
        this.paymentService = injector.get(GetPaymentsService);
        this.configService = injector.get(ConfigService);
        this.baseApiService = injector.get(BaseApiService);
    }

    ngOnInit() {
        this.paymentForm = this.fb.group({
            'Amount': ['', [
                Validators.required
            ]]
        });

        this.userData = this.localStorageService.get('user');
        this.currencySymbol =  this.userData ?  this.userData.CurrencySymbol : '';
        this.currencyId =  this.userData ?  this.userData.CurrencyId : '';

        this.subscriptions.push(this.paymentControllerService.notifyGetCreatePaymentError.subscribe((responseData) => {
            this.submitted = false;
            this.utilityService.showErrorDynamicallyInTime(responseData.Description, this);
            this.errorMessage = responseData.Description;
        }));

        this.subscriptions.push(this.paymentControllerService.notifyGetCreatePaymentData.subscribe((data) => {
            this.paymentForm.reset();
            this.submitted = false;
            if(data.Url)
            {
                this.popupCenter('', '', screen.width * 0.5, screen.height * 0.5);
                this.openedWindow.location.href = data['Url'];
            }
            else
            {
                this.successMessage = 'Success';
                this.paymentControllerService.getUserAccount();
                this.paymentControllerService.getUserAccountData();
            }
            setTimeout(() => {
                this.successMessage = '';
            }, 5000);
        }));
    }

    public popupCenter(url, title, w, h) {
        let dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen['left'];
        let dualScreenTop = window.screenTop != undefined ? window.screenTop : screen['top'];

        let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        let left = ((width / 2) - (w / 2)) + dualScreenLeft;
        let top = ((height / 2) - (h / 2)) + dualScreenTop;
        if (this.openedWindow)
            this.openedWindow.close();
        this.openedWindow = window.open(url, '_self', 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        if (window.focus) {
            this.openedWindow.focus();
        }
    }

    fullWithdraw() {
        this.paymentForm.controls['Amount'].setValue(this.savedDataService.TotalAvailableBalance);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    createPayment(request)
    {
        if(this.configService.defaultOptions.VerificationCodeForWithdraw)
        {
            let type:string;
            let targetOfSource:string;
            let method:string;

            switch (this.configService.defaultOptions.VerificationCodeForWithdraw)
            {
                case VerificationCodeTypes.WithdrawByMobile:
                    type = "mobile";
                    targetOfSource = this.userData.MobileNumber;
                    method = Methods.SEND_SMS_CODE;
                    break;
                case VerificationCodeTypes.WithdrawByEmail:
                    type = "email";
                    targetOfSource = this.userData.Email;
                    method = Methods.SEND_EMAIL_CODE;
                    break;
            }
            this.baseApiService.apiRequest({Type:this.configService.defaultOptions.VerificationCodeForWithdraw, PaymentInfo:request}, Controllers.MAIN, method, false).pipe(take(1)).subscribe(data => {
                if(data.ResponseCode === 0)
                {
                    if(data.ResponseObject.hasOwnProperty('ActivePeriodInMinutes'))
                    {
                        this.openVerifyCode(type, targetOfSource, data.ResponseObject.ActivePeriodInMinutes, request, this.configService.defaultOptions.VerificationCodeForWithdraw);
                    }
                }
                else  this.utilityService.showErrorDynamicallyInTime(data.Description, this);
            });
        }
        else
        {
            this.submitted = true;
            this.paymentControllerService.createPayment(request);
        }
    }

    onNominalChange(nominal) {
        this.paymentForm.get('Amount').setValue(nominal);
    }

    async openVerifyCode(type:string, targetOfSource:string, activePeriodInMinutes:number, request:any, verificationCodeType)
    {
        const { VerifyCodeModule } = await import('../../../modals/verify-code/verify-code.module');
        const moduleRef = createNgModuleRef(VerifyCodeModule, this.injector);
        const component = moduleRef.instance.getComponent();
        const callback = new EventEmitter();
        callback.subscribe(data => {
            data.callBack({});
            request.VerificationCode = data.code;
            this.submitted = true;
            this.paymentControllerService.createPayment(request);
        });

        this.simpleModalService.addModal(component, {isModal: true, type: type, targetOfSender: targetOfSource, onVerified: callback, activePeriodInMinutes: activePeriodInMinutes, prefixTitle: '', verificationCodeType:verificationCodeType}).subscribe(data => {

        });
    }


    get hasMinMaxError() {
        if(!this.amount) {
            return false;
        }

        return this.amount < this.maxMinAmount.MinAmount || this.amount > this.maxMinAmount.MaxAmount;
    }

    protected markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }

}
