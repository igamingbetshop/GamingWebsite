import {Directive, Injector, OnInit} from "@angular/core";
import {BaseComponent} from "../../base/base.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordValidation} from "../../../../@core/services/password-validation";
import {Controllers, Methods} from "../../../../@core/enums";
import {SimpleModalService} from "ngx-simple-modal";
import {tap} from "rxjs";
import {BaseApiService} from "../../../../@core/services/api/base-api.service";
import {UtilityService} from "../../../../@core/services/app/utility.service";
import {TranslateService} from "@ngx-translate/core";
import {ReCaptchaV3Service} from "ng-recaptcha";
import {ConfigService} from "../../../../@core/services";
import {BaseInfoBlockComponent} from "../../modals/base-info-block/base-info-block.component";


@Directive()
export class BaseAffiliateComponent extends BaseComponent implements OnInit {
    public baseApiService: BaseApiService;
    private utilityService: UtilityService;
    public translate: TranslateService;
    private recaptchaV3Service: ReCaptchaV3Service;
    public configService: ConfigService;
    public simpleModalService: SimpleModalService;

    public affiliateForm: FormGroup;
    public fb: FormBuilder;
    public passwordType: { [key: string]: boolean } = {};
    public communicationType = [
        {Id: 1, Name: 'skype'},
        {Id: 2, Name: 'telegram'},
        {Id: 3, Name: 'whatsapp'}
    ];
    public showCommunication;
    public errorMessage;
    public selectedType = 'Select Option';
    public selectedTypeName;
    public affiliateDetails = false;
    public checkboxDetail = false;

    constructor(public injector: Injector) {
        super(injector);
        this.fb = injector.get(FormBuilder);
        this.baseApiService = injector.get(BaseApiService);
        this.utilityService = injector.get(UtilityService);
        this.translate = this.injector.get(TranslateService);
        this.configService = injector.get(ConfigService);
        this.recaptchaV3Service = injector.get(ReCaptchaV3Service);
        this.simpleModalService = injector.get(SimpleModalService);
        const regex = new RegExp(this.configService.defaultOptions.PassRegEx);
        this.affiliateForm = this.fb.group({
            'FirstName': ['', [
                Validators.required
            ]],
            'LastName': ['', [
                Validators.required
            ]],
            'Email': ['', [
                Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-z]{2,4}$/)
            ]],
            'MobileNumber': ['', [
                Validators.required, Validators.pattern(/^\d{6,}$/)
            ]],
            'UserName': ['', [
                Validators.required
            ]],
            'Password': ['', [
                Validators.required, Validators.pattern(regex)
            ]],
            'ConfirmPassword': ['', [
                Validators.required
            ]],
            'TermsConditionsAccepted': [false, [
                Validators.required
            ]],
            'CommunicationType': ['', [
                Validators.required
            ]],
            'CommunicationTypeValue': ['', [
                Validators.required
            ]],
        });
        this.affiliateForm.get('ConfirmPassword').setValidators(PasswordValidation.matchTo.bind(this.affiliateForm.get('Password')));
        this.affiliateForm.get('Password').valueChanges.subscribe(val => {
            val && this.affiliateForm.get('ConfirmPassword').updateValueAndValidity();
        });
        if (this.configService.defaultOptions['IsReCaptcha']) {
            this.subscriptions.push(this.recaptchaV3Service.execute('register').subscribe(token => {
                this.affiliateForm.addControl('ReCaptcha', new FormControl(token));
                console.log('recovery captcha key is :' + token);
            }));
        }
    }

    ngOnInit() {
        window.scrollTo(0, 0);
    }

    submitAffiliate() {
        const value = this.affiliateForm.getRawValue();
        value.MobileNumber = String(value.MobileNumber);
        delete value.ConfirmPassword;
        this.baseApiService.apiPost('', value, Methods.REGISTER_AFFILIATE, false).subscribe(data => {
            if (data.ResponseCode === 0) {
                this.affiliateForm.reset();
                this.showCommunication = !this.showCommunication;
                this.simpleModalService.addModal(BaseInfoBlockComponent, {
                    title: 'Affiliate_Confirmation',
                    info: 'Affiliate_Info'
                }).subscribe((isConfirmed) => {
                });
            } else {
                this.errorMessage = data.Description;
                this.utilityService.showMessageWithDelay(this, [{'errorMessage': data.Description}]);
            }
        });
    }

    changeCommunication(event) {
        this.affiliateForm.get('CommunicationType').setValue(Number(event.target.value));
        this.showCommunication = this.affiliateForm.get('CommunicationType').value !== 0;
        if (this.showCommunication === false) {
            this.affiliateForm.get('CommunicationType').setValue('');
        }
    }

    selectType(type) {
        this.affiliateForm.get('CommunicationType').setValue(type.Id);
        this.showCommunication = !this.showCommunication;
        this.selectedType = type.Id;
        this.selectedTypeName = type.Name;
        const currentValue = this.selectedTypeName;
        this.translate.get('Affiliate.CommunicationTypeValue').subscribe((res) => {
            this.selectedTypeName = res.replace('type', currentValue);
        });
    }

    cancelType() {
        this.affiliateForm.get('CommunicationType').setValue('');
        this.showCommunication = !this.showCommunication;
        this.selectedType = '';
    }

    toggleCheckbox() {
        this.checkboxDetail = this.affiliateForm.get('TermsConditionsAccepted').value;
        this.checkboxDetail = !this.checkboxDetail;
        this.affiliateForm.get('TermsConditionsAccepted').setValue(this.checkboxDetail);
        this.affiliateForm.get('TermsConditionsAccepted').updateValueAndValidity();
    }
}
