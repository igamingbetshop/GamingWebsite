import {createNgModuleRef, Directive, EventEmitter, HostListener, Injector, Input, OnDestroy, OnInit} from "@angular/core";
import {VerificationService} from "../../../../../@core/services/api/verification.service";
import {BaseType} from "../base/base-type";
import {TranslateService} from "@ngx-translate/core";
import {UtilityService} from "../../../../../@core/services/app/utility.service";
import {SimpleModalService} from "ngx-simple-modal";
import {Subscription} from "rxjs";
import {VerificationCodeTypes} from "../../../../../@core/enums";
import {ConfigService} from "../../../../../@core/services";

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
    simpleModalService: SimpleModalService;
    configService: ConfigService;

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

    constructor(protected injector:Injector)
    {
        super(injector);
        this.verificationService = injector.get(VerificationService);
        this.translate = injector.get(TranslateService);
        this.utilityService = injector.get(UtilityService);
        this.simpleModalService = injector.get(SimpleModalService);
        this.configService = injector.get(ConfigService);
    }

    ngOnInit()
    {
        this.defaultOptions = this.configService.defaultOptions;
        this.mobileCodes = this.defaultOptions['MobileCodes'];
        this.dataModel = this.formGroup.get(this.formControlName).value;
        this.mobileDataModel = this.formGroup.get('MobileNumber')?.value;

        if (!this.mobileCodePattern && this.mobileDataModel === null) {
            this.currentValueMobileCode.Title = this.mobileCodes[0].Title;
            this.currentValueMobileCode.Type = this.mobileCodes[0].Type;
            this.currentValueMobileCode.Mask = this.mobileCodes[0].Mask;
            this.currentValueMobileCodeCopy = Object.assign({}, this.currentValueMobileCode);
        }
        else if (this.mobileDataModel !== null) {
            const matchingCode = this.mobileCodes.find(code => this.mobileDataModel?.startsWith(code.Type));
            if (matchingCode) {
                this.currentValueMobileCode.Title = matchingCode.Title;
                this.currentValueMobileCode.Type = matchingCode.Type;
                this.currentValueMobileCode.Mask = matchingCode.Mask;
                this.currentValueMobileCodeCopy = Object.assign({}, this.currentValueMobileCode);
                this.mobileDataModel = this.mobileDataModel.slice(matchingCode.Type.length);
            }
        }

        this.sub.add(this.profileService.editState$.subscribe(data => {
            if(data.value === false && data.isReset === true)
            {
                this.dataModel = this.profileService.getProfile[this.formControlName];
                this.mobileDataModel = this.profileService.getProfile['MobileNumber'];
                const matchingCode = this.mobileCodes.find(code => this.mobileDataModel?.startsWith(code.Type));
                return this.mobileDataModel = this.mobileDataModel?.slice(matchingCode?.Type.length);
            }
        }));
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
            const data = this.currentValueMobileCode.Type + model;
            this.formGroup.get('MobileNumber').setValue(data);
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
                this.openVerifyCode(type, this.dataModel);
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
        const moduleRef = createNgModuleRef(VerifyCodeModule, this.injector);
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

        this.simpleModalService.addModal(component, {isModal:true, type:type, targetOfSender:targetOfSource, onVerified:callback,
            activePeriodInMinutes: this.activePeriodInMinutes, prefixTitle: '',
            verificationCodeType: type == 'mobile' ? VerificationCodeTypes.MobileNumberVerification : VerificationCodeTypes.EmailVerification}).subscribe(data => {

        });
    }

    async openSecurityQuestions(type:string, verifiedCode:string, questionIds:number[])
    {
        const { SecurityQuestionsModalModule } = await import("../../../modals/security-questions-modal/security-questions-modal.module");
        const moduleRef = createNgModuleRef(SecurityQuestionsModalModule, this.injector);
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
        this.simpleModalService.addModal(component, {securityQuestionIds:questionIds, onSecurityConfirmed:callback}).subscribe(data => {

        });
    }

    selectMobileCode(mobileCodeItem, type = '1')
    {
        this.mobileCodePattern = '';
        this.currentValueMobileCode.Title = mobileCodeItem.Title;
        this.currentValueMobileCode.Type = mobileCodeItem.Type;
        this.currentValueMobileCode.Mask = mobileCodeItem.Mask;
    }

    focusInput(input: HTMLInputElement, event)
    {
        this.sub.add(this.profileService.editState$.subscribe(data => {
            if(data.value === true && data.isReset === false) {
                input.focus();
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