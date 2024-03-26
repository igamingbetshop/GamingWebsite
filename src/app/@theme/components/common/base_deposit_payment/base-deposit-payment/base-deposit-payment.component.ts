import {OnInit, Injector, OnDestroy, Input, Directive, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {PaymentControllerService} from '../../../../../@core/services/app/paymentController.services';
import {Subscription} from "rxjs";
import {BonusesService} from "@core/services/api/bonuses.service";
import {ConfigService, LocalStorageService, SaveData} from "@core/services";
import {ActivatedRoute} from "@angular/router";
import {GetPaymentsService} from "@core/services/app/getPayments.service";
import {BaseFrameComponent} from "../../../modals/base-frame/base-frame.component";
import {UtilityService} from "@core/services/app/utility.service";
import {LimitNotificationsComponent} from "../../../modals/limit-notifications/limit-notifications.component";
import {TranslateService} from "@ngx-translate/core";
import {take} from "rxjs/operators";
import {StateService} from "@core/services/app/state.service";
import {MatDialog} from "@angular/material/dialog";
export enum UserProfileErrors {
    AddressCantBeEmpty = 176,
    FirstNameCantBeEmpty = 177,
    LastNameCantBeEmpty = 178,
    ZipCodeCantBeEmpty = 179,
    EmailCantBeEmpty = 1,
    MobileNumberCantBeEmpty = 97,
    EmailOrMobileMustBeFilled = 7,
    RegionNotFound = 84
}

@Directive()
export class BaseDepositPaymentComponent implements OnInit, OnDestroy {

    @Input() paymentSystemId: number;
    @Input() contentType: number;

    @Input() nominals: number[];
    @Input() maxMinAmount: any;

    public fb: FormBuilder;
    public paymentForm: FormGroup;
    public submitted: boolean;
    public promoData: Array<any> = [];
    public bonusData: Array<any> = [];

    public paymentControllerService: PaymentControllerService;
    dialog = inject(MatDialog);
    public localStorageService: LocalStorageService;
    public bonusesService: BonusesService;
    public saveData: SaveData;
    public route: ActivatedRoute;
    public configService: ConfigService;
    public translate: TranslateService;

    public errorMessage: string;
    public successMessage: string;
    public openedWindow: any;

    public currencySymbol: any;
    public currencyId: any;
    public numberRegEx = /\-?\d*\.?\d{1,2}/;

    public bonusService: BonusesService;
    public amount: number;
    public hasProfileError = false;
    public updatedData;
    public stateService:StateService;

    protected subscriptions: Subscription[] = [];
    protected paymentService: GetPaymentsService;
    protected utilityService: UtilityService;

    constructor(
        public injector: Injector
    ) {
        this.fb = injector.get(FormBuilder);

        this.paymentControllerService = injector.get(PaymentControllerService);
        this.bonusService = injector.get(BonusesService);
        this.localStorageService = injector.get(LocalStorageService);
        this.bonusesService = injector.get(BonusesService);
        this.saveData = injector.get(SaveData);
        this.paymentService = injector.get(GetPaymentsService);
        this.route = injector.get(ActivatedRoute);
        this.utilityService = injector.get(UtilityService);
        this.configService = injector.get(ConfigService);
        this.translate = injector.get(TranslateService);
        this.stateService = injector.get(StateService);
    }

    ngOnInit() {

        this.paymentForm = this.fb.group({
            'Amount': ['', [
                Validators.required,
                Validators.pattern(this.numberRegEx)
            ]],
            'PromoCode': ['']
        });
        const userData = this.localStorageService.get('user');
        this.currencySymbol = userData ? userData.CurrencySymbol : '';
        this.currencyId = userData ? userData.CurrencyId : '';

        this.bonusesService.notifyGetDepositBonusInfo.subscribe((data) => {
            if(Array.isArray(data))
            {
                this.promoData = data.filter((item: any) => item.HasPromo);
                if (this.promoData.length > 0) {
                    // this.paymentForm.addControl('PromoCode', new FormControl(''));
                    this.paymentForm.get('PromoCode').setValue('');
                }
            }
            if (data && data.length > 0) {
                this.bonusData = data.filter((item: any) => !item.HasPromo);
            }
        });

        this.saveData.changeBonus.subscribe((data: any) => {
            if (this.paymentForm.controls.hasOwnProperty('BonusId')) {
                data = data == 0 ? '' : data;
                this.paymentForm.get('BonusId').setValue(data);
            } else {
                this.paymentForm.addControl('BonusId', new FormControl(data));
            }
        });
        this.subscriptions.push(this.paymentControllerService.notifyGetCreatePaymentError.subscribe((response) => {
            this.handleCreatePaymentError(response);
        }));

    }

    protected subscribePaymentResponse()
    {
        this.paymentControllerService.notifyGetCreatePaymentData.pipe(take(1)).subscribe((resData) => {
            console.log('createPayment', resData);
            this.paymentForm.reset();
            this.submitted = false;
            switch (this.contentType) {
                case 1:
                    this.popupCenter('', '_self', screen.width, screen.height);
                    this.openedWindow.location.href = resData['Url'];
                    break;
                case 2:
                    this.popupCenter('', '_blank', screen.width, screen.height, false);
                    this.openedWindow.location.href = resData['Url'];
                    break;
                case 3:
                    if(resData['Url'])
                    {
                        this.popupCenter('', '_self', screen.width, screen.height);
                        this.openedWindow.location.href = resData['Url'];
                    }
                    else
                    {
                        if(resData.Description)
                        {
                            this.translate.get(`Payment.${resData.Description}`).subscribe((res: string) => {
                                this.successMessage = res;
                                setTimeout(() => this.successMessage = '', 5000);
                            });
                        }
                        else
                        {
                            this.successMessage = 'success';
                            setTimeout(() => this.successMessage = '', 5000);
                        }
                    }
                    break;
                case 4:
                    this.dialog.open(BaseFrameComponent, {data:{ title: '',url: resData['Url'],cancelUrl: resData['CancelUrl']}, disableClose:true});
                    break;
                case 5:
                    this.popupCenter('', '_blank', screen.width * 0.5, screen.height * 0.5);
                    this.openedWindow.location.href = resData['Url'];
                    break;
            }
            if (resData.LimitInfo.DailyDepositLimitPercent >= 80 || resData.LimitInfo.WeeklyDepositLimitPercent >= 80 || resData.LimitInfo.MonthlyDepositLimitPercent >= 80) {

                this.dialog.open(LimitNotificationsComponent, {data:{title: 'Limit Notifications',updatedData: resData.LimitInfo, message: true}})
            }
        })
    }
    public popupCenter(url, target, w, h, settings = true) {
        const dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen['left'];
        const dualScreenTop = window.screenTop != undefined ? window.screenTop : screen['top'];

        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        const left = ((width / 2) - (w / 2)) + dualScreenLeft;
        const top = ((height / 2) - (h / 2)) + dualScreenTop;
        if (this.openedWindow) {
            this.openedWindow.close();
        }
        const features = settings ? 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left : undefined;
        this.openedWindow = window.open(url, target, features);

        if (window.focus) {
            this.openedWindow.focus();
        }
    }

    createPayment(request) {
        this.subscribePaymentResponse();
        this.submitted = true;
        if (this.bonusData.length === 0) {
            this.paymentControllerService.bonusRefused = false;
        }
        this.paymentControllerService.createPayment(request);
    }

    onNominalChange(nominal) {
        this.paymentForm.get('Amount').setValue(nominal);
        this.bonusService.calculateBonusAmount(nominal);
    }

    ngOnDestroy() {
        this.bonusService.calculatedBonusAmount = null;
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    public routeToSettings()
    {
        this.stateService.setPaymentNavigationState("fromDeposit");
    }

    get hasMinMaxError()
    {
        if (!this.amount)
        {
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

    private handleCreatePaymentError(response) {

        this.hasProfileError = Object.keys(UserProfileErrors).some(error => response.ResponseCode == error);

        if (!this.hasProfileError ) {
            this.errorMessage = response['Description'];
            this.utilityService.showMessageWithDelay(this, [{'errorMessage': response['Description']}]);
        }
        this.paymentForm.reset();
        this.submitted = false;
    }

}
