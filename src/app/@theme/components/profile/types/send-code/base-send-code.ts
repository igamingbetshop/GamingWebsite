import {
    createNgModule,
    Directive,
    EventEmitter,
    HostListener,
    inject,
    Injector,
    Input,
    OnDestroy,
    OnInit
} from "@angular/core";
import {VerificationService} from "../../../../../@core/services/api/verification.service";
import {BaseType} from "../base/base-type";
import {TranslateService} from "@ngx-translate/core";
import {UtilityService} from "../../../../../@core/services/app/utility.service";
import {Subscription} from "rxjs";
import {VerificationCodeTypes} from "../../../../../@core/enums";
import {ConfigService, SharedService} from "../../../../../@core/services";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";

@Directive()
export class BaseSendCode extends BaseType implements OnInit, OnDestroy
{
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void
    {
        this.mobileCodePattern = '';
    }
    @Input('type') type: string;
    @Input('activePeriodInMinutes') activePeriodInMinutes: number;
    verificationService: VerificationService;
    translate: TranslateService;
    utilityService: UtilityService;
    dialog = inject(MatDialog);
    configService: ConfigService;
    public sharedService: SharedService;

    errorMessage:string;
    dataModel:string;
    mobileDataModel:string;
    mobileCodes = [];
    mobileCodePattern:string;
    public defaultOptions: any;
    public currentValueMobileCode = {
        'Title': '',
        'Type': '',
        'Mask': ''
    };
    public currentValueMobileCodeCopy;
    private sub:Subscription = new Subscription();
    public rightToLeftOrientation: boolean = false;
    public mobileCodeModel;

    constructor(protected injector:Injector)
    {
        super(injector);
        this.verificationService = injector.get(VerificationService);
        this.translate = injector.get(TranslateService);
        this.utilityService = injector.get(UtilityService);
        this.configService = injector.get(ConfigService);
        this.sharedService = injector.get(SharedService);
    }

    ngOnInit()
    {
        this.defaultOptions = this.configService.defaultOptions;
        this.mobileCodes = this.defaultOptions['MobileCodes'];
        this.dataModel = this.formGroup.get(this.formControlName).value;
        this.mobileDataModel = this.formGroup.get('MobileNumber')?.value;
        this.mobileCodeModel = this.profileService.getProfile?.MobileCode;

        if (!this.mobileCodePattern && this.mobileDataModel === null) {
            let defaultMobileCode = JSON.parse(localStorage.getItem('ServerDefaultCountryCode'));
            if (defaultMobileCode != undefined) {
                let filterByGeolocationItem = this.mobileCodes.filter((item) => item.Title === defaultMobileCode)[0];
                if (filterByGeolocationItem) {
                    this.currentValueMobileCode.Title = filterByGeolocationItem.Title;
                    this.currentValueMobileCode.Type = filterByGeolocationItem.Type;
                    this.currentValueMobileCode.Mask = filterByGeolocationItem.Mask;
                } else {
                    if (this.mobileCodes.length !== 0) {
                        this.currentValueMobileCode.Title = this.mobileCodes[0].Title;
                        this.currentValueMobileCode.Type = this.mobileCodes[0].Type;
                        this.currentValueMobileCode.Mask = this.mobileCodes[0].Mask;
                    }
                }
                this.formGroup.addControl('MobileCode', new FormControl(this.currentValueMobileCode.Type, Validators.required));
            } else {
                this.currentValueMobileCode.Title = this.mobileCodes[0].Title;
                this.currentValueMobileCode.Type = this.mobileCodes[0].Type;
                this.currentValueMobileCode.Mask = this.mobileCodes[0].Mask;
                this.formGroup.addControl('MobileCode', new FormControl(this.currentValueMobileCode.Type, Validators.required));
            }
            this.currentValueMobileCodeCopy = Object.assign({}, this.currentValueMobileCode);
        }
        else if (this.mobileDataModel !== null) {
            const matchingCode = this.mobileCodes.find(code => code.Type === this.mobileCodeModel);
            if (matchingCode) {
                this.currentValueMobileCode.Title = matchingCode.Title;
                this.currentValueMobileCode.Type = matchingCode.Type;
                this.currentValueMobileCode.Mask = matchingCode.Mask;
                this.currentValueMobileCodeCopy = Object.assign({}, this.currentValueMobileCode);
            }
        }

        this.sub.add(this.profileService.editState$.subscribe(data => {
            if(data.value === false && data.isReset === true)
            {
                this.dataModel = this.profileService.getProfile[this.formControlName];
                this.mobileDataModel = this.profileService.getProfile['MobileNumber'];
                this.mobileCodeModel = this.profileService.getProfile?.MobileCode;
            }
        }));
        this.sharedService.rightToLeftOrientation.subscribe((responseData) => {
            this.rightToLeftOrientation = responseData;
        });
        if (this.type === 'MobileNumber') {
            this.formGroup.addControl('MobileCode', new FormControl(this.profileService.getProfile?.MobileCode, Validators.required));
        }
    }

    onModelChange(model)
    {
        this.formGroup.get(this.formControlName).setValue(model);
    }
    onMobileChange(model) {
        if (model === '') {
            this.formGroup.get('MobileNumber').setValue('');
            return;
        } else {
            // const data = this.currentValueMobileCode.Type + model;
            // this.formGroup.get('MobileNumber').setValue(data);
            this.formGroup.get('MobileNumber').setValue(model);
        }
    }
    ngOnDestroy()
    {
        this.sub.unsubscribe();
    }

    public getVerificationCode(type)
    {
        this.verificationService.getVerificationCode(type).subscribe((responseData) => {
            if (responseData['ResponseCode'] === 0)
            {
                this.activePeriodInMinutes = responseData.ResponseObject.ActivePeriodInMinutes;
                let fullMobileNumber: any;
                if (type === 'email') {
                    fullMobileNumber = this.dataModel;
                } else {
                    fullMobileNumber = this.mobileCodeModel + this.dataModel;
                }
                this.openVerifyCode(type, fullMobileNumber);
            }
            else
            {
                this.utilityService.showError(responseData['Description'], this);
            }
        });
    }

    async openVerifyCode(type:string, targetOfSource:string)
    {
        const { VerifyCodeModule } = await import("../../../modals/verify-code/verify-code.module");
        const moduleRef = createNgModule(VerifyCodeModule, this.injector);
        const component = moduleRef.instance.getComponent();
        const callback = new EventEmitter();
        callback.subscribe(data => {
            data.callBack({});
            if(data.questionIds && data.questionIds.length)
            {
                this.openSecurityQuestions(type, data.code, data.questionIds);
            }
            else
            {
                this.verificationService.sendVerificationCode(type, data.code).subscribe(resp => {
                    if(resp['ResponseCode'] === 0)
                    {
                       this.profileService.getClientInfo();
                    }
                    else
                    {
                        this.utilityService.showError(resp['Description'], this);
                    }

                });
            }
        });
        this.dialog.open(component, {data:{isModal:true, type:type, targetOfSender:targetOfSource, onVerified:callback,
                activePeriodInMinutes: this.activePeriodInMinutes, prefixTitle: '',
                verificationCodeType: type == 'mobile' ? VerificationCodeTypes.MobileNumberVerification : VerificationCodeTypes.EmailVerification}})
    }

    async openSecurityQuestions(type:string, verifiedCode:string, questionIds:number[])
    {
        const { SecurityQuestionsModalModule } = await import("../../../modals/security-questions-modal/security-questions-modal.module");
        const moduleRef = createNgModule(SecurityQuestionsModalModule, this.injector);
        const component = moduleRef.instance.getComponent();
        const callback = new EventEmitter();
        callback.subscribe(data =>
        {
            this.verificationService.sendVerificationCode(type, verifiedCode,  data.securityQuestions).subscribe(resp => {
                if(resp['ResponseCode'] === 0)
                {
                    data.callBack({});

                    this.profileService.getClientInfo();
                }
                else data.callBack({error:resp['Description']});
            });
        });

        this.dialog.open(component, {data:{securityQuestionIds:questionIds, onSecurityConfirmed:callback}});
    }

    selectMobileCode(mobileCodeItem, type = '1')
    {
        this.mobileCodePattern = '';
        this.currentValueMobileCode.Title = mobileCodeItem.Title;
        this.currentValueMobileCode.Type = mobileCodeItem.Type;
        this.currentValueMobileCode.Mask = mobileCodeItem.Mask;
        this.formGroup.get('MobileCode').setValue(mobileCodeItem.Type);
    }

    focusInput(input: HTMLInputElement, event: any)
    {
        this.sub.add(this.profileService.editState$.subscribe(data => {
            if(data.value === true && data.isReset === false) {
                this.mobileCodePattern = '';
                // input.focus();
            } else {
                event.stopPropagation();
                if (data.value === false && data.isReset === true) {
                    this.currentValueMobileCode = this.currentValueMobileCodeCopy;
                    this.currentValueMobileCodeCopy = Object.assign({}, this.currentValueMobileCode);
                }
            }
        }));
    }
}