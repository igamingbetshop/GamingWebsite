import {
    Directive,
    EventEmitter, inject,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';

import {ControlValueAccessor, FormGroup} from "@angular/forms";
import {Controllers, Methods} from "../../../../@core/enums";
import {BaseApiService} from "../../../../@core/services/api/base-api.service";
import {take} from "rxjs";
import {UserRegisterService} from "../../../../@core/services/app/userRegister.service";
import {isNotNullOrUndefined} from "../../../../@core/utils";
import {UtilityService} from "../../../../@core/services/app/utility.service";
import {ConfigService} from "../../../../@core/services";
import {BaseService} from "../../../../@core/services/app/base.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface IVerifyCode {
    isModal: boolean;
    targetOfSender: string;
    type:string;
    onVerified:EventEmitter<any>;
    activePeriodInMinutes: number;
    prefixTitle: string;
    verificationCodeType:number;
}
@Directive()
export class BaseVerifyCode implements OnInit, OnDestroy, ControlValueAccessor
{
    @Input('isModal') isModal: boolean = false;
    @Input('type') type: string;
    @Input('verificationCodeType') verificationCodeType: number;
    @Input('prefixTitle') prefixTitle: string = '';
    @Input('activePeriodInMinutes') activePeriodInMinutes: number;
    @Input('formGroup') formGroup:FormGroup;
    @Input('prevFormGroup') prevFormGroup:FormGroup;
    @Input('formControlName') formControlName:string;
    @Input('targetOfSender') targetOfSender:string;

    @Output('onVerified') onVerified:EventEmitter<any> =  new EventEmitter<any>();

    model1:string;
    model2:string;
    model3:string;
    model4:string;
    model5:string;
    model6:string;

    timerText:string;
    isResendActive:boolean = false;
    errorMessage:string;
    otp:string;
    numbersOnly:boolean = false;
    inputType:boolean = false;
    validator:RegExp;
    callBack = (data:any) =>
    {
        if(data.hasOwnProperty('error'))
            this.userRegisterService.errorMessage = data.error;
        else this.dialogRef.close();
    }
    translationKeys:any = {mobile:'', email:'', MobileOrEmail: ''};

    private timerPromise:any;
    private duration;
    public urlKey:string;

    private baseApiService:BaseApiService;
    public userRegisterService:UserRegisterService;
    private utilityService: UtilityService;
    private configService:ConfigService;
    public baseService: BaseService;
    data:any = inject(MAT_DIALOG_DATA);
    dialogRef = inject(MatDialogRef<BaseVerifyCode>);
    constructor(protected injector: Injector)
    {
        this.baseApiService = injector.get(BaseApiService);
        this.userRegisterService = injector.get(UserRegisterService);
        this.utilityService = injector.get(UtilityService);
        this.configService = injector.get(ConfigService);
        this.baseService = injector.get(BaseService);
        this.urlKey = this.utilityService.getParsedUrl(location.toString())["RecoveryCode"];
    }

    ngOnInit()
    {
        this.isModal = this.data.isModal || this.isModal;
        this.targetOfSender = this.data.targetOfSender || this.targetOfSender;
        this.type = this.data.type ||  this.type;
        this.onVerified = this.data.onVerified || this.onVerified;
        this.activePeriodInMinutes = this.data.activePeriodInMinutes ||  this.activePeriodInMinutes;
        this.prefixTitle = this.data.prefixTitle ||  this.prefixTitle;
        this.verificationCodeType = this.data.verificationCodeType ||  this.verificationCodeType;
        if (this.targetOfSender)
        {
          this.translationKeys[this.type] = this.targetOfSender;
            this.duration = this.activePeriodInMinutes * 60;
            this.startTimer(this.duration);
        }
        else if (this.urlKey)
        {
            this.verifyCode();
        }
        this.numbersOnly = this.configService.defaultOptions.VerificationKeyFormat;
        this.inputType = this.configService.defaultOptions.VerificationKeyFormat;
        this.validator = new RegExp(this.numbersOnly ? '[0-9]' : '[a-zA-Z0-9]');
    }

    ngOnChanges(changes: SimpleChanges)
    {
        if(changes && changes.activePeriodInMinutes && changes.activePeriodInMinutes.currentValue)
        {
            this.duration = this.activePeriodInMinutes * 60;
            this.setValue();
            this.startTimer(this.duration);
        }
    }

    ngOnDestroy()
    {
        if(this.timerPromise)
            clearInterval(this.timerPromise);
    }

    onPaste(event: ClipboardEvent)
    {
        let clipboardData = event.clipboardData || window['clipboardData'];
        let pastedText = clipboardData.getData('text');
        event.stopPropagation();
        event.preventDefault();
        if(pastedText && pastedText.length === 6)
        {
            for (let i = 0; i < pastedText.length; i++)
            {
               this['model' + (i + 1)] = pastedText.charAt(i);
            }
        }
        this.setValue();
        return false;
    }

    setValue()
    {
        if(isNotNullOrUndefined(this.model1) &&
            isNotNullOrUndefined(this.model2) &&
            isNotNullOrUndefined(this.model3) &&
            isNotNullOrUndefined(this.model4) &&
            isNotNullOrUndefined(this.model5) &&
            isNotNullOrUndefined(this.model6))
        {
            /*if(!this.targetOfSender)
                this.verifyCode();*/
            this.verifyCode();
        }
        else
        {
            if(!this.targetOfSender)
                this.formGroup.get(this.formControlName).setValue('');
        }
    }

    resendCode()
    {
        this.model1 = this.model2 = this.model3 = this.model4 = this.model5 = this.model6 = '';
        switch (this.type)
        {
            case 'mobile':
                let fullMobileNumber;
                if(this.targetOfSender)
                    fullMobileNumber = this.targetOfSender;
                else
                {
                    const mobileNumber = this.prevFormGroup.get('MobileNumber').value;
                    const mobileCode = this.prevFormGroup.get('MobileCode').value;
                    fullMobileNumber = mobileCode + mobileNumber;
                }
                this.baseApiService.apiRequest({MobileNumber: fullMobileNumber, Type:this.verificationCodeType},
                    Controllers.MAIN, Methods.SEND_SMS_CODE,
                    false).pipe(take(1)).subscribe(data => {
                    if(data.ResponseCode === 0)
                    {
                        this.userRegisterService.errorMessage = '';
                        this.isResendActive = false;
                        this.startTimer(data.ResponseObject.ActivePeriodInMinutes * 60);
                    }
                    else
                    {
                        this.userRegisterService.errorMessage = data.Description;
                        this.utilityService.showMessageWithDelay(this, [{'errorMessage': data.Description}]);
                    }
                });
                break;
            case 'email':
                let email;
                if(this.targetOfSender)
                    email = this.targetOfSender;
                else
                {
                    email = this.prevFormGroup.get('Email').value
                }
                this.baseApiService.apiRequest({
                    Email: email,
                    Type:this.verificationCodeType
                }, Controllers.MAIN, Methods.SEND_EMAIL_CODE, false).pipe(take(1)).subscribe(data => {
                    if(data.ResponseCode === 0)
                    {
                        this.isResendActive = false;
                        this.userRegisterService.errorMessage = '';
                        this.startTimer(data.ResponseObject.ActivePeriodInMinutes * 60);
                    }
                    else
                    {
                        this.userRegisterService.errorMessage = data.Description;
                        this.utilityService.showMessageWithDelay(this, [{'errorMessage': data.Description}]);
                    }
                });
                break;
            default:
                break;
        }
    }

    private startTimer(duration)
    {
        let timer:number = duration, minutes, seconds;
        if(this.timerPromise)
            clearInterval(this.timerPromise);
        this.timerPromise = setInterval( () =>
        {
            minutes = parseInt((timer / 60).toString(), 10);
            seconds = parseInt((timer % 60).toString(), 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            this.timerText = minutes + ":" + seconds;

            if (--timer < 0)
            {
                this.isResendActive = true;
                clearInterval(this.timerPromise);
                this.isResendActive = true;
            }
        }, 1000);
    }

    public moveToNext(event, index)
    {
        console.log(event);
        console.log(typeof(event));
        if(event.key === 'Backspace' && index !== 1)
        {
            const prev = event.target.previousElementSibling;
            if(prev)
            {
                if(!isNotNullOrUndefined(this[`model${index}`]))
                {
                    this[`model${index - 1}`] = '';
                    prev.focus();
                }
            }
        }
        else
        {
            if(event.data?.toString().length > 1 || this.validator.test(event.data?.toString()) === false)
            {
                const p =  setTimeout(() => {
                    clearTimeout(p);
                    this[`model${index}`] = null;
                });
                return;
            }
            else
            {
                let next = event.target.nextElementSibling;
                if(next)
                {
                   const p =  setTimeout(() => {
                       clearTimeout(p);
                        next.focus();
                    });
                }
            }
        }
    }

    private verifyCode()
    {
        switch (this.type)
        {
            case 'mobile':
                {
                    let fullMobileNumber;
                    if(this.targetOfSender)
                        fullMobileNumber = this.targetOfSender;
                    else
                    {
                        const mobileNumber = this.prevFormGroup.get('MobileNumber').value;
                        const mobileCode = this.prevFormGroup.get('MobileCode').value;
                        fullMobileNumber = mobileCode + mobileNumber;
                    }
                    const code = this.model1.toString() +
                        this.model2.toString() +
                        this.model3.toString() +
                        this.model4.toString() +
                        this.model5.toString() +
                        this.model6.toString();
                    this.baseApiService.apiRequest({MobileNumber: fullMobileNumber, Code:code, Type:this.verificationCodeType},
                        Controllers.MAIN, Methods.VERIFY_SMS_CODE,
                        false).pipe(take(1)).subscribe(data => {
                        if(data.ResponseCode === 0)
                        {
                            this.errorMessage = null;
                            this.userRegisterService.errorMessage = '';
                            if(!this.targetOfSender)
                                this.formGroup.get(this.formControlName).setValue(code);
                            this.onVerified.emit({type:'sms', questionIds:data.ResponseObject.SecurityQuestions, code:code, callBack:this.callBack});
                            this.otp = code;
                        }
                        else
                        {
                            this.errorMessage = data.Description;
                            this.userRegisterService.errorMessage = data.Description;
                            this.utilityService.showMessageWithDelay(this, [{'errorMessage': data.Description}]);
                            if(!this.targetOfSender)
                                this.formGroup.get(this.formControlName).setValue('');
                        }
                    });
                    break;
                }
            case 'email':
                {
                    let email;
                    if(this.targetOfSender)
                        email = this.targetOfSender;
                    else
                    {
                        email = this.prevFormGroup.get('Email').value
                    }
                    const code = this.model1 + this.model2 + this.model3 + this.model4 + this.model5 + this.model6;
                    this.baseApiService.apiRequest({
                        Code:code,
                        Email: email,
                        Type:this.verificationCodeType
                    }, Controllers.MAIN, Methods.VERIFY_EMAIL_CODE, false).pipe(take(1)).subscribe(data => {
                        if(data.ResponseCode === 0)
                        {
                            this.userRegisterService.errorMessage = '';
                            this.errorMessage = null;
                            if(!this.targetOfSender)
                                this.formGroup.get(this.formControlName).setValue(code);
                            this.onVerified.emit({type:'email', questionIds:data.ResponseObject.SecurityQuestions, code:code, callBack:this.callBack});
                            this.otp = code;
                        }
                        else
                        {
                            this.userRegisterService.errorMessage = data.Description;
                            this.utilityService.showMessageWithDelay(this, [{'errorMessage': data.Description}]);
                            this.errorMessage = data.Description;
                            if(!this.targetOfSender)
                                this.formGroup.get(this.formControlName).setValue('');
                        }
                    });
                    break;
                }
            case 'MobileOrEmail':
            {
                const clientId = this.utilityService.getParsedUrl(location.toString())["ci"];
                const code = this.urlKey;
                for (let i = 0; i < code.length; i++)
                {
                    this['model' + (i + 1)] = code.charAt(i);
                }
                this.baseApiService.apiRequest({
                    Code:code,
                    ClientId: clientId,
                    Type:this.verificationCodeType
                }, Controllers.MAIN, Methods.VERIFY_EMAIL_CODE, false).pipe(take(1)).subscribe(data => {
                    if(data.ResponseCode === 0)
                    {
                        this.userRegisterService.errorMessage = '';
                        this.errorMessage = null;
                        this.onVerified.emit({
                            type: 'MobileOrEmail',
                            questionIds: data.ResponseObject.SecurityQuestions,
                            code: code,
                            callBack: this.callBack
                        });
                        this.otp = code;
                        this.targetOfSender = data.ResponseObject.EmailOrMobile;
                        this.translationKeys[this.type] = this.targetOfSender;
                    }
                    else
                    {
                        this.userRegisterService.errorMessage = data.Description;
                        this.utilityService.showMessageWithDelay(this, [{'errorMessage': data.Description}]);
                        this.errorMessage = data.Description;
                        if(!this.targetOfSender)
                            this.formGroup.get(this.formControlName).setValue('');
                    }
                });
                break;
            }
            default:
                break;
        }
    }
    submit()
    {
        this.verifyCode();
    }
    onChange: (value: any) => void = () => { };
    onTouch: any = () => { }
    writeValue(obj: any): void {
    }
    registerOnChange(fn: any): void {
    }
    registerOnTouched(fn: any): void {
    }

}
