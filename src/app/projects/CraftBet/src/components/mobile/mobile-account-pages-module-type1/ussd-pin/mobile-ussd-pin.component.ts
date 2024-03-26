import { Component, createNgModule, EventEmitter, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseApiService } from '@core/services/api/base-api.service';
import { UtilityService } from '@core/services/app/utility.service';
import { VerificationService } from '@core/services/api/verification.service';
import { GetSettingsInfoService } from '@core/services/app/getSettingsInfo.service';
import { Validator } from '@core/validators/validators';
import { PasswordValidation } from '@core/services/password-validation';
import {Methods, VerificationCodeTypes} from '@core/enums';
import { take } from 'rxjs';
import { LayoutService } from '@core/services/app/layout.service';
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-ussd-pin',
    templateUrl: './mobile-ussd-pin.component.html',
    styleUrls: ['./mobile-ussd-pin.component.scss']
})
export class MobileUssdPinComponent implements OnInit {
    formGroup: FormGroup;
    profileData: any;
    passwordType: { [key: string]: boolean } = {};
    activePeriodInMinutes: number;
    successChangeUssd;

    constructor(protected injector: Injector, private baseApiService: BaseApiService, private utilityService: UtilityService, private fb: FormBuilder,
                private verificationService: VerificationService, private dialog: MatDialog,
                private getSettingsInfoService: GetSettingsInfoService, public layoutService: LayoutService, public translate: TranslateService) {
    }

    ngOnInit(): void {
        this.getClientInfo();
        this.formGroup = this.fb.group({
            'OldPin': ['', [
                // Validators.required,
                // Validator.noWhitespaceValidator,
                Validators.minLength(4),
                Validators.maxLength(4),
            ]],
            'NewPin': ['', [
                Validators.required,
                Validator.noWhitespaceValidator,
                Validators.minLength(4),
                Validators.maxLength(4),
            ]],
            'ConfirmPin': ['', [
                Validators.required,
                Validator.noWhitespaceValidator,
                Validators.minLength(4),
                Validators.maxLength(4)
            ]]
        });
        this.formGroup.get('ConfirmPin').setValidators(PasswordValidation.matchTo.bind(this.formGroup.get('NewPin')));
        this.formGroup.get('NewPin').valueChanges.subscribe(val => {
            val && this.formGroup.get('ConfirmPin').updateValueAndValidity();
        });
    }

    resetState() {
        this.formGroup.reset();
    }

    saveUssdPin() {
        const req = this.formGroup.getRawValue();
        if (this.formGroup.valid && (this.formGroup.get('OldPin').value !== this.formGroup.get('NewPin').value)) {
            this.verificationService.getVerificationCode('mobile').subscribe((responseData) => {
                if (responseData['ResponseCode'] === 0) {
                    this.activePeriodInMinutes = responseData.ResponseObject.ActivePeriodInMinutes;
                    this.openVerifyCode('mobile', this.profileData.MobileNumber);
                } else {
                    this.utilityService.showMessageWithDelay(this, [{ 'errorMessage': responseData.Description }]);
                }
            });
        }
    }

    async openVerifyCode(type: string, targetOfSource: string) {
        const { VerifyCodeModule } = await import('../../../../../../../@theme/components/modals/verify-code/verify-code.module');
        const moduleRef = createNgModule(VerifyCodeModule, this.injector);
        const component = moduleRef.instance.getComponent();
        const callback = new EventEmitter();
        callback.subscribe(data => {
            data.callBack({});
            this.openSecurityQuestions(type, data.code, this.profileData.SecurityQuestions);
        });

        this.dialog.open(component, {data:{
                isModal: true,
                type: type,
                targetOfSender: targetOfSource,
                onVerified: callback,
                activePeriodInMinutes: this.activePeriodInMinutes,
                prefixTitle: '',
                verificationCodeType:VerificationCodeTypes.USSDPinChangeByMobile
            }});
    }

    async openSecurityQuestions(type: string, verifiedCode: string, questionIds: number[]) {
        const { SecurityQuestionsModalModule } = await import('../../../../../../../@theme/components/modals/security-questions-modal/security-questions-modal.module');
        const moduleRef = createNgModule(SecurityQuestionsModalModule, this.injector);
        const component = moduleRef.instance.getComponent();
        const callback = new EventEmitter();
        callback.subscribe(data => {
            const req = this.formGroup.getRawValue();
            delete req.ConfirmPin;
            req.SecurityQuestions = data.securityQuestions;
            req.SMSCode = verifiedCode;
            this.getSettingsInfoService.changeUssdPin(req).pipe(take(1)).subscribe(resp => {
              if (resp.ResponseCode === 0) {
                data.callBack({});
                this.utilityService.showMessageWithDelay(this, [{ 'successChangeUssd': this.translate.instant('Settings.Success-Ussd-pin') }]);
                this.getClientInfo();
                this.resetState();
              } else {
                data.callBack({ error: resp['Description'] });
              }
            });

        });

        this.dialog.open(component, {data:{
                securityQuestionIds: questionIds,
                onSecurityConfirmed: callback
            }});
    }

    dotKey(event) {
        if (event.keyCode === 110 || event.keyCode === 190) {
            event.preventDefault();
        }
    }

    private getClientInfo() {
        this.baseApiService.apiPost('', {}, Methods.GET_CLIENT_INFO, false).pipe(take(1)).subscribe(data => {
            if (data.ResponseCode === 0) {
                this.profileData = data;
            }
        });
    }

}
