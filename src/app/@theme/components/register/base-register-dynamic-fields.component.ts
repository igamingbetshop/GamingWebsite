import {Directive, ElementRef, HostListener, Injector, ViewChild} from '@angular/core';
import {ReCaptchaV3Service} from "ng-recaptcha";
import {RegistrationComponent} from './registration.component';
import {
    FormGroup,
    FormControl,
    Validators, ValidationErrors,
} from '@angular/forms';
import {Observable, of, Subject, tap} from "rxjs";
import {debounceTime, distinctUntilChanged, take} from "rxjs/operators";
import {BaseControllerService} from "@core/services/app/baseController.service";
import {AuthService} from "@core/services";
import {BaseApiService} from "@core/services/api/base-api.service";
import {passwordConfigs} from "@core/utils";
import {Controllers, MenuType, Methods, VerificationCodeTypes} from "@core/enums";
import {PasswordValidation} from "@core/services/password-validation";

@Directive()
export class BaseRegisterDynamicFieldsComponent extends RegistrationComponent {

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void
    {
        this.mobileCodePattern = '';
    }
    private recaptchaV3Service: ReCaptchaV3Service;
    private authService: AuthService;
    public checkQustions: boolean = false;

    public logoUrl: string = '';

    public formTemplate: Array<any> = [];

    public formTemplates = [];


    public mobileCodesList: Array<any> = [];

    public quickRegTypeList: Array<any> = [];
    public quickRegFieldsFullList: Array<any> = [];
    public quickFormTemplate: Array<any> = [];

    public baseControllerService: BaseControllerService;
    public baseApiService: BaseApiService;


    public currentRegTypeList: Array<any> = [];
    public allRegTypeList: Array<any> = [];
    public currentValueMobileCode = {
        'Title': '',
        'Type': '',
        'Mask': ''
    };
    public formCreated$ = new Subject();

    stepsLength = [];
    currentStep: number = 1;

    groupedItemsObj: any[] = [];

    checkBackBtnShowingList: Array<any> = [];
    checkRegionPExisting: Array<any> = [];

    currentCitizenshipItemIsoCode = '';

    isCityString = false;

    passwordConfig = [];
    validationMessages = {Password:''};

    translationKeys:any = {MobileNumber:'', Email:''};
    mobileCodePattern:string;
    public openedLogin = false;
    @ViewChild('showFirstStepBackground') public showFirstStepBackground: ElementRef;
    @ViewChild('notScrollable') public notScrollable: ElementRef;

    constructor(public injector: Injector)
    {
        super(injector);
        if(this.configService.defaultOptions['IsReCaptcha'])
        {
            this.recaptchaV3Service = injector.get(ReCaptchaV3Service);
        }
        this.baseControllerService = injector.get(BaseControllerService);
        this.authService = injector.get(AuthService);
        this.baseApiService = injector.get(BaseApiService);
    }

    ngOnInit() {
        super.ngOnInit();
        sessionStorage.clear();
        this.userRegisterService.errorMessage = '';

        const requestData = {TypeId: 5};
        this.userRegisterService.getCountry(requestData);
        this.passwordConfig = passwordConfigs(this.configService);

        this.subscriptions.push(this.userRegisterService.notifyGetCountry.subscribe((data) => {
            this.countryList = data;

            this.mobileCodes.forEach(el => {
                const region = this.countryList.find(region => region.IsoCode == el.Title);
                if(region)
                    el.Country = region.Name;
            });
            let currentCountryItem = this.countryList.filter((item) => item.IsoCode === this.configService.defaultOptions.ServerDefaultCountryCode);
            if (this.configService.defaultOptions.ServerDefaultCountryCode != undefined) {

                for (let i = 0; i < this.regFormSteps.length; i++) {

                    if (this.regFormSteps[i].controls.hasOwnProperty('Citizenship')) {
                        if (currentCountryItem == undefined) {
                            this.regFormSteps[i].controls['Citizenship'].patchValue(this.countryList[0].Id);
                        } else {
                            this.regFormSteps[i].controls['Citizenship'].patchValue(currentCountryItem[0].Id);
                        }
                    }

                    if (this.regFormSteps[i].controls.hasOwnProperty('Country')) {

                        // Remove and add country and fields back call in one promisAll

                        let checkFieldSteps = {
                            type: false,
                            step: '2'
                        };

                        for (const [key, value] of Object.entries(this.groupedItemsObj)) {
                            value.filter(secondSubItem => {
                                if (secondSubItem.Type == 'RegionP') {
                                    checkFieldSteps.type = true;
                                    checkFieldSteps.step = secondSubItem.Type;
                                }
                            });
                        }


                        if (currentCountryItem.length == 0) {
                            this.changeCountry(this.countryList[0], checkFieldSteps.step, `${i + 1}`);
                        } else {
                            this.changeCountry(currentCountryItem[0], checkFieldSteps.step, `${i + 1}`);
                        }
                    }
                }
            }
            if (currentCountryItem.length == 0) {
                this.userRegisterService.getCity(this.countryList[0].Id);
            } else {
                this.userRegisterService.getCity(currentCountryItem[0].Id);
            }
            // this.userRegisterService.getCity(this.countryList[0].Id);
            // this.userRegisterService.getDistrict(this.cityList[0].Id);
        }));

        this.regForm = this.fb.group({});
        this.quickRegForm = this.fb.group({});
        let defaultMobileCode = JSON.parse(localStorage.getItem('ServerDefaultCountryCode'));

        if (defaultMobileCode != undefined)
        {
            let filterByGeolocationItem = this.mobileCodes.filter((item) => item.Title === defaultMobileCode)[0];

            if (filterByGeolocationItem != undefined) {
                this.currentValueMobileCode.Title = filterByGeolocationItem.Title;
                this.currentValueMobileCode.Type = filterByGeolocationItem.Type;
                this.currentValueMobileCode.Mask = filterByGeolocationItem.Mask;
            } else {
                this.currentValueMobileCode.Title = this.mobileCodes[0].Title;
                this.currentValueMobileCode.Type = this.mobileCodes[0].Type;
                this.currentValueMobileCode.Mask = this.mobileCodes[0].Mask;
            }
        }
        else
        {
            this.currentValueMobileCode.Title = this.mobileCodes[0].Title;
            this.currentValueMobileCode.Type = this.mobileCodes[0].Type;
            this.currentValueMobileCode.Mask = this.mobileCodes[0].Mask;
        }
        this.mobileCodesList = this.mobileCodes;

        this.quickRegisterType = this.defaultOptions.QuickRegisterType.find(item => item.Order == 1);
        this.selectRegType(this.defaultOptions.RegisterType.find(item => item.Order == 1));
        this.openedLogin = true;
    }


    getFormValidationErrors(formGroup:FormGroup):boolean
    {
        let hasStepError = false;
        const controlKeys = Object.keys(formGroup.controls);
        for (let controlKey of controlKeys)
        {
            if(formGroup.get(controlKey).touched && !formGroup.get(controlKey).valid)
            {
                hasStepError = true;
                break;
            }
        }
        return hasStepError;
    }


    parseStyleProperties(stylesList) {
        return stylesList.filter((item) => {
            item['DropDownSelected'] = false;
            let parseInfoData = JSON.parse(item.Href);
            if (parseInfoData['FieldSize'] == undefined) {
                item['FieldSize'] = parseInfoData['size'];
            }
            if (parseInfoData['mandatory'] == undefined) {
                item['ValidationName'] = false;
            } else {
                item['ValidationName'] = parseInfoData['mandatory'] == '1' ? true : false;
            }
            if (parseInfoData['hasLabel'] == undefined) {
                item['HasLabel'] = false;
            } else {
                item['HasLabel'] = parseInfoData['hasLabel'] == '1' ? true : false;
            }
            if (parseInfoData['link'] == undefined) {
                item['Link'] = null;
            } else {
                item['Link'] = parseInfoData['link'];
            }
            if (parseInfoData['maxLength'] == undefined) {
                item['MaxLength'] = Infinity;
            } else {
                item['MaxLength'] = parseInfoData['maxLength'];
            }
            return item;
        });
    }


    public groupedItems(array) {
        return array.reduce((r, a) => {
            r[a.Icon] = [...r[a.Icon] || [], a];
            return r;
        }, {});
    }


    getFormControlNames(type) {
        let groups = [];
        let quickGroup = {};

        if (type === 'full') {
            let count = 0;
            this.baseControllerService.GetMenu(MenuType.REGISTRATION, 'en').then((menuData) =>
            {
                let filterFieldList = menuData.filter((item) => item.Title == 'FullRegister');

                let form_template: Array<any> = filterFieldList[0].SubMenu.filter((item) => {

                    item['DropDownSelected'] = false;

                    let parseInfoData = JSON.parse(item.Href);

                    if (parseInfoData['FieldSize'] == undefined) {
                        item['FieldSize'] = parseInfoData['size'];
                    }

                    if (parseInfoData.hasOwnProperty('request')) {
                        item['Request'] = parseInfoData['request'];
                    }

                    if (parseInfoData['mandatory'] == undefined) {
                        item['ValidationName'] = false;
                    } else {
                        item['ValidationName'] = parseInfoData['mandatory'] == '1' ? true : false;
                    }
                    if (parseInfoData.hasOwnProperty('regExp'))
                    {
                        item['RegExp'] = parseInfoData['regExp'];
                    }

                    if (item.StyleType && (item.StyleType !== null)) {
                        if (typeof item.StyleType == 'string') {
                            item['selectList'] = JSON.parse(item.StyleType);
                        }
                    }

                    if (parseInfoData['hasLabel'] == undefined) {
                        item['HasLabel'] = false;
                    } else {
                        item['HasLabel'] = parseInfoData['hasLabel'] == '1' ? true : false;
                    }
                    if (parseInfoData['link'] == undefined) {
                        item['Link'] = null;
                    } else {
                        item['Link'] = parseInfoData['link'];
                    }
                    if (item['Icon'] == null || item['Icon'] == "")
                        item['Icon'] = "1";
                    if (Number(item['Icon']) > count)
                        count = Number(item['Icon']);

                    return item;


                });
                for (let i = 0; i < count; i++) {
                    this.formTemplates[i] = [];
                    this.regFormSteps[i] = this.fb.group({});
                    groups[i] = {};
                }

                this.groupedItemsObj = this.groupedItems(form_template);

                this.stepsLength = [];

                for (const [key, value] of Object.entries(this.groupedItemsObj)) {
                    this.formTemplates[`${Number(key) - 1}`] = value;
                    this.stepsLength.push(key);
                    this.groupedItemsObj[key].forEach((input_template_element) => {
                        if (input_template_element.Type == 'BirthDateDMY')
                            this.initDate();
                        if (input_template_element.hasOwnProperty('Request')) {
                            if (input_template_element['Type'] === 'select') {
                                this.getSelectTypeFieldList(input_template_element);
                            }
                            else if (input_template_element['Type'] === 'verify-email')
                            {
                                this.checkBackBtnShowingList[`${Number(key)}`] = '1';
                            }
                            else {
                                this.checkBackBtnShowingList[`${Number(key)}`] = '';
                            }
                        } else {
                            this.checkBackBtnShowingList[`${Number(key)}`] = '';
                        }


                        if (input_template_element.Type !== 'info')
                        {
                            if (input_template_element.Type == 'RegionP')
                                this.checkRegionPExisting[`${Number(key) - 1}`] = input_template_element.Title;
                            else
                                this.checkRegionPExisting[`${Number(key) - 1}`] = '';

                            if (input_template_element.ValidationName) {
                                groups[Number(key) - 1][input_template_element.Title] = new FormControl('', [Validators.required]);
                            } else {
                                groups[Number(key) - 1][input_template_element.Title] = new FormControl('', []);
                            }
                            if(input_template_element.RegExp)
                            {
                                groups[Number(key) - 1][input_template_element.Title].addValidators([Validators.pattern(new RegExp(input_template_element.RegExp))]);
                            }
                            if(input_template_element.Type == 'checkbox')
                            {
                                if(input_template_element.ValidationName)
                                    groups[Number(key) - 1][input_template_element.Title].setValidators([Validators.requiredTrue]);
                                groups[Number(key) - 1][input_template_element.Title].setValue(false,{emitValue:false});
                            }
                        }
                    });
                }

                for (let i = 0; i < groups.length; i++) {

                    if (groups[i] != {}) {
                        this.regFormSteps[i] = new FormGroup(groups[i]);

                        if (this.regFormSteps[i].controls.hasOwnProperty('CurrencyId')) {

                            let defaultCurrency = JSON.parse(localStorage.getItem('ServerDefaultCurrencyId'));

                            if (defaultCurrency != undefined) {
                                let filterByGeolocationItem = this.currencyList.filter((item) => item === defaultCurrency)[0];
                                this.regFormSteps[i].get('CurrencyId').patchValue(filterByGeolocationItem);
                            } else {
                                this.regFormSteps[i].get('CurrencyId').patchValue(this.currencyList[0]);
                            }

                        }

                        if (this.regFormSteps[i].controls.hasOwnProperty('AcceptTerms'))
                        {
                            this.regFormSteps[i].get('AcceptTerms').patchValue(false);
                        }

                        if (this.regFormSteps[i].controls.hasOwnProperty('PromoCode'))
                        {
                            if (this.router.url.includes('ReferenceCode') && this.saveData.registerReferalData['ReferenceCode']) {
                                this.regFormSteps[i].controls['PromoCode'].patchValue(this.saveData.registerReferalData['ReferenceCode']);
                            }
                        }

                        if (this.regFormSteps[i].controls.hasOwnProperty('Country'))
                        {
                            if (this.countryList.length > 0) {
                                let defaultCurrency = JSON.parse(localStorage.getItem('ServerDefaultCountryCode'));
                                if (defaultCurrency != undefined) {
                                    let currentCountryItem = this.countryList.filter((item) => item.IsoCode === this.configService.defaultOptions.ServerDefaultCountryCode)[0];
                                    if (currentCountryItem == undefined) {
                                        this.regFormSteps[i].controls['Country'].patchValue(this.countryList[0].Id);
                                    } else {
                                        this.regFormSteps[i].controls['Country'].patchValue(currentCountryItem.Id);
                                    }
                                }
                            }

                            this.regFormSteps[i].addControl('City', new FormControl('', []));
                            this.regFormSteps[i].addControl('District', new FormControl('', []));
                           /* this.regFormSteps[i].addControl('Town', new FormControl('', []));*/

                        }

                        if (this.regFormSteps[i].controls.hasOwnProperty('State')) {

                            this.regFormSteps[i].addControl('Country', new FormControl('', []));

                            if (this.countryList.length > 0) {
                                let defaultCurrency = JSON.parse(localStorage.getItem('ServerDefaultCountryCode'));
                                if (defaultCurrency != undefined) {
                                    let currentCountryItem = this.countryList.filter((item) => item.IsoCode === this.configService.defaultOptions.ServerDefaultCountryCode)[0];
                                    if (currentCountryItem == undefined) {
                                        this.regFormSteps[i].controls['Country'].setValue(this.countryList[0].Id, {emitEvent: false});
                                    } else {
                                        this.regFormSteps[i].controls['Country'].setValue(currentCountryItem.Id, {emitEvent: false});
                                    }
                                }
                            }
                            this.regFormSteps[i].addControl('City', new FormControl('', []));
                            this.regFormSteps[i].addControl('District', new FormControl('', []));
                        }

                        if(this.regFormSteps[i].controls.hasOwnProperty('Email'))
                        {
                            this.regFormSteps[i].get('Email').valueChanges.subscribe(data => {
                                this.translationKeys.Email = this.regFormSteps[i].get('Email').value;
                            });
                        }

                        if (this.regFormSteps[i].controls.hasOwnProperty('MobileCode'))
                        {
                            if (this.regFormSteps[i].get('MobileCode').errors !== null) {
                                if (this.regFormSteps[i].get('MobileCode').errors.required) {
                                    this.regFormSteps[i].addControl('MobileNumber', new FormControl('', [Validators.required]));
                                }
                            } else {
                                this.regFormSteps[i].addControl('MobileNumber', new FormControl('', []));
                            }

                            this.regFormSteps[i].get('MobileNumber').valueChanges.subscribe(data => {
                                this.translationKeys.MobileNumber = this.regFormSteps[i].get('MobileCode').value + data;
                            });

                            let defaultMobileCode = JSON.parse(localStorage.getItem('ServerDefaultCountryCode'));
                            if (defaultMobileCode != undefined) {
                                let filterByGeolocationItem = this.mobileCodes.filter((item) => item.Title === defaultMobileCode)[0];
                                if (filterByGeolocationItem != undefined) {
                                    this.regFormSteps[i].get('MobileCode').patchValue(filterByGeolocationItem.Type);
                                } else {
                                    this.regFormSteps[i].get('MobileCode').patchValue(this.currentValueMobileCode.Type);
                                }
                            } else {
                                this.regFormSteps[i].get('MobileCode').patchValue(this.currentValueMobileCode.Type);
                            }
                        }

                        if (this.regFormSteps[i].controls.hasOwnProperty('BirthDay')) {
                            if (this.regFormSteps[i].get('BirthDay').errors && this.regFormSteps[i].get('BirthDay').errors.required) {
                                this.regFormSteps[i].addControl('BirthMonth', new FormControl('', [Validators.required]));
                                this.regFormSteps[i].addControl('BirthYear', new FormControl('', [Validators.required]));
                            } else {
                                this.regFormSteps[i].addControl('BirthMonth', new FormControl('', []));
                                this.regFormSteps[i].addControl('BirthYear', new FormControl('', []));
                            }
                        }

                        if (this.regFormSteps[i].controls.hasOwnProperty('Password'))
                        {
                            this.regFormSteps[i].addControl('confirmPassword', new FormControl('', [Validators.required]));
                            this.regFormSteps[i].get('confirmPassword').setValidators([PasswordValidation.matchTo.bind(this.regFormSteps[i].get('Password')), Validators.required, Validators.pattern(new RegExp(this.configService.defaultOptions.PassRegEx))]);
                            this.regFormSteps[i].get('Password').valueChanges.pipe(
                                debounceTime(500),
                                distinctUntilChanged()
                            ).subscribe((value) =>
                            {
                                value && this.regFormSteps[i].get('confirmPassword').updateValueAndValidity();
                                let validationMessage = '';
                                for(let config of this.passwordConfig)
                                {
                                    const valid = config.condition(value);
                                    if(!valid)
                                    {
                                        validationMessage = config.name;
                                        break;
                                    }
                                }
                                this.validationMessages.Password = validationMessage;
                            });

                        }

                        if (typeof this.checkRegionPExisting[i] === 'string' && this.checkRegionPExisting[i].trim().length !== 0) {
                            if (this.regFormSteps[i].get(this.checkRegionPExisting[i]).errors && this.regFormSteps[i].get(this.checkRegionPExisting[i]).errors.required) {
                                this.regFormSteps[i].addControl('Country', new FormControl('', [Validators.required]));
                                this.regFormSteps[i].addControl('State', new FormControl('', [Validators.required]));
                                this.regFormSteps[i].addControl('City', new FormControl('', [Validators.required]));
                                this.regFormSteps[i].addControl('District', new FormControl('', [Validators.required]));
                                this.regFormSteps[i].addControl('Address', new FormControl('', [Validators.required]));
                                this.regFormSteps[i].addControl('BuildingNumber', new FormControl('', []));
                                this.regFormSteps[i].addControl('Apartment', new FormControl('', []));
                            } else {
                                this.regFormSteps[i].addControl('Country', new FormControl('', []));
                                this.regFormSteps[i].addControl('State', new FormControl('', []));
                                this.regFormSteps[i].addControl('City', new FormControl('', []));
                                this.regFormSteps[i].addControl('District', new FormControl('', []));
                                this.regFormSteps[i].addControl('Address', new FormControl('', []));
                                this.regFormSteps[i].addControl('BuildingNumber', new FormControl('', []));
                                this.regFormSteps[i].addControl('Apartment', new FormControl('', []));
                            }
                            if (this.countryList.length > 0) {
                                let defaultCurrency = JSON.parse(localStorage.getItem('ServerDefaultCountryCode'));
                                if (defaultCurrency != undefined) {
                                    let currentCountryItem = this.countryList.filter((item) => item.IsoCode === this.configService.defaultOptions.ServerDefaultCountryCode)[0];
                                    if (currentCountryItem == undefined) {
                                        this.regFormSteps[i].controls['Country'].setValue(this.countryList[0].Id, {emitEvent: false});
                                    } else {
                                        this.regFormSteps[i].controls['Country'].setValue(currentCountryItem.Id, {emitEvent: false});
                                    }
                                }
                            }
                            this.regFormSteps[i].removeControl(this.checkRegionPExisting[i]);
                        }
                    }
                }
                this.formCreated$.next(null);
                this.formReady = true;
            });
        }
        else if (type === 'quick') {
            this.stepsLength = [];
            this.baseControllerService.GetMenu(MenuType.REGISTRATION, 'en').then(menuData => {
                let filterFieldList = menuData.filter((item) => item.Title == 'QuickRegister');
                this.quickRegFieldsFullList = this.parseStyleProperties(filterFieldList[0].SubMenu);

                this.quickRegFieldsFullList.forEach(item => {
                    if (item.Type === 'dropdown') {
                        let dropDownValue = JSON.parse(item.Icon);

                        this.quickRegTypeList = dropDownValue.filter((quickType, index) => {
                            quickType['Field'] = this.quickRegFieldsFullList.filter((fieldItem) => fieldItem.Title == quickType.Type)[0];
                            if (index > 0) {
                                this.quickFormTemplate = this.quickRegFieldsFullList.filter((fieldItem) => fieldItem.Title != quickType.Type);
                            }
                            return quickType;
                        });

                        // For not dropdown filters(For example CupGroup Mobile version)

                        this.allRegTypeList = this.quickRegTypeList;

                        console.log(this.allRegTypeList);

                        this.currentRegTypeList = this.quickRegTypeList.filter((item, index) => {
                            if (index > 0) {
                                return item;
                            }
                        });
                        this.quickRegisterType = this.quickRegTypeList[0];
                    }
                });

                this.quickFormTemplate.forEach(input_template =>
                {
                    if (input_template.Type === 'MobileData') {
                        let defaultMobileCode = JSON.parse(localStorage.getItem('ServerDefaultCountryCode'));
                        if (defaultMobileCode != undefined) {
                            let filterByGeolocationItem = this.mobileCodes.filter((item) => item.Title === defaultMobileCode)[0];
                            if (filterByGeolocationItem == undefined) {
                                quickGroup['MobileCode'] = new FormControl(this.mobileCodes[0].Type, [Validators.required]);
                            } else {
                                quickGroup['MobileCode'] = new FormControl(filterByGeolocationItem.Type, [Validators.required]);
                            }
                        } else {
                            quickGroup['MobileCode'] = new FormControl(this.mobileCodes[0].Type, [Validators.required]);
                        }
                        quickGroup['MobileNumber'] = new FormControl('', [Validators.required]);

                    } else {

                        let parseInfoData = JSON.parse(input_template.Href);
                        if (parseInfoData.hasOwnProperty('regExp')) {
                            input_template['RegExp'] = parseInfoData['regExp'];
                        }
                        if (input_template.ValidationName)
                        {
                            quickGroup[input_template.Title] = new FormControl('', [Validators.required]);
                            if(input_template.Type == 'checkbox')
                            {
                                quickGroup[input_template.Title].setValidators([Validators.requiredTrue]);
                            }
                        }
                        else
                        {
                            quickGroup[input_template.Title] = new FormControl('', []);
                        }

                        if(input_template.RegExp)
                        {
                            quickGroup[input_template.Title].addValidators([Validators.pattern(new RegExp(input_template.RegExp))]);
                        }
                    }
                });

                this.quickRegForm = new FormGroup(quickGroup);

                if (this.quickRegForm.controls.hasOwnProperty('CurrencyId')) {
                    let defaultCurrency = JSON.parse(localStorage.getItem('ServerDefaultCurrencyId'));
                    if (defaultCurrency != undefined) {
                        let filterByGeolocationItem = this.currencyList.filter((item) => item === defaultCurrency)[0];
                        this.quickRegForm.get('CurrencyId').patchValue(filterByGeolocationItem, {emitEvent: false});
                    } else {
                        this.quickRegForm.get('CurrencyId').patchValue(this.currencyList[0], {emitEvent: false});
                    }
                }

                if (this.quickRegForm.controls.hasOwnProperty('PromoCode')) {
                    if (this.saveData.registerReferalData['ReferenceCode']) {
                        this.quickRegForm.controls['PromoCode'].patchValue(this.saveData.registerReferalData['ReferenceCode']);
                    }
                }

                if (this.quickRegForm.controls.hasOwnProperty('AcceptTerms')) {
                    this.quickRegForm.get('AcceptTerms').patchValue(false);
                }

                if (this.quickRegForm.controls.hasOwnProperty('Country')) {

                    if (this.countryList.length > 0) {
                        let defaultCurrency = JSON.parse(localStorage.getItem('ServerDefaultCountryCode'));
                        if (defaultCurrency != undefined) {
                            let currentCountryItem = this.countryList.filter((item) => item.IsoCode === this.configService.defaultOptions.ServerDefaultCountryCode)[0];
                            if (currentCountryItem == undefined) {
                                this.quickRegForm.controls['Country'].patchValue(this.countryList[0].Id, {emitEvent: false});
                            } else {
                                this.quickRegForm.controls['Country'].patchValue(currentCountryItem.Id, {emitEvent: false});
                            }
                        }
                    }
                    this.quickRegForm.addControl('City', new FormControl('', []));
                }

                if (this.quickRegForm.controls.hasOwnProperty('MobileCode')) {
                    if (this.quickRegForm.get('MobileCode').errors !== null) {
                        if (this.quickRegForm.get('MobileCode').errors.required) {
                            this.quickRegForm.addControl('MobileNumber', new FormControl('', [Validators.required]));
                        }
                    } else {
                        this.quickRegForm.addControl('MobileNumber', new FormControl('', []));
                    }

                    let defaultMobileCode = JSON.parse(localStorage.getItem('ServerDefaultCountryCode'));
                    if (defaultMobileCode != undefined) {
                        let filterByGeolocationItem = this.mobileCodes.filter((item) => item.Title === defaultMobileCode)[0];
                        if (filterByGeolocationItem != undefined) {
                            this.quickRegForm.get('MobileCode').patchValue(filterByGeolocationItem.Type);
                        } else {
                            this.quickRegForm.get('MobileCode').patchValue(this.currentValueMobileCode.Type);
                        }
                    } else {
                        this.quickRegForm.get('MobileCode').patchValue(this.currentValueMobileCode.Type);
                    }

                }

                if (this.quickRegForm.controls.hasOwnProperty('BirthDay')) {
                    if (this.quickRegForm.get('BirthDay').errors.required) {
                        this.quickRegForm.addControl('BirthMonth', new FormControl('', [Validators.required]));
                        this.quickRegForm.addControl('BirthYear', new FormControl('', [Validators.required]));
                    } else {
                        this.quickRegForm.addControl('BirthMonth', new FormControl('', []));
                        this.quickRegForm.addControl('BirthYear', new FormControl('', []));
                    }

                    if (this.quickRegForm.controls.hasOwnProperty('BirthDay')) {
                        if (this.quickRegForm.get('BirthDay').errors.required) {

                        }
                    }
                }

                if (this.quickRegForm.controls.hasOwnProperty('Password')) {
                    this.quickRegForm.addControl('confirmPassword', new FormControl('', [Validators.required]));
                    this.quickRegForm.get('confirmPassword').setValidators([PasswordValidation.matchTo.bind(this.quickRegForm.get('Password')), Validators.required, Validators.pattern(new RegExp(this.configService.defaultOptions.PassRegEx))]);
                    this.quickRegForm.get('Password').valueChanges.pipe(
                        debounceTime(500),
                        distinctUntilChanged()
                    ).subscribe((value) =>
                    {
                        value && this.quickRegForm.get('confirmPassword').updateValueAndValidity();
                        let validationMessage = '';
                        for(let config of this.passwordConfig)
                        {
                            const valid = config.condition(value);
                            if(!valid)
                            {
                                validationMessage = config.name;
                                break;
                            }
                        }
                        this.validationMessages.Password = validationMessage;
                    });
                }

                this.formReady = true;
            });
        }
    }


    getSelectTypeFieldList(fieldItem) {
        if (fieldItem.Request) {
            this.authService.getReferralTypes().then((recponceData) => {
                if (recponceData.ResponseCode == 0) {
                    this.formTemplates[`${Number(fieldItem['Icon']) - 1}`].filter((subItem) => {
                        if (subItem['Title'] === fieldItem['Title']) {
                            subItem['StyleType'] = recponceData.ResponseObject;
                            subItem['selectList'] = recponceData.ResponseObject;
                            return subItem;
                        }
                    });
                }
            });
        }

        switch (fieldItem.Request) {
            case 'GetJobAreas':
                this.authService.getJobAreas().then((recponceData) => {
                    if (recponceData.ResponseCode == 0) {
                        this.formTemplates[`${Number(fieldItem['Icon']) - 1}`].filter((subItem) => {
                            if (subItem['Title'] === fieldItem['Title']) {
                                subItem['StyleType'] = recponceData.ResponseObject;
                                subItem['selectList'] = recponceData.ResponseObject;
                                return subItem;
                            }
                        });
                    }
                });
                break;
        }
    }

    trackByMethod(index, item) {
        return item ? item.Order : undefined;
    }


    changeQuickRegisterType(value) {
        this.quickRegisterType = value;

        this.currentRegTypeList = this.quickRegTypeList.filter((item) => item.Type !== value['Type']);
        if (typeof value == 'object') {
            if (value['Type'] === 'Email') {
                if (this.quickRegForm.controls.hasOwnProperty('MobileCode')) {
                    this.quickFormTemplate = this.quickRegFieldsFullList.filter(el => el.Title !== "MobileCode" && (el.Title !== "Mobile"));
                    this.quickRegForm.removeControl('MobileCode');
                    this.quickRegForm.removeControl('MobileNumber');
                }
                this.quickRegForm.addControl('Email', new FormControl('', [Validators.required]));
            } else if (value['Type'] === 'Mobile') {
                if (this.quickRegForm.controls.hasOwnProperty('Email')) {
                    this.quickRegForm.removeControl('Email');
                    this.quickFormTemplate = this.quickRegFieldsFullList.filter(el => el.Title !== "Email");
                }
                let defaultMobileCode = JSON.parse(localStorage.getItem('ServerDefaultCountryCode'));

                if (defaultMobileCode != undefined) {
                    let filterByGeolocationItem = this.mobileCodes.filter((item) => item.Title === defaultMobileCode)[0];
                    if (filterByGeolocationItem == undefined) {
                        this.quickRegForm.addControl('MobileCode', new FormControl(this.mobileCodes[0].Type, [Validators.required]));
                    } else {
                        this.quickRegForm.addControl('MobileCode', new FormControl(filterByGeolocationItem.Type, [Validators.required]));
                    }
                } else {
                    this.quickRegForm.addControl('MobileCode', new FormControl(this.mobileCodes[0].Type, [Validators.required]));
                }

                this.quickRegForm.addControl('MobileNumber', new FormControl('', [Validators.required]));
            }
        } else {
            if (value === 'Email') {
                if (this.quickRegForm.controls.hasOwnProperty('MobileCode')) {
                    this.quickFormTemplate = this.quickRegFieldsFullList.filter(el => el.Title !== "MobileCode" && (el.Title !== "Mobile"));
                    this.quickRegForm.removeControl('MobileCode');
                    this.quickRegForm.removeControl('MobileNumber');
                }
                this.quickRegForm.addControl('Email', new FormControl('', [Validators.required]));
            } else if (value === 'Mobile') {
                if (this.quickRegForm.controls.hasOwnProperty('Email')) {
                    this.quickRegForm.removeControl('Email');
                    this.quickFormTemplate = this.quickRegFieldsFullList.filter(el => el.Title !== "Email");
                }
                let defaultMobileCode = JSON.parse(localStorage.getItem('ServerDefaultCountryCode'));

                if (defaultMobileCode != undefined) {
                    let filterByGeolocationItem = this.mobileCodes.filter((item) => item.Title === defaultMobileCode)[0];
                    if (filterByGeolocationItem == undefined) {
                        this.quickRegForm.addControl('MobileCode', new FormControl(this.mobileCodes[0].Type, [Validators.required]));
                    } else {
                        this.quickRegForm.addControl('MobileCode', new FormControl(filterByGeolocationItem.Type, [Validators.required]));
                    }
                } else {
                    this.quickRegForm.addControl('MobileCode', new FormControl(this.mobileCodes[0].Type, [Validators.required]));
                }

                this.quickRegForm.addControl('MobileNumber', new FormControl('', [Validators.required]));
            }
        }


    }

    selectMobileCode(mobileCodeItem, type = '1')
    {
        this.mobileCodePattern = '';
        this.currentValueMobileCode.Title = mobileCodeItem.Title;
        this.currentValueMobileCode.Type = mobileCodeItem.Type;
        this.currentValueMobileCode.Mask = mobileCodeItem.Mask;

        if (type === 'quick') {
            this.quickRegForm.get('MobileCode').patchValue(mobileCodeItem.Type);
        } else {
            this.regFormSteps[`${Number(type) - 1}`].get('MobileCode').patchValue(mobileCodeItem.Type);
        }
    }


    changeCustomDropdownValue(itemName, item, type = '1') {
        if ((typeof item === "number") || typeof item === "string") {
            if (type == 'quick') {
                this.quickRegForm.get(itemName).patchValue(item, {emitEvent: false});
            } else {
                this.regFormSteps[`${Number(type) - 1}`].get(itemName).patchValue(item, {emitEvent: false});
            }
        } else {
            if (type == 'quick')
                this.quickRegForm.get(itemName).patchValue(item.Id, {emitEvent: false});
            else
                this.regFormSteps[`${Number(type) - 1}`].get(itemName).patchValue(item.Id, {emitEvent: false});
        }

    }

    changeRegion1(itemName, item, type = '1') {
        if (item === '') {
            this.regFormSteps[`${Number(type) - 1}`].controls['Citizenship'].patchValue('', {emitEvent: false});
        } else {
            if (typeof item == 'object') {
                this.regFormSteps[`${Number(type) - 1}`].get(itemName).patchValue(item.Id, {emitEvent: false});
            } else {
                this.regFormSteps[`${Number(type) - 1}`].get(itemName).patchValue(item, {emitEvent: false});
            }
        }


        this.changeDocTypeValue();
    }

    public changeDocTypeValue(fieldAllData = {}) {
        let checkFieldType = {
            checkedItem: false,
            Title: ''
        };

        this.formTemplates.filter(subItem => {
            subItem.filter(secondSubItem => {
                if (secondSubItem.Type == 'RegionP') {
                    checkFieldType.checkedItem = true;
                    checkFieldType['Title'] = secondSubItem.Title;
                }
            })
        });

        if (checkFieldType['checkedItem']) {
            this.formTemplates.filter((filterItem) => {

                filterItem.filter((subFilterItem) => {

                    if (subFilterItem.Title === 'Citizenship') {
                        if (this.regFormSteps[`${Number(subFilterItem['Icon']) - 1}`].get('Citizenship').value != '') {
                            this.currentCitizenshipItemIsoCode = this.countryList.filter((item) => item.Id == this.regFormSteps[`${Number(subFilterItem['Icon']) - 1}`].get('Citizenship').value)[0].IsoCode;
                        }
                    }

                    if (((this.currentCitizenshipItemIsoCode != "") && (this.currentRegion.IsoCode != ""))) {
                        if ((this.currentRegion.IsoCode === this.currentCitizenshipItemIsoCode) && this.currentRegion.IsoCode == checkFieldType.Title) {
                            if (subFilterItem.Title === 'DocumentType') {
                                if (subFilterItem.StyleType && subFilterItem.StyleType !== null) {
                                    let specialIsoCodeList = [],
                                        emptyIsoCodeList = [];

                                    JSON.parse(subFilterItem.StyleType).filter((subFieldItem) => {
                                        if (subFieldItem.Country === this.currentRegion.IsoCode) {
                                            specialIsoCodeList.push(subFieldItem);
                                        } else if (subFieldItem.Country == "") {
                                            emptyIsoCodeList.push(subFieldItem);
                                        }
                                    });

                                    if (specialIsoCodeList.length > 0) {
                                        subFilterItem['selectList'] = [...specialIsoCodeList];
                                        if (specialIsoCodeList.length == 1) {
                                            this.regFormSteps[`${Number(subFilterItem['Icon']) - 1}`].get('DocumentType').setValue(specialIsoCodeList[0].Id);
                                        }
                                    } else {
                                        subFilterItem['selectList'] = [...emptyIsoCodeList];
                                        if (emptyIsoCodeList.length == 1) {
                                            this.regFormSteps[`${Number(subFilterItem['Icon']) - 1}`].get('DocumentType').setValue(emptyIsoCodeList[0].Id);
                                        }
                                    }
                                }
                            }
                        } else {
                            if (subFilterItem.Title === 'DocumentType') {
                                if (subFilterItem.StyleType && subFilterItem.StyleType !== null) {
                                    let emptyIsoCodeList = [];

                                    JSON.parse(subFilterItem.StyleType).filter((subFieldItem) => {
                                        if (subFieldItem.Country == "") {
                                            emptyIsoCodeList.push(subFieldItem);
                                        }
                                    });

                                    subFilterItem['selectList'] = [...emptyIsoCodeList];
                                    if (emptyIsoCodeList.length == 1) {
                                        this.regFormSteps[`${Number(subFilterItem['Icon']) - 1}`].get('DocumentType').setValue(emptyIsoCodeList[0].Id);
                                    }
                                }
                            }
                        }
                    }
                });

                return filterItem;
            });
        }
    }

    public changeCountry(item, fieldType = '', step = '1') {

        if (item === '') {
            this.regFormSteps[`${Number(step) - 1}`].controls['Country'].setValue('', {emitEvent: false});
            this.regFormSteps[`${Number(step) - 1}`].controls['City'].setValue('', {emitEvent: false});
            this.regFormSteps[`${Number(step) - 1}`].controls['District'].setValue('', {emitEvent: false});
            this.regFormSteps[`${Number(step) - 1}`].controls['Town'].setValue('', {emitEvent: false});
        } else {
            if (typeof item === 'object') {
                this.regFormSteps[`${Number(step) - 1}`].controls['Country'].setValue(item.Id, {emitEvent: false});
                this.currentRegion.Country = item['Name'];
                this.currentRegion.IsoCode = item['IsoCode'];
            } else {
                this.currentRegion.Country = this.countryList.filter(subItem => subItem.Id == item)[0].Name;
                this.currentRegion.IsoCode = this.countryList.filter(subItem => subItem.Id == item)[0]['IsoCode'];
            }

            if (fieldType == 'RegionP')
            {
                this.isCityString = true;
                this.addRemoveFieldsByCountry(Number(step) - 1, this.checkRegionPExisting[Number(step) - 1]);
            }

            if (fieldType.includes('4') || fieldType == 'RegionP') {
                if (typeof item === 'object') {
                    if (item.IsoCode != this.checkRegionPExisting[`${Number(step) - 1}`]) {
                        this.userRegisterService.getCity(item.Id);
                    } else {
                        this.userRegisterService.getRegion(item.Id);
                    }
                } else {
                    let currentIsoCode = this.countryList.filter(subFilteredItem => subFilteredItem.Id == item)[0]['IsoCode'];
                    if (currentIsoCode != this.checkRegionPExisting[`${Number(step) - 1}`]) {
                        this.userRegisterService.getCity(item);
                    } else {
                        this.userRegisterService.getRegion(item);
                    }
                }
            } else if (fieldType.includes('2')) {
                if (typeof item === 'object') {
                    this.userRegisterService.getCity(item.Id);
                } else {
                    this.userRegisterService.getCity(item);
                }
            }
            else if (fieldType.includes('3'))
            {
                if (typeof item === 'object')
                {
                    this.userRegisterService.getDistrict(item.Id);
                }
                else
                {
                    this.userRegisterService.getDistrict(item);
                }
            }
        }

        this.changeDocTypeValue();
    }

    public addRemoveFieldsByCountry(index, country) {
        if (this.currentRegion.IsoCode == country) {
            if (!this.regFormSteps[index].controls.hasOwnProperty('State')) {
                this.regFormSteps[index].addControl('State', new FormControl('', [Validators.required]));
                this.regFormSteps[index].addControl('District', new FormControl('', [Validators.required]));
                this.regFormSteps[index].addControl('BuildingNumber', new FormControl(''));
                this.regFormSteps[index].addControl('Apartment', new FormControl(''));
            }

            if (this.regFormSteps[index].controls.hasOwnProperty('City') && (this.regFormSteps[index].get('City').value !== "")) {
                this.regFormSteps[index].get('City').setValue('');
            }
        } else {

            if (this.regFormSteps[index].controls.hasOwnProperty('State')) {
                if (this.regFormSteps[index].controls.hasOwnProperty('City')) {
                    this.regFormSteps[index].get('City').reset();
                }
            }

            if (this.regFormSteps[index].controls.hasOwnProperty('Address')) {
                this.regFormSteps[index].get('Address').reset();
            }

            this.regFormSteps[index].removeControl('State');
            this.regFormSteps[index].removeControl('District');
            this.regFormSteps[index].removeControl('BuildingNumber');
            this.regFormSteps[index].removeControl('Apartment');
        }
    }

    selectRegType(type, update = true)
    {
        if(update)
        {
            super.selectRegType(type);
            if (this.registerType?.Title == this.registerTypes.QUICK) {
                this.getFormControlNames('quick');
            } else if (this.registerType?.Title == this.registerTypes.FULL || this.registerType === undefined)
            {
                this.getFormControlNames('full');
            }
        }
    }

    submit() {
        if (this.regForm.valid) {
            if (this.defaultOptions.IsReCaptcha) {
                this.subscriptions.push(this.recaptchaV3Service.execute("register").subscribe(token => {
                    this.register(token);
                }));
            } else {
                this.register();
            }
        }
    }

    getUserRegister(params, login = true) {
        this.userRegisterService.getUserRegister(params, login);
    }

    protected register(reCaptchaKey ?: string, showSuccessView = true)
    {
        this.showSuccessView = showSuccessView;
        if (this.saveData.registerReferalData)
        {
            if (this.saveData.registerReferalData['ReferenceCode'])
                this.regForm.addControl('PromoCode', new FormControl(this.saveData.registerReferalData['ReferenceCode']));
            if (this.saveData.registerReferalData['BonusCode'])
                this.regForm.addControl('BonusCode', new FormControl(this.saveData.registerReferalData['BonusCode']));
            if (this.saveData.registerReferalData['clickid'])
                this.regForm.addControl('RefId', new FormControl(this.saveData.registerReferalData['clickid']));
            if (this.saveData.registerReferalData['sourceid'])
                this.regForm.addControl('AffiliateId', new FormControl(this.saveData.registerReferalData['sourceid']));
            if (this.saveData.registerReferalData['AffiliatePlatformId'])
                this.regForm.addControl('AffiliatePlatformId', new FormControl(this.saveData.registerReferalData['AffiliatePlatformId']));
            if (this.saveData.registerReferalData['AgentCode'])
                this.regForm.addControl('AgentCode', new FormControl(this.saveData.registerReferalData['AgentCode']));
        }

        let params = this.regForm.getRawValue();
        params['TermsConditionsAccepted'] = true;
        if(params.SecurityQuestions)
            params.SecurityQuestions = JSON.parse(params.SecurityQuestions);

        if (reCaptchaKey)
            params.ReCaptcha = reCaptchaKey;
        if (params.MobileNumber)
            params.MobileNumber = params.MobileCode + params.MobileNumber;

        if (this.registerType?.Title == this.registerTypes.QUICK) {
            if (typeof this.quickRegisterType == 'object') {
                if (this.quickRegisterType.Type === this.registerTypes.QUICK_MOBILE) {
                    this.userRegisterService.getQuickSmsRegistration(params, true);
                } else {
                    this.userRegisterService.getQuickEmailRegistration(params, true);
                }
            } else {
                if (this.quickRegisterType === this.registerTypes.QUICK_MOBILE) {
                    this.userRegisterService.getQuickSmsRegistration(params, true);
                } else {
                    this.userRegisterService.getQuickEmailRegistration(params, true);
                }
            }
        }
        else
        {
            if(this.isCityString)
            {
                params.Address = params.Address + ', ' + params.City;
                delete params.City;
            }
            //params.SecurityQuestions = this.securityQuestionState.value;
            let autoLogin = true;
            if(this.registerType && this.registerType.Settings)
                autoLogin = this.registerType.Settings.autoLogin;
            this.getUserRegister(params, autoLogin);

        }
    }

    nextBtn(nextType, currentStep)
    {
        if(this.formValidationType === 'submit')
        {
            this.regFormSteps[currentStep - 1].markAllAsTouched();
            this.regFormSteps[currentStep - 1].updateValueAndValidity();
        }
        const group = this.groupedItemsObj[this.currentStep].find(elem => elem.hasOwnProperty('Request'));

        if (group && group.Request && group.Type != 'select') {

            this.stepAction(Number(group.Request)).pipe(take(1)).subscribe(data => {
                if (data.ResponseCode == 0)
                {
                    this.userRegisterService.errorMessage = '';
                    this.nextStep(nextType, currentStep);
                }
                else
                {
                    this.utilityService.showErrorDynamicallyInTime(data.Description, this);
                    this.userRegisterService.errorMessage = data.Description;
                    //this.nextStep(nextType, currentStep);
                }
            });
        } else this.nextStep(nextType, currentStep);
    }
    public changePassType() {
        this.changePasswordType = !this.changePasswordType;
    }

    public changeConfirmPassType() {
        this.changeConfirmPasswordType = !this.changeConfirmPasswordType;
    }

    // public errorOpened = true;
    // closeErrorPopup() {
    //     this.errorOpened = false;
    // }

    public nextStep(nextType, currentStep) {
        // this.submitted = true;   //for showing validation message
        // if(this.errorMessage) {
        //     this.errorOpened = true;
        // }
        if (currentStep == 'quick')
        {
            if(this.formValidationType === 'submit')
            {
                this.quickRegForm.markAllAsTouched();
                this.quickRegForm.updateValueAndValidity();
            }
            if (this.quickRegForm.valid)
            {
                let obj = {...this.quickRegForm.getRawValue()};
                for (const [key, value] of Object.entries(obj)) {
                    if (this.regForm.controls.hasOwnProperty(`${key}`)) {
                        this.regForm.get(`${key}`).patchValue(`${value}`);
                    } else {
                        this.regForm.addControl(`${key}`, new FormControl(`${value}`, []));
                    }
                }
                if (this.regForm.controls.hasOwnProperty('AcceptTerms')) {
                    if (JSON.parse(this.regForm.get('AcceptTerms').value)) {
                        this.submit();
                    }
                } else {
                    this.submit();
                }
            }
        } else {
            if (this.stepsLength.length == currentStep) {
                if (this.regFormSteps[`${Number(currentStep) - 1}`].valid) {
                    let obj;
                    let objsArray = [];
                    for (let i = 0; i < currentStep; i++) {
                        objsArray.push(this.regFormSteps[`${i}`].getRawValue());
                    }

                    obj = Object.assign({}, ...objsArray);

                    for (const [key, value] of Object.entries(obj)) {
                        if (this.regForm.controls.hasOwnProperty(`${key}`)) {
                            this.regForm.get(`${key}`).patchValue(`${value}`);
                        } else {
                            this.regForm.addControl(`${key}`, new FormControl(`${value}`, []))
                        }
                    }

                    if (this.regForm.controls.hasOwnProperty('AcceptTerms')) {
                        if (JSON.parse(this.regForm.get('AcceptTerms').value)) {
                            this.submit();
                        }
                    } else {
                        this.submit();
                    }


                }
            } else {
                this.currentStep = this.regFormSteps[`${Number(currentStep) - 1}`].valid ? nextType : currentStep;
                let showFirstStepBackground = this.registerType?.Settings.showFirstStepBackground;
                if (showFirstStepBackground === false && this.currentStep !== currentStep) {
                    const showBackground = this.showFirstStepBackground?.nativeElement;
                    showBackground.style.display = 'none';
                    this.notScrollable?.nativeElement.classList.remove('allForms');
                }
            }

        }

    }

    prevBtn(currentStep) {
        this.currentStep = currentStep;
        let showFirstStepBackground = this.registerType?.Settings.showFirstStepBackground;
        const showBackground = this.showFirstStepBackground?.nativeElement;
        if (showFirstStepBackground === false && this.currentStep === currentStep) {
            showBackground.style.display = 'block';
            this.notScrollable?.nativeElement.classList.remove('notScrollable');
            this.notScrollable?.nativeElement.classList.add('allForms');
        }
    }

    private stepAction(type: number): Observable<any> {
        let mobileNumber;
        let mobileCode;
        switch (type) {
            case 1:
                mobileNumber = this.regFormSteps[this.currentStep - 1].get('MobileNumber').value;
                mobileCode = this.regFormSteps[this.currentStep - 1].get('MobileCode').value;
                return this.baseApiService.apiRequest({MobileNumber: mobileCode + mobileNumber, Type:VerificationCodeTypes.MobileNumberVerification},
                    Controllers.MAIN, Methods.SEND_SMS_CODE, false).pipe(tap(data => {
                    if(data.ResponseCode === 0)
                    {
                        if(data.ResponseObject.hasOwnProperty('ActivePeriodInMinutes'))
                        {
                            this.otpTimer = data.ResponseObject.ActivePeriodInMinutes;
                            this.verificationCodeType = VerificationCodeTypes.MobileNumberVerification;
                        }
                    }
                }));
            case 2:
                mobileNumber = this.regFormSteps[this.currentStep - 2].get('MobileNumber').value;
                mobileCode = this.regFormSteps[this.currentStep - 2].get('MobileCode').value;
                const code = this.regFormSteps[this.currentStep - 1].get('SmsCode').value;
                return this.baseApiService.apiRequest({
                    Code: code,
                    MobileNumber: mobileCode + mobileNumber,
                    Type:VerificationCodeTypes.MobileNumberVerification
                }, Controllers.MAIN, Methods.VERIFY_SMS_CODE, false);
            case 3:
                return this.baseApiService.apiRequest({
                    Email: this.regFormSteps[this.currentStep - 1].get('Email').value,Type:VerificationCodeTypes.EmailVerification
                }, Controllers.MAIN, Methods.SEND_EMAIL_CODE, false).pipe(tap(data => {
                    if(data.ResponseCode === 0)
                    {
                        if(data.ResponseObject.hasOwnProperty('ActivePeriodInMinutes'))
                        {
                            this.otpTimer = data.ResponseObject.ActivePeriodInMinutes;
                            this.verificationCodeType = VerificationCodeTypes.EmailVerification;
                        }
                    }
                }));
            case 4:
                const emailCode = this.regFormSteps[this.currentStep - 1].get('EmailCode').value;
                return this.baseApiService.apiRequest({
                    Code: emailCode,
                    Email: this.regFormSteps[this.currentStep - 2].get('Email').value,
                    Type:VerificationCodeTypes.EmailVerification
                }, Controllers.MAIN, Methods.VERIFY_EMAIL_CODE, false);
            default:
                return of(null);
        }
    }

    public redirectToSocialProviderLoginPage(provider)
    {
        if(provider.ProviderId)
        {
            window.location.href = provider.ProviderId;
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.submitted = false;
    }


    focusInput(input:HTMLInputElement)
    {
        input.focus();
    }

    openModal(type, event) {
        event.stopPropagation();
        if (type === 'Login') {
            this.saveData.clickForgotPassword.next('1');
            this.saveData.openPopup.next(1);
            this.openedLogin = true;
        }
    }


}
