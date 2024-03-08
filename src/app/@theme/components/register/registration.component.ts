import {Directive, Injector, ViewChild} from '@angular/core';

import {BaseComponent} from '../base/base.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ReCaptcha2Component} from "ngx-captcha";
import {TranslateService} from "@ngx-translate/core";
import {ConfigService, LoaderService, SaveData} from "@core/services";
import {UserRegisterService} from "@core/services/app/userRegister.service";
import {UtilityService} from "@core/services/app/utility.service";
import {LangService} from "@core/services/app/lang.service";
import {RegisterTypes} from "@core/enums";
import * as html2pdf from 'html2pdf.js';
import * as jsPDF from "jspdf";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {take} from "rxjs/operators";
import {DeviceDetectorService} from "ngx-device-detector";


@Directive()
export class RegistrationComponent extends BaseComponent {
    public configService: ConfigService;
    public saveData: SaveData;
    private deviceDetector:DeviceDetectorService;
    public userRegisterService: UserRegisterService;
    public utilityService: UtilityService;
    public translate: TranslateService;
    public langService: LangService;
    private loaderService:LoaderService;

    public currentRegion = {
        'Country': 'Select Country',
        'City': 'Select City',
        'State': 'Select Region',
        'District': 'Select District',
        'Town': 'Select Town',
        'IsoCode': ''
    };

    public router: Router;
    public fb: FormBuilder;

    public regForm: FormGroup;

    public regFormSteps: Array<FormGroup> = [];
    public quickRegForm: FormGroup;
    public fullRegForm: FormGroup;
    public changePasswordType: boolean = false;
    public changeConfirmPasswordType: boolean = false;

    public countryList: Array<any> = [];
    public cityList: Array<any> = [];
    public townList: Array<any> = [];
    public regionList: Array<any> = [];
    public districtList: Array<any> = [];
    public cities: Array<any> = [];
    public mobileCodes: Array<any> = [];
    public currencyList: Array<any> = [];
    public defaultOptions: any;

    public Years: Array<any> = [];
    public Months: Array<any> = [];
    public Days: Array<any> = [];
    public showRegisterByType: boolean = false;
    public siteKey: string;
    public initCaptcha: boolean;
    public errorMessage: string;
    public showSuccessView: boolean = false;
    public showSuccessMessage: boolean = false;
    @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
    public theme: 'light' | 'dark' = 'light';
    public size: 'compact';
    public lang: string = 'en';
    public showMobileField: boolean = false;
    public registerType: any;
    public quickRegisterType: any;
    public pinCode: any;
    public submitted = false;
    public registerTypes = RegisterTypes;
    public otpTimer:number;
    public verificationCodeType:number;
    private http: HttpClient;


    public currentMonthName: string;

    public showAllowedAgeError = false;
    formReady:boolean = false;
    formValidationType:string = 'blur';


    constructor(public injector: Injector) {
        super(injector);

        this.configService = injector.get(ConfigService);

        // DefaultCurrency
        this.saveData = injector.get(SaveData);
        this.userRegisterService = injector.get(UserRegisterService);
        this.utilityService = injector.get(UtilityService);
        this.translate = injector.get(TranslateService);
        this.langService = injector.get(LangService);

        this.fb = injector.get(FormBuilder);
        this.router = injector.get(Router);
        this.http = injector.get(HttpClient);
        this.deviceDetector = injector.get(DeviceDetectorService);
        this.loaderService = injector.get(LoaderService);
    }

    ngOnInit()
    {
        super.ngOnInit();
        this.defaultOptions = this.configService.defaultOptions;
        this.mobileCodes = this.defaultOptions['MobileCodes'];

        this.currencyList = this.defaultOptions['Currencies'];
        this.siteKey = this.defaultOptions['ReCaptchaKey'];
        this.pinCode = this.mobileCodes[0];

        if(this.defaultOptions['FormValidationType'])
        {
            this.formValidationType = this.defaultOptions['FormValidationType'];
        }

        // const requestData = {TypeId: 5};
        // this.userRegisterService.getCountry(requestData);

        this.subscriptions.push(this.userRegisterService.notifyGetRegion.subscribe((data) => {
            this.regionList = data;
        }));

        this.subscriptions.push(this.userRegisterService.notifyGetDistrict.subscribe((data) => {
            this.districtList = data;
        }));

        this.subscriptions.push(this.userRegisterService.notifyGetCity.subscribe((data) => {
            this.cityList = data;
        }));

        this.subscriptions.push(this.userRegisterService.notifyGetTown.subscribe((data) => {
            this.townList = data;
        }));

        this.subscriptions.push(this.userRegisterService.notifyGetUserRegisterError.subscribe((error) => {
            this.showSuccessView = false;
            this.showSuccessMessage = false;
            // this.errorMessage = error;
            this.utilityService.showMessageWithDelay(this, [{'errorMessage': error}]);
            // this.utilityService.showError(this.errorMessage, this);
        }));

        this.subscriptions.push(this.userRegisterService.notifyGetUserRegisterData.subscribe((data) => {
            this.showSuccessView = true;
            this.showSuccessMessage = true;
        }));

        this.Years = this.utilityService.getYearsList();

        setTimeout(() => {
            this.initCaptcha = true;
        }, 2000);


    }


    public selectRegType(type)
    {
        if(type)
        {
            this.registerType = type;
            if(type.Settings && typeof type.Settings === 'string')
                this.registerType.Settings = JSON.parse(type.Settings);
            this.saveData.clickonButton.next(this.showRegisterByType);
        }
    }



    public changeYear(value = null, type = '1', dependency = true) {
        if (type === 'quick') {
            if (value === null) {
                let bMonthElement = document.getElementById('birth-month');
                let bDayElement = document.getElementById('birth-day');
                bMonthElement.classList.remove('opened');
                bDayElement.classList.remove('opened');
                this.quickRegForm.controls['BirthYear'].setValue('', {emitEvent: false})
            } else {
                this.quickRegForm.controls['BirthYear'].setValue(value, {emitEvent: false});
                this.Months = this.utilityService.changeYear(value);
                const selectedMonthId = this.quickRegForm.controls['BirthMonth'].value;
                if (!this.Months.some(month => month.Id === +selectedMonthId)) {
                    this.quickRegForm.controls['BirthMonth'].setValue('', { emitEvent: false });
                }
            }

            if (this.quickRegForm.controls['BirthYear'].value == '') {
                this.quickRegForm.controls['BirthMonth'].setValue("", {emitEvent: false});
                this.quickRegForm.controls['BirthDay'].setValue("", {emitEvent: false});
            } else {
                this.Months = this.utilityService.changeYear(value);
            }
        } else {
            if (value === null) {
                let bMonthElement = document.getElementById('birth-month');
                let bDayElement = document.getElementById('birth-day');
                bMonthElement.classList.remove('opened');
                bDayElement.classList.remove('opened');
                this.regFormSteps[Number(type) - 1].controls['BirthYear'].setValue('', {emitEvent: false})
            } else {
                this.regFormSteps[Number(type) - 1].controls['BirthYear'].setValue(value, {emitEvent: false});
                this.Months = this.utilityService.changeYear(value);
                const selectedMonthId = this.regFormSteps[`${Number(type) - 1}`].controls['BirthMonth'].value;
                if (!this.Months.some(month => month.Id === +selectedMonthId)) {
                    this.regFormSteps[`${Number(type) - 1}`].controls['BirthMonth'].setValue('', { emitEvent: false });
                }
            }

            if (this.regFormSteps[`${Number(type) - 1}`].controls['BirthYear'].value == '') {
                this.regFormSteps[`${Number(type) - 1}`].controls['BirthMonth'].setValue("", {emitEvent: false});
                this.regFormSteps[`${Number(type) - 1}`].controls['BirthDay'].setValue("", {emitEvent: false});
            } else {
                this.Months = this.utilityService.changeYear(value);
            }
        }
    }

    public changeMonth(birthMonth = null, type = '1') {
        if (type === 'quick') {
            if (typeof birthMonth == 'object') {
                this.quickRegForm.controls['BirthMonth'].setValue(birthMonth.Id, {emitEvent: false});
            }

            if (birthMonth === 'null') {
                this.quickRegForm.controls['BirthDay'].setValue("", {emitEvent: false});
            } else {
                const yearItem = this.quickRegForm.controls['BirthYear'].value;

                if (typeof birthMonth === 'number') {
                    this.Days = this.utilityService.changeMonth(yearItem, birthMonth);
                    this.currentMonthName = this.Months.filter(item => item.Id == birthMonth)[0].Name;
                } else {
                    this.Days = this.utilityService.changeMonth(yearItem, birthMonth);
                    this.currentMonthName = birthMonth.Name;
                }
            }
        } else {
            if (typeof birthMonth == 'object') {
                this.regFormSteps[`${Number(type) - 1}`].controls['BirthMonth'].setValue(birthMonth.Id, {emitEvent: false});
            }

            if (birthMonth === 'null') {
                this.regFormSteps[`${Number(type) - 1}`].controls['BirthDay'].setValue("", {emitEvent: false});
            } else {
                const yearItem = this.regFormSteps[`${Number(type) - 1}`].controls['BirthYear'].value;

                if (typeof birthMonth === 'number') {
                    this.Days = this.utilityService.changeMonth(yearItem, birthMonth);
                    this.currentMonthName = this.Months.filter(item => item.Id == birthMonth)[0].Name;
                } else {
                    this.Days = this.utilityService.changeMonth(yearItem, birthMonth);
                    this.currentMonthName = birthMonth.Name;
                }
            }
        }
    }

    yearDMY(value, type = '1') {
        if (this.regFormSteps[`${Number(type) - 1}`].controls['BirthMonth'].value && this.regFormSteps[`${Number(type) - 1}`].controls['BirthMonth'].value == 2) {
            let yearItem = new Date().getFullYear(), Days = [];
            for (let i = 1; i <= this.utilityService.days(this.regFormSteps[`${Number(type) - 1}`].controls['BirthMonth'].value, value); i++) {
                Days.push(i);
            }
            this.Days = Days;
        }
        if (this.regFormSteps[`${Number(type) - 1}`].controls['BirthDay'].value && this.Days.length < Number(this.regFormSteps[`${Number(type) - 1}`].controls['BirthDay'].value)) {
            this.regFormSteps[`${Number(type) - 1}`].controls['BirthDay'].setValue(this.Days[0], {emitEvent: false});
        }
        this.showAllowedAgeError = this.utilityService.checkAllowedAge(this.regFormSteps[`${Number(type) - 1}`].controls['BirthDay'].value, this.regFormSteps[`${Number(type) - 1}`].controls['BirthMonth'].value, value);
    }

    monthDMY(value, type = '1') {
        let yearItem = this.regFormSteps[`${Number(type) - 1}`].controls['BirthYear'].value, Days = [];
        if (!yearItem)
            yearItem = new Date().getFullYear();
        for (let i = 1; i <= this.utilityService.days(value, yearItem); i++) {
            Days.push(i);
        }
        this.Days = Days;
        if (this.regFormSteps[`${Number(type) - 1}`].controls['BirthDay'].value && this.Days.length < Number(this.regFormSteps[`${Number(type) - 1}`].controls['BirthDay'].value)) {
            this.regFormSteps[`${Number(type) - 1}`].controls['BirthDay'].setValue(this.Days[0], {emitEvent: false});
        }
        this.showAllowedAgeError = this.utilityService.checkAllowedAge(this.regFormSteps[`${Number(type) - 1}`].controls['BirthDay'].value, value, this.regFormSteps[`${Number(type) - 1}`].controls['BirthYear'].value);
    }

    dayDMY(value, type = '1') {
        this.showAllowedAgeError = this.utilityService.checkAllowedAge(value, this.regFormSteps[`${Number(type) - 1}`].controls['BirthMonth'].value, this.regFormSteps[`${Number(type) - 1}`].controls['BirthYear'].value);
    }

    changeRegion(item, step = '', type = '1') {
        if (item === '') {
            this.regFormSteps[`${Number(type) - 1}`].controls['State'].patchValue('', {emitEvent: false});
        } else {
            this.currentRegion.State = item['Name'];
            this.regFormSteps[`${Number(type) - 1}`].controls['State'].patchValue(item.Id, {emitEvent: false});

            if (step.includes('4')) {
                this.userRegisterService.getDistrict(item.Id);
            }
        }
    }

    changeRegionP(item, step = '', type = '1') {
        if (item === '') {
            this.regFormSteps[`${Number(type) - 1}`].controls['State'].patchValue('', {emitEvent: false});
        } else {
            if (typeof item == 'object') {
                this.currentRegion.State = item['Name'];
                this.regFormSteps[`${Number(type) - 1}`].controls['State'].patchValue(item.Id, {emitEvent: false});
            } else {
                this.currentRegion.State = this.regionList.filter(subItem => subItem.Id == item)[0].Name;
            }


            if (step == 'RegionP') {
                if (typeof item == 'object')
                    this.userRegisterService.getDistrict(item.Id);
                else
                    this.userRegisterService.getDistrict(item);
            }
        }
    }

    changeDistrict(item, step = '', type = '1') {
        if (item === '') {
            this.regFormSteps[`${Number(step) - 1}`].controls['District'].patchValue('', {emitEvent: false});
            this.regFormSteps[`${Number(step) - 1}`].controls['City'].patchValue('', {emitEvent: false});
        } else {
            if (typeof item == 'object') {
                this.currentRegion.District = item['Name'];
                this.regFormSteps[`${Number(type) - 1}`].controls['District'].patchValue(item.Id, {emitEvent: false});
            } else {
                this.userRegisterService.getCity(this.districtList[0].Id);
                this.currentRegion.District = this.districtList.filter(subItem => subItem.Id == item)[0].Name;
            }
            if (type.includes('3') || type.includes('4') || type == 'RegionP') {
                if (typeof item == 'object')
                    this.userRegisterService.getCity(item.Id);
                else
                    this.userRegisterService.getCity(item);
            }
        }
    }

    changeGender(item, type = '1') {
        if (item === '') {
            this.regFormSteps[`${Number(type) - 1}`].controls['Gender'].patchValue('', {emitEvent: false});
        }
    }

    changeCity(item, type = '1')
    {
        if (item === '')
        {
            this.regFormSteps[`${Number(type) - 1}`].controls['City'].patchValue('', {emitEvent: false});
        }
        else
        {
            if (typeof item === 'object')
            {
                this.currentRegion.City = item['Name'];
                this.regFormSteps[`${Number(type) - 1}`].controls['City'].patchValue(item.Id, {emitEvent: false});
            }
            else
            {
                this.currentRegion.City = this.cityList.filter(subItem => subItem.Id == item)[0].Name;
            }
        }
        if(item)
        {
            this.userRegisterService.getTown(item);
        }
    }

    changeTown(item, type = '1')
    {
        this.regFormSteps[`${Number(type) - 1}`].controls['Town'].patchValue(item || '', {emitEvent: false});
    }

    public changePassType() {
        this.changePasswordType = !this.changePasswordType;
    }

    // Fix that problem for ProFitBet

    public changeRegisterType(value) {
        this.quickRegisterType = value;
        // if (this.quickRegisterType.Title == this.registerTypes.QUICK_MOBILE) {
        //   this.showMobileField = true;
        //   this.regForm.addControl('MobileCode', new FormControl(this.mobileCodes[0].Type, [Validators.required]));
        //   this.regForm.addControl('MobileNumber', new FormControl('', [Validators.required]));
        //   this.regForm.removeControl('Email');
        //   if (this.quickRegisterType.Type && this.quickRegisterType.Type == '2') {
        //     this.regForm.addControl('UserName', new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]));
        //   }
        //
        // } else {
        //   this.showMobileField = false;
        //   this.regForm.removeControl('MobileCode');
        //   this.regForm.removeControl('MobileNumber');
        //   this.regForm.addControl('Email', new FormControl('', [Validators.required]));
        //   if (this.quickRegisterType.Type && this.quickRegisterType.Type == '2') {
        //     this.regForm.addControl('UserName', new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]));
        //   } else {
        //     this.regForm.removeControl('UserName');
        //   }
        // }

    }


    // ReCaptcha
    handleExpire() {
        this.captchaElem.reloadCaptcha();
    }

    handleLoad() {
    }

    handleSuccess(event) {

    }


    ngOnDestroy() {
        super.ngOnDestroy();
        sessionStorage.clear();
        this.showSuccessMessage = false;
    }

    protected initDate() {
        for (let k = 0; k < this.utilityService.months.length; k++) {
            this.Months.push({Name: this.utilityService.months[k], Id: k + 1});
        }
        this.Days = this.utilityService.daysSource;
    }

    onTemplateClick(event:MouseEvent)
    {
        let target = event.target['parentElement'] as HTMLElement;
        if(target.nodeName !== "SPAN")
            target = target.parentElement;

        if(target.id.startsWith("download"))
        {
            this.loaderService.show();
            const path = target.id.split("_")[1];
            const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
            this.http.get(window['debugPath'] + `/assets/html/${path + '_' +  this.translate.currentLang}.html`, { headers, responseType: 'text'}).pipe(take(1)).subscribe(data =>
            {
                if(this.deviceDetector.isMobile() || this.deviceDetector.isTablet())
                {
                    let doc = new jsPDF('p', 'pt');
                    doc.fromHTML(data, 10, 10, {
                        'width': 200
                    });
                    doc.save(path + '.pdf');
                    this.loaderService.hide();
                }
                else
                {
                    const opt = {
                        filename: path,
                        margin:10,
                        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
                        image: {
                            type: "jpeg",
                            quality: 1.0,
                        },
                        html2canvas: {
                            scale: 1.5,
                            dpi: 192,
                            letterRendering: true,
                            allowTaint: true,
                        },
                        jsPDF: {
                            unit: "mm",

                            format: [260, 280],
                            orientation: "landscape",
                            compress: true,
                        }
                    }
                    html2pdf().set(opt).from(data).save().then(data => {
                        this.loaderService.hide();
                    });
                }

            });
        }
    }

}
