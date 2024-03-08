import {Directive, ElementRef, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {BaseComponent} from '../../base/base.component';
import {AuthService, ConfigService, LocalStorageService} from "@core/services";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {VerificationService} from "@core/services/api/verification.service";
import {TranslateService} from "@ngx-translate/core";
import {Validator} from "@core/validators/validators";
import {PasswordValidation} from "@core/services/password-validation";
import {UtilityService} from '@core/services/app/utility.service';
import {take} from "rxjs/operators";
import {add, format} from 'date-fns'
import {SimpleModalService} from "ngx-simple-modal";
import {ConfirmWindowComponent} from "../confirm-window/confirm-window.component";
import {GetSettingsInfoService} from "@core/services/app/getSettingsInfo.service";
import {Subject} from "rxjs";
import {UserRegisterService} from "@core/services/app/userRegister.service";
import { encryptSelfExclusionData} from "@core/utils";

@Directive()
export class BaseSettingsComponent extends BaseComponent{

    public localStorageService: LocalStorageService;
    public fb: FormBuilder;
    public configService: ConfigService;
    public verificationService: VerificationService;
    public translate: TranslateService;
    public utilityService: UtilityService;
    public getSettingsInfoService: GetSettingsInfoService;
    public simpleModalService: SimpleModalService;
    private authService: AuthService;
    public isSubmited: boolean = false;

    public profileForm: FormGroup;
    public limitForm: FormGroup;
    public changePasswordForm: FormGroup;
    public uploadDocumentForm: FormGroup;

    public userData: any;
    public currencyId: string;
    public Date = {
        Day: 0,
        Month: {'Name': '', 'Id': 0},
        Year: 0
    };
    public selfExclusionOn = false;
    public selectedExclusionType = '';
    // public selfExclusionTypes = ['Permanently', 'Temporary'];
    public selfExclusionTypes = { Permanently: 'Permanently', Temporary: 'Temporary' };
    public exclusionMinDate: string;
    public exclusionDate: string = null;
    public profileFormValueChanged = false;

    public changePasswordMessage: any;
    public editData: boolean = false;
    public editEmailData: boolean = false;
    public editMobileData: boolean = false;
    public editSelfLimitation: boolean = false;
    public saveSelfLimitation: boolean;
    public buttonName = true;
    public monthsList: Array<any> = [];
    public Days: any;
    public Years: Array<any> = [];
    public Years2: Array<any> = [];
    public isEmailVerificationRequestSent: boolean;
    public errorMessage: string;
    public errorMessage1: string;
    public successMessage: string;
    public successMessage1: string;
    public isMobileNumberVerificationRequestSent: boolean;
    public mobileSmsCode: any;
    public documentTypes: any;
    public selectedDocument: any = {"Name": "", "Id": ""};
    public mobileVerificationErrorMessage: string = '';
    public mobileVerificationCondSendSuccessMessage: string = '';
    public emailVerificationLinkSendSuccessMessage: string = '';
    public documentStatesEnumList: Array<any> = [];
    public isResendActive: boolean = true;
    public chooseFileName = '';
    public fileData: any;
    public selectedDocumentErrorMessage: any;
    public documentUploadResponseMessage: any;
    public documentUploadResponseMessageType: any;
    public updateDataMessage: any;
    public showMobileVerifyMessage: boolean = false;
    public clientStatuses: any = {};
    public changedEmail;
    public changedMobileNumber;
    public currentValueMobileCode = {
        'Title': '',
        'Type': '',
        'Mask': ''
    };
    public selfLimitationResponse$ = new Subject<any>();
    public mobileOrEmailVerificationResponse$ = new Subject<any>();
    public limits: any;
    public currentLimits: any;
    public limitFormValueChanged = false;
    public disableVerifyButton = false;
    public disableSendCodeButton = false;
    public countryList: any[] = [];
    public countryListFiltered: any[] = [];
    public cityList: any[] = [];
    public cityListFiltered: any[] = [];
    public regionList: any[] = [];
    public reasons: any[] = [];
    public userRegisterService: UserRegisterService;
    public changeOldPasswordType = false;
    public changeNewPasswordType = false;
    public changeConfirmPasswordType = false;
    public depositValidationError;
    public limitValue: any = '0';
    public selectedFile;
    public isSending:boolean = false;
    public isSubmitting:boolean = false;
    public setConfirmPassword = '';
    public selectedReason;
    public selectedReasonId;
    @Output() changePasswordRequestMessage: EventEmitter<any> = new EventEmitter<number>();
    public changePasswordType: boolean = false;
    public selectedDocumentType: string;
    public limitValues = {};
    public dates = [
        { 'Name': 'User.Select Date' },
        { 'Name': 'Filter_Period.3 month' },
        { 'Name': 'Filter_Period.1 Year' },
        { 'Name': 'Filter_Period.3 Years' },
        { 'Name': 'Filter_Period.5 Years' },
    ];

    @ViewChild('documentFile') documentFileRef: ElementRef;


    constructor(public injector: Injector) {
        super(injector);

        this.localStorageService = injector.get(LocalStorageService);
        this.fb = injector.get(FormBuilder);
        this.configService = injector.get(ConfigService);
        this.verificationService = injector.get(VerificationService);
        this.utilityService = injector.get(UtilityService);
        this.translate = injector.get(TranslateService);
        this.getSettingsInfoService = injector.get(GetSettingsInfoService);
        this.simpleModalService = injector.get(SimpleModalService);
        this.userRegisterService = injector.get(UserRegisterService);
        this.authService = injector.get(AuthService);

        this.userData = this.localStorageService.get('user');
        if (this.userData.CityId === 0) {
            this.userData.CityId = null;
        }
        const regex = new RegExp(this.configService.defaultOptions.PassRegEx);
        this.changePasswordForm = this.fb.group({
            'uOldPassword': ['', [
                Validators.required,
                Validator.noWhitespaceValidator,
                Validators.minLength(2),
                Validators.maxLength(30)
            ]],
            'uNewPassword': ['', [
                Validators.required,
                Validator.noWhitespaceValidator,
                Validators.minLength(6),
                Validators.pattern(regex)
            ]],
            'confirmPassword': ['', [
                Validators.required,
                Validator.noWhitespaceValidator,
                Validators.minLength(6),
                Validators.pattern(regex)
            ]]
        });

        // this.limitForm = this.fb.group({
        //     'DepositLimitDaily': [''],
        //     'DepositLimitWeekly': [''],
        //     'DepositLimitMonthly': [''],
        //     'TotalBetAmountLimitDaily': [''],
        //     'TotalBetAmountLimitWeekly': [''],
        //     'TotalBetAmountLimitMonthly': [''],
        //     'TotalLossLimitDaily': [''],
        //     'TotalLossLimitWeekly': [''],
        //     'TotalLossLimitMonthly': [''],
        //     'SessionLimit': ['', Validators.min(3)]
        // });
        this.getLimitsForm();
        this.changePasswordForm.get('confirmPassword').setValidators(PasswordValidation.matchTo.bind(this.changePasswordForm.get('uNewPassword')));
        this.changePasswordForm.get('uNewPassword').valueChanges.subscribe(data => {
            this.changePasswordForm.get('confirmPassword').setValue('');
        });

        this.uploadDocumentForm = this.fb.group({
            'documentItem': ['', []]
        });
    }

    public changeLimit(value) {
        this.limitValue = String(this.limitValue);
        this.limitValue = value;
    }

    getLimitsForm() {
        this.limitForm = this.fb.group({
            'DepositLimitDaily': [''],
            'DepositLimitWeekly': [''],
            'DepositLimitMonthly': [''],
            'TotalBetAmountLimitDaily': [''],
            'TotalBetAmountLimitWeekly': [''],
            'TotalBetAmountLimitMonthly': [''],
            'TotalLossLimitDaily': [''],
            'TotalLossLimitWeekly': [''],
            'TotalLossLimitMonthly': [''],
            'SessionLimit': ['', [Validators.min(3), Validators.max(45000)]]
        });
    }

    getProfileFormValue() {
        this.profileForm = this.fb.group({
            'uEmail': [this.userData.Email, [
                Validators.required,
                Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/)
            ]],
            'uMobileNumber': [this.userData.MobileNumber, []],
            'uGender': [this.userData.Gender, [
                Validators.required,
                Validator.noWhitespaceValidator
            ]],
            'uAddress': [this.userData.Address, [
                Validators.required,
                Validator.noWhitespaceValidator
            ]],
            'uCity': [null, [
                Validators.required,
                Validator.noWhitespaceValidator
            ]],
            'uStateRegion': [this.userData.RegionId, [
                Validators.required,
                Validator.noWhitespaceValidator
            ]],
            'uFirstName': [this.userData.FirstName, [
                Validators.required,
                Validator.noWhitespaceValidator
            ]],
            'uLastName': [this.userData.LastName, [
                Validators.required,
                Validator.noWhitespaceValidator
            ]],
            'uCurrency': [this.userData.CurrencyId, [
                Validators.required,
                Validator.noWhitespaceValidator
            ]],
            'uZipCode': [this.userData.ZipCode, [
            ]],
            'uCountry': [this.userData.CountryId, [
                Validators.required,
                Validator.noWhitespaceValidator
            ]],
            // 'uCitizenship': [this.userData.Citizenship, [
            //     Validators.required,
            //     Validator.noWhitespaceValidator
            // ]],
            'uDocumentNumber': [this.userData.DocumentNumber, [
                Validators.required,
                Validator.noWhitespaceValidator
            ]],
            'uDocumentIssuedBy': [this.userData.DocumentIssuedBy, [
                Validators.required,
                Validator.noWhitespaceValidator
            ]],
            'birthDay': [null, []],
            'birthMonth': [null, []],
            'birthYear': [null, []],
        });
        this.profileForm.get('birthDay').valueChanges.subscribe((data) => {
            this.Date.Day = parseInt(data);
        });

        this.profileForm.get('birthMonth').valueChanges.subscribe((data) => {
            this.Date.Month.Id = parseInt(data);
        });

        this.profileForm.get('birthYear').valueChanges.subscribe((data) => {
            this.Date.Year = parseInt(data);
        });
        this.profileForm.get('uEmail').valueChanges.subscribe((data) => {
            this.changedEmail = data;
            this.disableVerifyButton = true;
        });
        this.profileForm.get('uMobileNumber').valueChanges.subscribe((data) => {
            this.changedMobileNumber = data;
            this.disableSendCodeButton = true;
        });
        this.getSettingsInfoService.onSaveClientDetails$.subscribe((data) => {
            this.updateDataMessage = data;
            this.userData = this.localStorageService.get('user');
            this.utilityService.showError('', this, "updateDataMessage");

            if(sessionStorage.getItem('goToFromDeposit') === 'true' && data.Error === false) {
                sessionStorage.setItem('goToFromDeposit', 'false');
                history.back();
            }
        });

        // country/city
        this.userRegisterService.getCountry({TypeId: 5});
        this.userRegisterService.notifyGetCountry.pipe(take(1)).subscribe(data => {
            this.countryList = data;
            if(this.userData.CountryId)
            {
                this.userRegisterService.getCity(this.userData.CountryId);
            }
        });
        this.profileForm.get('uCountry').valueChanges.subscribe(countryId => {
            this.userRegisterService.getCity(countryId);
        });
        this.userRegisterService.notifyGetCity.pipe().subscribe(data => {
            this.cityList = data;
            if(this.userData.CityId)
                this.profileForm.get('uCity').setValue(this.userData.CityId);
        });
        /* this.userRegisterService.notifyGetCountry.pipe(take(1)).subscribe((data) => {
             this.countryList = data;
             this.countryListFiltered = this.countryList.filter(item => item.Id === this.userData?.CountryId);
             if (this.countryListFiltered[0]?.Id) {
                 this.userRegisterService.getCity(this.countryListFiltered[0]?.Id);
             } else {
                 this.userRegisterService.getCity(this.userData?.CountryId);
             }
             this.subscriptions.push(this.userRegisterService.notifyGetCity.subscribe((data2) => {
                 this.cityList = data2;
                 this.cityListFiltered = this.cityList.filter(item => item.Id === this.userData?.CityId);
                 if (this.cityListFiltered[0]?.Id) {
                     this.userRegisterService.getRegion(this.cityListFiltered[0]?.Id);
                     this.subscriptions.push(this.userRegisterService.notifyGetRegion.subscribe((data3) => {
                         this.regionList = data3;
                     }));
                 } else {
                     const userData = this.userData;
                     this.userRegisterService.getRegion(userData?.CityId);
                     if (this.userData.CityId === null)
                     {
                         this.userData.CityId = 0;
                     }
                 }
             }));
         });*/

        // BirthDate
        this.monthsList = this.utilityService.changeYear(this.Date.Year);
        const d = new Date(this.userData.BirthDate);
        this.Date.Day = d.getDate();
        this.Date.Month.Id = d.getMonth() + 1;
        this.Date.Month.Name = this.monthsList[d.getMonth()].Name;
        // this.Years = this.utilityService.getYearsList();
        this.Date.Year = (d.getFullYear() < this.Years[this.Years.length - 1]) ? this.Years[this.Years.length - 1] : d.getFullYear();
        this.profileForm.get('birthMonth').patchValue(this.Date.Month.Id);
        this.profileForm.get('birthYear').patchValue(this.Date.Year);
        this.profileForm.get('birthDay').patchValue(this.Date.Day);

        this.Days = this.utilityService.changeMonth(this.Date.Year, this.Date.Month.Id);
        this.Years = this.utilityService.getYearsList();
        this.Years = this.Years.slice(0, 100);
        this.verificationService.notifyMobileNumberVerify.subscribe(() => this.userData = this.localStorageService.get('user'));
        this.getClientStatuses();

        // this.getSettingsInfoService.getLimits().pipe(take(1)).subscribe(data => {
        //     if (data.ResponseCode == 0) {
        //         this.limitForm.patchValue(data.ResponseObject);
        //         this.limits = data.ResponseObject;
        //         this.currentLimits = Object.assign({}, this.limits);
        //     }
        // });
        this.onGetLimits();
        this.getReasons();
    }

    ngOnInit() {
        super.ngOnInit();
        this.getProfileFormValue();
        this.exclusionMinDate = format(add(new Date(), {days: this.configService.defaultOptions['SelfExclusionPeriod'] ? this.configService.defaultOptions['SelfExclusionPeriod'] : 1}), 'yyyy-MM-dd');
        this.getDocumentTypes();
        this.getSettingsInfoService._notifyGetChangePasswordResponseMessage.subscribe((data) => {
            this.changePasswordMessage = data;

            this.changePasswordRequestMessage.emit(data);
            this.isSubmited = false;
            this.utilityService.showError('', this, 'changePasswordMessage');
        });
        this.getSettingsInfoService._notifyGetChooseFileName.subscribe((data) => {
            this.fileData = data;
        });

        this.getSettingsInfoService._notifyGetDocumentError.subscribe((data) => {
            this.selectedDocumentErrorMessage = data;
            this.utilityService.showError('', this, 'selectedDocumentErrorMessage');
        });

        this.getSettingsInfoService.notifyGetDocumentUploadResponseMessage$.subscribe((data) => {
            this.documentUploadResponseMessage = data.message;
            this.documentUploadResponseMessageType = data.type;
            this.utilityService.showError('', this, 'documentUploadResponseMessage');
            this.uploadDocumentForm.reset();
            this.resetChangedFile();
            this.getSettingsInfoService.checkDocumentSize = false;
            this.uploadDocumentForm.get('documentItem').setValue('');
            this.isSending = false;
        });

        if(sessionStorage.getItem('goToFromDeposit') === 'true')
        {
            Object.values(this.profileForm.value).forEach((a) => {
                if (a === '') {
                    this.depositValidationError = a;
                }
            });
        }


    }

    public getCreatedFrom(index) {
        let d1 = new Date();

        switch (index) {
            case 0:
                d1 = null;
                break;
            case 1:
                d1.setMonth(d1.getMonth() - 3);
                break;
            case 2:
                d1.setFullYear(d1.getFullYear() - 1);
                break;
            case 3:
                d1.setFullYear(d1.getFullYear() - 3);
                break;
            case 4:
                d1.setFullYear(d1.getFullYear() - 5);
                break;
        }
        if (d1 !== null) {
            const d = format(d1, 'yyyy-MM-dd');
            this.exclusionDate = d;
            return d;
        } else {
            this.exclusionDate = null;
        }

    }

    openConfirmWindow() {
        this.simpleModalService.addModal(ConfirmWindowComponent, {
            title: this.selectedExclusionType
        }).subscribe(result => {
            if (result) {
                this.exclusionDate = this.exclusionDate ? this.exclusionDate : format(add(new Date(), {years: 100}), 'yyyy-MM-dd');
                const encryptedPassword = encryptSelfExclusionData(this.setConfirmPassword);
                const finalData = {
                    Date: this.exclusionDate,
                    Credentials: encryptedPassword,
                    Reason: this.selectedReasonId
                };
                this.getSettingsInfoService.applySelfExclusion(finalData).pipe(take(1)).subscribe(data => {
                    if (data.ResponseCode == 0) {
                        this.utilityService.showMessageWithDelay(this, [{'successMessage': 'Your account has been successfully blocked.'}]);
                        this.getClientStatuses();
                    } else {
                        this.utilityService.showMessageWithDelay(this, [{'errorMessage': data.Description}]);
                    }
                });
            }
        });
    }

    public changePassType() {
        this.changePasswordType = !this.changePasswordType;
    }

    protected onGetLimits() {
        this.getSettingsInfoService.getLimits().pipe(take(1)).subscribe(data => {
            if (data.ResponseCode == 0) {
                this.limits = data.ResponseObject;
                for (const key in this.limits) {
                    if (typeof this.limits[key] === 'object' && this.limits[key] !== null && this.limits[key]?.hasOwnProperty('Limit')) {
                        this.limitValues[key] = this.limits[key].Limit;
                    } else {
                        this.limitValues[key] = this.limits[key];
                    }
                }
                this.limitForm.patchValue(this.limitValues);
                this.currentLimits = Object.assign({}, this.limitValues);
            }

        });
    }

    private getClientStatuses() {
        this.getSettingsInfoService.getClientStatuses().pipe(take(1)).subscribe(data => {
            this.clientStatuses = data.ResponseObject;
        });
    }


    public resetChangedFile() {
        // this.selectedFile = undefined;
        if (this.documentFileRef) {
            this.documentFileRef.nativeElement.value = '';
        }

    }

    public saveResetPassword() {
        this.isSubmited = true;
        setTimeout(() => {
            this.isSubmited = false;
        }, 3000);

        if (this.changePasswordForm.valid && (this.changePasswordForm.get('uOldPassword').value !== this.changePasswordForm.get('uNewPassword').value)) {
            const input = {
                'ClientId': this.userData.Id,
                'OldPassword': this.changePasswordForm.get('uOldPassword').value,
                'NewPassword': this.changePasswordForm.get('uNewPassword').value
            };

            this.getSettingsInfoService.changePassword(input).subscribe((data) =>{});
            this.changePasswordForm.reset();
        }
    }

    resetState()
    {
        this.changePasswordForm.reset();
    }

    public getDocumentTypes() {
        this.getSettingsInfoService.documentTypes();
    }

    public handleInputChange(e) {
        this.getSettingsInfoService.uploadFile(e);
        this.resetChangedFile();
    }

    public addedDocument(event) {
        this.selectedFile = event.target.value;
        this.isSending = true;
    }

    public uploadDocument()
    {
        this.isSending = true;
        this.getSettingsInfoService.uploadDocument(this.uploadDocumentForm.get('documentItem').value);
        this.fileData['Name'] = '';
        this.selectedFile = undefined;
    }

    public removeDocument() {
        // this.getSettingsInfoService.identityModelsList = [];
        this.resetChangedFile();
        this.uploadDocumentForm.get('documentItem').setValue('');
        this.fileData = undefined;
    }

    private setSelfExclusionSettings() {
        this.exclusionDate = this.exclusionDate ? this.exclusionDate : format(add(new Date(), {years: 100}), 'yyyy-MM-dd');
        this.getSettingsInfoService.applySelfExclusion(this.exclusionDate).pipe(take(1)).subscribe(data => {
            if (data.ResponseCode == 0) {
                this.utilityService.showMessageWithDelay(this, [{'successMessage': 'Your account has been successfully blocked.'}]);
                this.selfLimitationResponse$.next({
                    message: 'Your account has been successfully blocked.',
                    type: 'Success'
                });

                this.getClientStatuses();
            } else {
                this.selfLimitationResponse$.next({message: data.Description, type: 'Error'});
                this.utilityService.showMessageWithDelay(this, [{'errorMessage': data.Description}]);
            }
        });
    }

    public updateSelfLimitation() {
		if (this.editSelfLimitation) {
            if (this.limitForm.valid) {
                this.selfExclusionOn && this.setSelfExclusionSettings();
                const values = this.limitForm.getRawValue();
                // const numberValues = Object.keys(values).reduce((acc, key) => {
                //     const value = values[key];
                //     if (value !== null && value !== undefined) {
                //         // const convertedValue = value.toString().replace(/,/g, '.');
                //         const convertedValue = value;
                //         acc[key] = Number(convertedValue);
                //     } else {
                //         acc[key] = null;
                //     }
                //     return acc;
                // }, {});
                // console.log(numberValues);

                const stringValues = Object.keys(values).reduce((acc, key) => {
                    const value = values[key];
                    if (value !== null && value !== undefined) {
                        const convertedValue = value;
                        acc[key] = String(convertedValue);
                    } else {
                        const previousValue = this.limits[key];
                        if (previousValue !== undefined && previousValue !== null) {
                            acc[key] = '-1';
                        } else {
                            acc[key] = null;
                        }
                    }
                    return acc;
                }, {});
                this.getSettingsInfoService.setLimits(stringValues).pipe(take(1)).subscribe(data => {
                    if (data.ResponseCode !== 0) {
                        this.selfLimitationResponse$.next({message: data.Description, type: 'Error'});
                        this.utilityService.showMessageWithDelay(this, [{'errorMessage1': data.Description}]);
                        this.editSelfLimitation = true;
                    } else {
                        this.selfLimitationResponse$.next({message: this.translate.instant('Settings.Successfully updated'), type: 'Success'});
                        this.utilityService.showMessageWithDelay(this, [{'successMessage1': this.translate.instant('Settings.Successfully updated')}]);
                        this.limitFormValueChanged = false;
                        this.editSelfLimitation = false;
                    }
                });
                // this.saveSelfLimitation = false;
            }

        }
    }

    onKeyDown(event: any, controlName: string) {
        const input = event.target as HTMLInputElement;
        const value = input.value;
        const maxLen = 18;

        if (value.length > maxLen) {
            input.value = value.substr(0, maxLen);
        }

        if (value.length >= 14 && value.indexOf('.') === -1) {
            const newValue = value.replace(/(\d{1,13})(\d{1,4})?(\d{1,4})?(\d{1,4})?/, (match, p1, p2, p3, p4) => {
                let result = p1;
                if (p2) result += '.' + p2;
                if (p3) result += '.' + p3;
                if (p4) result += '.' + p4;
                return result;
            });
            input.value = newValue;
        }
        this.limitForm.controls[controlName].setValue(input.value);
    }

    onInput(event) {
        const input = event.target as HTMLInputElement;
        const value = input.value;
        const maxLength = 18;
        const key = event.key;
        if (value.length >= maxLength) {
            event.preventDefault();
        }
    }

    onMinutesInput(event) {
        const input = event.target as HTMLInputElement;
        const value = input.value;
        const maxLength = 5;
        const key = event.key;
        if (value.length >= maxLength) {
            event.preventDefault();
        }
    }

    preventKeys(event: KeyboardEvent) {
        const key = event.key;
        const input = event.target as HTMLInputElement;
        const value = input.value;
        if (key === '+' || key === '-') {
            event.preventDefault();
        }
    }

    preventMinutesKeys(event: KeyboardEvent) {
        const key = event.key;
        const input = event.target as HTMLInputElement;
        const value = input.value;
        if (key === '+' || key === '-' || key === '.') {
            event.preventDefault();
        }
    }

    inputChanging(event) {
        const key = event.key;
        const input = event.target as HTMLInputElement;
        const value = input.value;
        const digits = value.replace(/[^\d.]/g, '');
        const parts = digits.split('.');
        if (parts.length > 1) {
            parts[1] = parts[1].slice(0, 4);
        } else {
            if (value.startsWith('0') && key !== '.') {
                // if (value === '0' || value === '00') {
                if (value === '0' ) {
                    event.preventDefault();
                    return;
                }
                const newValue1 = value.slice(1);
                input.value = newValue1;
                event.preventDefault();
                return;
            }
        }
        const newValue = parts.join('.');
        if (newValue !== value) {
            input.value = newValue;
            event.preventDefault();
        }
    }

    isMaxReached() {
        const depositDailyLimit = this.limitForm.get('DepositLimitDaily').value;
        const depositWeeklyLimit = this.limitForm.get('DepositLimitWeekly').value;
        const depositMonthlyLimit = this.limitForm.get('DepositLimitMonthly').value;
        const totalBetDailyLimit = this.limitForm.get('TotalBetAmountLimitDaily').value;
        const totalBetWeeklyLimit = this.limitForm.get('TotalBetAmountLimitWeekly').value;
        const totalBetMonthlyLimit = this.limitForm.get('TotalBetAmountLimitMonthly').value;
        const totalLostDailyLimit = this.limitForm.get('TotalLossLimitDaily').value;
        const totalLostWeeklyLimit = this.limitForm.get('TotalLossLimitWeekly').value;
        const totalLostMonthlyLimit = this.limitForm.get('TotalLossLimitMonthly').value;
        return depositDailyLimit > 99999999999999.999 || depositWeeklyLimit > 99999999999999.999 || depositMonthlyLimit > 99999999999999.999 ||
        totalBetDailyLimit > 99999999999999.999 || totalBetWeeklyLimit > 99999999999999.999 || totalBetMonthlyLimit > 99999999999999.999 ||
        totalLostDailyLimit > 99999999999999.999 || totalLostWeeklyLimit > 99999999999999.999 || totalLostMonthlyLimit > 99999999999999.999;
    }

    resetLimitFrom() {
        this.limitForm.patchValue(this.currentLimits);
        this.editSelfLimitation = false;
        this.saveSelfLimitation = false;
    }

    toggleEdit()
    {
        this.editData = !this.editData;
    }

    toggleEditSelfLimitation() {
        this.editSelfLimitation = !this.editSelfLimitation;
        this.saveSelfLimitation = true;
    }

    public updateClientDetail() {

        if(this.buttonName) {
            this.toggleEdit();
            this.buttonName = false;
            // return;
        }
        const birthDate = this.Date.Year + '-' + this.Date.Month.Id + '-' + this.Date.Day;
        if (this.profileForm.get('uCity').value === 0) {
            this.profileForm.get('uCity').setValue(null);
        }

        const updatedData = {
            'FirstName': this.profileForm.get('uFirstName').value,
            'LastName': this.profileForm.get('uLastName').value,
            'DocumentNumber': this.profileForm.get('uDocumentNumber').value,
            'DocumentIssuedBy': this.profileForm.get('uDocumentIssuedBy').value,
            'ZipCode': this.profileForm.get('uZipCode').value,
            'Address': this.profileForm.get('uAddress').value,
            'MobileNumber': this.currentValueMobileCode.Type == '' ? this.profileForm.get('uMobileNumber').value.trim() : this.currentValueMobileCode.Type + this.profileForm.get('uMobileNumber').value.trim(),
            'Email': this.profileForm.get('uEmail').value.trim(),
            'BirthDate': birthDate,

            'EmailOrMobile': this.profileForm.get('uEmail').value.trim(),
            'Gender': this.profileForm.get('uGender').value,
            'CurrencyId': this.profileForm.get('uCurrency').value,
            'CountryId': this.profileForm.get('uCountry').value,
            'CityId': +this.profileForm.get('uCity').value,
            'RegionId': this.profileForm.get('uStateRegion').value,
            // 'StateRegion': this.profileForm.get('uStateRegion').value,
            // 'Citizenship': this.profileForm.get('uCitizenship').value,
        };
        if (this.depositValidationError === '') {
            for (const [key, value] of Object.entries(updatedData)) {
                if (value === '') {
                    this.editData = true;
                    return;
                } else {
                    this.editData = false;
                    this.getSettingsInfoService.saveChangeData(updatedData);
                }
            }
        } else {
            this.getSettingsInfoService.saveChangeData(updatedData);
            this.editData = false;
        }
        // this.buttonName = true;

        this.getSettingsInfoService.saveChangeData(updatedData).subscribe((data) => {});
        this.editData = false;
        this.profileFormValueChanged = false;
        this.disableVerifyButton = false;
        this.disableSendCodeButton = false;
    }

    resetProfileForm() {
        this.profileForm.reset();
        this.getProfileFormValue();
        this.editData = false;
        // this.buttonName = true;
    }

    getReasons() {
        this.authService.getExclusionReasons().then((data) => {
            this.reasons = data.ResponseObject;
        });
    }

    public verify(type) {
        this.verificationService.getVerificationCode(type).subscribe((responseData) => {
            if (responseData['ResponseCode'] === 0) {
                if (type === 'mobile') {
                    this.isMobileNumberVerificationRequestSent = true;
                    this.utilityService.showMessageWithDelay(this, [{'mobileVerificationCondSendSuccessMessage': this.translate.instant("Settings.VerifyMobileNumberSendCode"), type: 'Success'}]);
                    this.isResendActive = false;
                    setTimeout(() =>
                            this.isResendActive = true,
                        5000);

                    this.mobileOrEmailVerificationResponse$.next(
                        {message: this.translate.instant("Settings.VerifyMobileNumberSendCode"), type: 'Success'}
                    );
                } else if (type === 'email') {
                    this.isEmailVerificationRequestSent = true;
                    this.emailVerificationLinkSendSuccessMessage = this.translate.instant("Settings.VerifyEmailSendCode");
                    this.utilityService.showMessageWithDelay(this, [{'emailVerificationLinkSendSuccessMessage': this.translate.instant("Settings.VerifyLink"), type: 'Success'}]);
                    this.mobileOrEmailVerificationResponse$.next(
                        {message: this.translate.instant("Settings.VerifyEmailSendCode"), type: 'Success'}
                    );
                }
            } else {
                this.mobileOrEmailVerificationResponse$.next({message: responseData['Description'], type: 'Error'});
                if (type === 'email') {
                    this.utilityService.showMessageWithDelay(this, [{'errorMessage': responseData['Description']}]);
                }

                if (type === 'mobile') {
                    this.isMobileNumberVerificationRequestSent = true;
                    this.showMobileVerifyMessage = true;
                    setTimeout(() =>
                            this.showMobileVerifyMessage = false,
                        5000);
                    this.utilityService.showMessageWithDelay(this, [{'mobileVerificationErrorMessage': responseData['Description']}]);
                }
            }
        });
    }

    public sendVerificationCode(type) {
        this.verificationService.sendVerificationCode(type, this.mobileSmsCode, this.userData.MobileNumber);
    }

    public switchSelfExclusion() {
        this.selfExclusionOn = !this.selfExclusionOn;
    }

    public enableEdit(item) {
        this[item] = true;
    }

    public selectProduct(product) {
        this.selectedExclusionType = product;
    }

    public selectReason(reason) {
        this.selectedReason = reason.Name;
        this.selectedReasonId = reason.Value;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

}
