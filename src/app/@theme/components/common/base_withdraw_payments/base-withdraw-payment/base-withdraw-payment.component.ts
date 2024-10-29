import {OnInit, Injector, Input, Directive, createNgModule, EventEmitter, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaymentControllerService} from '../../../../../@core/services/app/paymentController.services';
import {Subscription, tap} from "rxjs";
import {ConfigService, SaveData} from "@core/services";
import {LocalStorageService} from "@core/services";
import {UtilityService} from "@core/services/app/utility.service";
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {BaseApiService} from "@core/services/api/base-api.service";
import {Controllers, Methods, VerificationCodeTypes} from "@core/enums";
import {take} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {BaseFrameComponent} from "../../../modals/base-frame/base-frame.component";
import {TranslateService} from "@ngx-translate/core";


@Directive()
export class BaseWithdrawPaymentComponent implements OnInit {

    @Input() contentType: number;
    @Input() paymentSystemId: number;
    @Input() nominals: number[];
    @Input() maxMinAmount: any;

    public fb: FormBuilder;
    public paymentForm: FormGroup;
    public submitted: boolean;
    public openedWindow: any;

    protected subscriptions: Subscription[] = [];

    public paymentControllerService: PaymentControllerService;
    dialog = inject(MatDialog);
    private savedDataService: SaveData;
    public localStorageService: LocalStorageService;
    public utilityService: UtilityService;
    public configService: ConfigService;
    protected paymentService:GetPaymentsService;
    protected baseApiService:BaseApiService;
    public translate: TranslateService;

    public errorMessage: string;
    public successMessage: string;
    public currencySymbol: any;
    public currencyId: any;
    public amount: number;
    public userData:any;

    constructor(public injector: Injector) {
        this.fb = injector.get(FormBuilder);

        this.paymentControllerService = injector.get(PaymentControllerService);
        this.savedDataService = injector.get(SaveData);
        this.localStorageService = injector.get(LocalStorageService);
        this.utilityService = injector.get(UtilityService);
        this.paymentService = injector.get(GetPaymentsService);
        this.configService = injector.get(ConfigService);
        this.baseApiService = injector.get(BaseApiService);
        this.translate = injector.get(TranslateService);
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
            switch (this.contentType) {
                case 1:
                    this.popupCenter('', '_self', screen.width, screen.height);
                    this.openedWindow.location.href = data['Url'];
                    break;
                case 2:
                    this.popupCenter('', '_blank', screen.width, screen.height);
                    this.openedWindow.location.href = data['Url'];
                    break;
                case 3:
                    if(data['Url'])
                    {
                        this.popupCenter('', '_self', screen.width, screen.height);
                        this.openedWindow.location.href = data['Url'];
                    }
                    else
                    {
                        if(data.Description)
                        {
                            this.translate.get(`Payment.${data.Description}`).subscribe((res: string) => {
                                this.successMessage = res;
                                this.paymentControllerService.getUserAccountData();
                                setTimeout(() => this.successMessage = '', 5000);
                            });
                        }
                        else
                        {
                            this.successMessage = 'success';
                            this.paymentControllerService.getUserAccountData();
                            setTimeout(() => this.successMessage = '', 5000);
                        }
                    }
                    break;
                case 4:
                    this.dialog.open(BaseFrameComponent, {data:{ title: '',url: data['Url'],cancelUrl: data['CancelUrl']}, disableClose:true});
                    break;
                case 5:
                    this.popupCenter('', '_blank', screen.width * 0.5, screen.height * 0.5);
                    this.openedWindow.location.href = data['Url'];
                    break;
            }
        }));
    }

    public popupCenter(url, target, w, h) {
        const dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen['left'];
        const dualScreenTop = window.screenTop != undefined ? window.screenTop : screen['top'];

        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        const left = ((width / 2) - (w / 2)) + dualScreenLeft;
        const top = ((height / 2) - (h / 2)) + dualScreenTop;
        if (this.openedWindow) {
            this.openedWindow.close();
        }
        const features = 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left
        this.openedWindow = window.open(url, target, features);

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
        const moduleRef = createNgModule(VerifyCodeModule, this.injector);
        const component = moduleRef.instance.getComponent();
        const callback = new EventEmitter();
        callback.subscribe(data => {
            data.callBack({});
            request.VerificationCode = data.code;
            this.submitted = true;
            this.paymentControllerService.createPayment(request);
        });
        this.dialog.open(component, {data:{isModal: true, type: type, targetOfSender: targetOfSource, onVerified: callback, activePeriodInMinutes: activePeriodInMinutes, prefixTitle: '', verificationCodeType:verificationCodeType}})
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
