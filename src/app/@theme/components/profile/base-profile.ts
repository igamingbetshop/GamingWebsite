import {
    ChangeDetectorRef, createNgModule,
    Directive, EventEmitter, inject,
    Injector,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import {BaseControllerService} from "../../../@core/services/app/baseController.service";
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {MenuType} from "../../../@core/enums";
import {GetSettingsInfoService} from "../../../@core/services/app/getSettingsInfo.service";
import {ProfileService} from "./service/profile.service";
import {UtilityService} from "../../../@core/services/app/utility.service";
import {BaseApiService} from "../../../@core/services/api/base-api.service";
import {Subscription} from "rxjs";
import {ConfigService} from "../../../@core/services";
import {StateService} from "@core/services/app/state.service";
import {MatDialog} from "@angular/material/dialog";

@Directive()
export class BaseProfile implements OnInit, OnDestroy
{
    @ViewChild('birthDateRef', { read: ViewContainerRef }) birthDateRef;
    @ViewChild('emailRef', { read: ViewContainerRef }) emailRef;
    @ViewChild('mobileNumberRef', { read: ViewContainerRef }) mobileNumberRef;
    @ViewChild('countryRef', { read: ViewContainerRef }) countryRef;
    @ViewChild('districtRef', { read: ViewContainerRef }) districtRef;
    @ViewChild('cityRef', { read: ViewContainerRef }) cityRef;
    @ViewChild('townRef', { read: ViewContainerRef }) townRef;
    @ViewChild('languageRef', { read: ViewContainerRef }) languageRef;

    formItems:any[] = [];
    formGroup: FormGroup;
    formReady:boolean;


    protected securityQuestionIds:number[] = [];
    private specialControlTypes:string[] = [
        'birth-date',
        'email',
        'mobile-number',
        'region',
        'send-code',
        'language'];
    public baseControllerService:BaseControllerService;
    private changeDetector:ChangeDetectorRef;
    public getSettingsInfoService:GetSettingsInfoService;
    public utilityService:UtilityService;
    public baseApiService:BaseApiService;
    dialog = inject(MatDialog);
    protected stateService:StateService;
    profileService:ProfileService;
    configService:ConfigService;


    public updateDataMessage: any;

    private subscription:Subscription;
    private isFirstTimeUpdateClient:boolean = true;

    constructor(protected injector:Injector)
    {
        this.baseControllerService = injector.get(BaseControllerService);
        this.changeDetector = injector.get(ChangeDetectorRef);
        this.getSettingsInfoService = injector.get(GetSettingsInfoService);
        this.profileService = injector.get(ProfileService);
        this.utilityService = injector.get(UtilityService);
        this.baseApiService = injector.get(BaseApiService);
        this.configService = injector.get(ConfigService);
        this.stateService = injector.get(StateService)
    }
    ngOnInit()
    {
        this.subscription = new Subscription();
        this.subscription.add(this.profileService.profileData$.subscribe(data => {
            if(data)
            {
                if(this.isFirstTimeUpdateClient)
                {
                    this.isFirstTimeUpdateClient = false;
                    this.baseControllerService.GetMenu(MenuType.ACCOUNT_TAB_LIST).then((data: any) =>
                    {
                        const profileDetails = data.find((item) => item.Title == 'ProfileDetails');
                        if(profileDetails && profileDetails.SubMenu)
                        {
                            this.formItems =  profileDetails.SubMenu.map(elem => {
                                if(elem.StyleType)
                                {
                                    elem.Config = JSON.parse(elem.StyleType);
                                    if ( elem.Config.hasOwnProperty('regExp'))
                                    {
                                        elem['RegExp'] = elem.Config['regExp'];
                                    }
                                }
                                return elem;
                            });
                            this.formGroup = this.toFromGroup();
                            this.profileService.initialData = Object.assign(this.formGroup.getRawValue());
                            this.formReady = true;
                            this.changeDetector.detectChanges();

                            this.formItems.forEach(item =>
                            {
                                if(this.specialControlTypes.includes(item.Type))
                                {
                                    this.loadSpecialComponents(item);
                                }
                            });
                            if(this.stateService.getPaymentNavigationState === "fromDeposit")
                            {
                                this.profileService.changeEditState({value:true, isReset:true});
                                this.formGroup.markAllAsTouched();
                            }
                        }
                    });
                }
                if (data?.USSDPin) {
                    data.USSDPin = '****';
                }
                this.checkReadonlyState();
            }
        }));

        this.profileService.getClientInfo();

        /*TO DO*/
        this.subscription.add(this.getSettingsInfoService.onSaveClientDetails$.subscribe((data) => {
            this.updateDataMessage = data;
            if(data.Client)
                this.profileService.updateProfile(data.Client);
            this.utilityService.showError('', this, "updateDataMessage");
            if(this.stateService.getPaymentNavigationState === "fromDeposit" && data.Error === false)
            {
                this.stateService.setPaymentNavigationState("fromProfile");
                history.back();
            }
        }));
    }
    ngOnDestroy()
    {
        this.stateService.setPaymentNavigationState(null);
        this.subscription.unsubscribe();
    }

    private toFromGroup():FormGroup
    {
        const group = {};
        this.formItems.forEach(formItem => {
            const defaultValue = this.profileService.getProfile[formItem.Title] || null;
            if (formItem.Type === 'checkbox')
            {
                group[formItem.Title] = this.profileService.getProfile[formItem.Title] ? new FormControl(defaultValue) : new FormControl(false);
            }
            else
            {
                group[formItem.Title] = formItem.Config?.mandatory ? new FormControl(defaultValue, Validators.required) : new FormControl(defaultValue || '');
            }
            if(formItem.RegExp)
            {
                group[formItem.Title].addValidators([Validators.pattern(new RegExp(formItem.RegExp))]);
            }

            if(formItem.Config?.readonlyOrEmpty && defaultValue && defaultValue != '1920-01-01T00:00:00')
            {
                formItem.Config.disabled = true;
            }
        });
        return new FormGroup(group);
    }

    toggleEdit()
    {
        this.profileService.changeEditState({value:!this.profileService.getEditState.value,isReset:false});
        if (this.profileService.getEditState.value === true && this.formGroup.value.USSDPin) {
            this.formGroup.get('USSDPin').setValue('');
        }
    }

    async loadSpecialComponents(item:any)
    {

    }
    async updateProfile()
    {
        this.formGroup.markAllAsTouched();

        if(!this.formGroup.valid)
            return;

        const profile = this.formGroup.getRawValue();

        if(profile.hasOwnProperty('BirthDay'))
        {
            const birthDate = this.formGroup.get('BirthYear').value + '-' + this.formGroup.get('BirthMonth').value + '-' +  this.formGroup.get('BirthDay').value;
            profile.BirthDate = birthDate;
        }

        if(this.profileService.getProfile && this.profileService.getProfile.SecurityQuestions && this.profileService.getProfile.SecurityQuestions.length)
        {
            const { SecurityQuestionsModalModule } = await import("../../components/modals/security-questions-modal/security-questions-modal.module");
            const moduleRef = createNgModule(SecurityQuestionsModalModule, this.injector);
            const component = moduleRef.instance.getComponent();
            const callback = new EventEmitter();
            callback.subscribe(data => {
                profile.SecurityQuestions = data.securityQuestions;
                this.getSettingsInfoService.saveChangeData(profile).subscribe(resp => {
                    if(resp.ResponseCode === 0)
                    {
                        data.callBack({});
                        this.profileService.getClientInfo();
                        this.profileService.changeEditState({value:false, isReset:false});
                    }
                    else data.callBack({error:resp.Description});
                });
            });
            this.dialog.open(component, {data:{securityQuestionIds:this.profileService.getProfile.SecurityQuestions, onSecurityConfirmed:callback}})
        }
        else
        {
            this.getSettingsInfoService.saveChangeData(profile).subscribe(data => {
                if(data.ResponseCode === 0)
                {
                    this.profileService.getClientInfo();
                    this.profileService.changeEditState({value:false, isReset:false});
                }
            });
        }


    }

    resetProfileForm()
    {
        this.formGroup.reset(this.profileService.getProfile);
        this.profileService.changeEditState({value:false, isReset:true});
    }

    private checkReadonlyState()
    {
        this.formItems.forEach(formItem => {
            const currentValue = this.profileService.getProfile[formItem.Title] || null;
            if(formItem.Config.readonlyOrEmpty && currentValue && currentValue != '1920-01-01T00:00:00')
            {
                formItem.Config.disabled = true;
            }
        });
    }

}
