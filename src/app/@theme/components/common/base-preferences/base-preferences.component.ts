import {Directive, Injector} from '@angular/core';
import {BaseComponent} from '../../base/base.component';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ConfigService, LocalStorageService} from "../../../../@core/services";
import {GetSettingsInfoService} from "../../../../@core/services/app/getSettingsInfo.service";

@Directive()
export class BasePreferencesComponent extends BaseComponent {

    public preferencesForm: FormGroup;
    public preferencesFormValueChanged;
    public fb: FormBuilder;
    public languages:any = [];
    public oddsFormat:string[] = ['Decimal', 'Fractional', 'Us', 'HK', 'Malay', 'Indo'];
    private config:ConfigService;
    private settingsService: GetSettingsInfoService;
    private localStorageService: LocalStorageService;
    private userData: any;
    constructor(protected injector: Injector)
    {
        super(injector);
        this.fb = injector.get(FormBuilder);
        this.config = injector.get(ConfigService);
        this.settingsService = injector.get(GetSettingsInfoService);
        this.localStorageService = injector.get(LocalStorageService);
    }

    ngOnInit()
    {
        super.ngOnInit();
        this.userData = this.localStorageService.get('user');
        this.languages = this.config.defaultOptions['Languages'];
        const oddTypeIndex = JSON.parse(sessionStorage.getItem('oddType')) || -1
        this.preferencesForm = this.fb.group({
            'OddsFormat': [oddTypeIndex],
            'LanguageId': [this.userData.LanguageId],
            'SendPromotions': [this.userData.SendPromotions],
            'SendMail': [this.userData.SendMail],
            'SendSms': [this.userData.SendSms]
        });
        // this.subscriptions.push(this.settingsService.onSaveClientDetails$.subscribe(data => {
            if(this.preferencesForm.get('OddsFormat').value)
                sessionStorage.setItem('oddType', JSON.stringify(Number(this.preferencesForm.get('OddsFormat').value)));
            // this.onMessage(data.Message);
            this.preferencesFormValueChanged = false;
        // }));
        this.subscriptions.push(this.preferencesForm.valueChanges.subscribe(data => this.preferencesFormValueChanged = true));
    }

    protected onMessage(message:string)
    {

    }

    switchMode(controlName:string)
    {
        this.preferencesForm.get(controlName).setValue(!this.preferencesForm.get(controlName).value);
    }

    submit()
    {
        let data = this.preferencesForm.getRawValue();
        this.settingsService.saveChangeData(data);
    }

    ngOnDestroy()
    {
        super.ngOnDestroy();
    }
}
