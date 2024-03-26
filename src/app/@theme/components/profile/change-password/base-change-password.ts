import {createNgModule, Directive, EventEmitter, inject, Injector, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Validator} from "@core/validators/validators";
import {GetSettingsInfoService} from "@core/services/app/getSettingsInfo.service";
import {Methods, VerificationCodeTypes} from "@core/enums";
import {take} from "rxjs";
import {BaseApiService} from "@core/services/api/base-api.service";
import {VerificationService} from "@core/services/api/verification.service";
import {PasswordValidation} from "@core/services/password-validation";
import {ConfigService, LocalStorageService} from "@core/services";
import {UtilityService} from "@core/services/app/utility.service";
import {TranslateService} from "@ngx-translate/core";
import {LogoutHelper} from "@core/services/helpers/logout.helper";
import {MatDialog} from "@angular/material/dialog";

@Directive()
export class BaseChangePassword implements OnInit, OnDestroy
{
    formGroup: FormGroup;
    fb: FormBuilder;
    passwordType:{[key: string]: boolean} = {};
    profileData:any;

    changePasswordMessage: any;
    errorMessage: any;
    activePeriodInMinutes: number;

    private baseApiService:BaseApiService;
    private getSettingsInfoService:GetSettingsInfoService;
    private verificationService: VerificationService;
    dialog = inject(MatDialog);
    public configService: ConfigService;
    private utilityService: UtilityService;
    public translate: TranslateService;
    public logoutHelper: LogoutHelper;
    public localStorageService: LocalStorageService;

    constructor(protected injector:Injector)
    {
        this.fb = injector.get(FormBuilder);
        this.getSettingsInfoService = injector.get(GetSettingsInfoService);
        this.baseApiService = injector.get(BaseApiService);
        this.verificationService = injector.get(VerificationService);
        this.configService = injector.get(ConfigService);
        this.utilityService = injector.get(UtilityService);
        this.translate = injector.get(TranslateService);
        this.logoutHelper = injector.get(LogoutHelper);
        this.localStorageService = injector.get(LocalStorageService);
    }
    ngOnInit()
    {
        this.getClientInfo();
        const regex = new RegExp(this.configService.defaultOptions.PassRegEx);
        this.formGroup = this.fb.group({
            'OldPassword': ['', [
                Validators.required,
                Validator.noWhitespaceValidator,
                Validators.minLength(2),
                Validators.maxLength(30),
            ]],
            'NewPassword': ['', [
                Validators.required,
                Validator.noWhitespaceValidator,
                Validators.minLength(6),
                Validators.pattern(regex)
            ]],
            'ConfirmPassword': ['', [
                Validators.required,
                Validator.noWhitespaceValidator,
                Validators.minLength(6),
                Validators.pattern(regex)
            ]]
        });
        this.formGroup.get('ConfirmPassword').setValidators(PasswordValidation.matchTo.bind(this.formGroup.get('NewPassword')));
        this.formGroup.get('NewPassword').valueChanges.subscribe(val => {
            val && this.formGroup.get('ConfirmPassword').updateValueAndValidity();
        });
    }

    saveResetPassword()
    {
        const req = this.formGroup.getRawValue();
        if (this.formGroup.valid && (this.formGroup.get('OldPassword').value !== this.formGroup.get('NewPassword').value))
        {
            if(this.profileData && this.profileData.SecurityQuestions && this.profileData.SecurityQuestions.length)
            {
                this.verificationService.getVerificationCode('mobile', VerificationCodeTypes.PasswordChangeByMobile).subscribe((responseData) => {
                    if (responseData['ResponseCode'] === 0)
                    {
                        this.activePeriodInMinutes = responseData.ResponseObject.ActivePeriodInMinutes;
                        this.openVerifyCode('mobile', this.profileData.MobileNumber);
                    }
                    else
                    {
                        this.utilityService.showMessageWithDelay(this, [{'errorMessage': responseData.Description}]);
                    }
                });
            }
            else
            {
                this.getSettingsInfoService.changePassword(req).subscribe(data => {});
                this.getSettingsInfoService._notifyGetChangePasswordResponseMessage.subscribe((data) => {
                    this.changePasswordMessage = data;
                    if (this.changePasswordMessage.className === 'error_message')
                    {
                        this.changePasswordMessage.message = data.message;
                        this.utilityService.showError('', this, 'changePasswordMessage');
                    }
                    else
                    {
                        this.translate.get('Settings.change-password-success-message').subscribe((res: string) => {
                            this.changePasswordMessage.message = res;
                            this.utilityService.showError('', this, 'changePasswordMessage');
                        });
                        this.logoutHelper.logout();
                        this.localStorageService.remove('identifier');
                        this.localStorageService.remove('login');
                    }
                });
                this.formGroup.reset();
            }
        }
    }

    ngOnDestroy()
    {

    }

    resetState()
    {
        this.formGroup.reset();
    }


    private getClientInfo()
    {
        this.baseApiService.apiPost('',{},Methods.GET_CLIENT_INFO,false).pipe(take(1)).subscribe(data => {
            if(data.ResponseCode === 0)
            {
                this.profileData = data;
            }
        });
    }

    async openVerifyCode(type:string, targetOfSource:string)
    {
        const { VerifyCodeModule } = await import("../../modals/verify-code/verify-code.module");
        const moduleRef = createNgModule(VerifyCodeModule, this.injector);
        const component = moduleRef.instance.getComponent();
        const callback = new EventEmitter();
        callback.subscribe(data => {
            data.callBack({});
            this.openSecurityQuestions(type, data.code, this.profileData.SecurityQuestions);
        });
        this.dialog.open(component, {data:{isModal:true, type:type, targetOfSender:targetOfSource, onVerified:callback, activePeriodInMinutes: this.activePeriodInMinutes, prefixTitle: '', verificationCodeType:VerificationCodeTypes.PasswordChangeByMobile}});
    }
    async openSecurityQuestions(type:string, verifiedCode:string, questionIds:number[])
    {
        const { SecurityQuestionsModalModule } = await import("../../modals/security-questions-modal/security-questions-modal.module");
        const moduleRef = createNgModule(SecurityQuestionsModalModule, this.injector);
        const component = moduleRef.instance.getComponent();
        const callback = new EventEmitter();
        callback.subscribe(data =>
        {
            const req = this.formGroup.getRawValue();
            req.SecurityQuestions = data.securityQuestions;
            req.SMSCode = verifiedCode;
            this.getSettingsInfoService.changePassword(req).pipe(take(1)).subscribe(resp => {
                if (resp.ResponseCode === 0)
                {
                    data.callBack({});
                    this.resetState();
                }
                else
                {
                    data.callBack({error:resp['Description']});
                }
            });
        });
        this.dialog.open(component, {data:{securityQuestionIds:questionIds, onSecurityConfirmed:callback}});
    }

}
