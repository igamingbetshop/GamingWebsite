import {ChangeDetectorRef, Directive, Injector, Input, OnDestroy, OnInit} from "@angular/core";
import {RegionTypes} from "../../../../../@core/enums";
import {UserRegisterService} from "../../../../../@core/services/app/userRegister.service";
import {Region} from "../../../../../@core/interfaces";
import {Subscription} from "rxjs";
import {BaseType} from "../base/base-type";
import {StateService} from "../../../../../@core/services/app/state.service";

@Directive()
export class BaseRegion extends BaseType implements OnInit, OnDestroy
{
    @Input('type') type: string;
    @Input('zIndex') zIndex: number;
    @Input('subItem') subItem: string;

    regionOptions:Region[] = [];

    private isFirstTime:boolean = true;

    private readonly registerService:UserRegisterService;
    private readonly stateService:StateService;
    private readonly changeDetectorRef:ChangeDetectorRef;

    private subscription:Subscription = new Subscription();

    constructor(protected injector:Injector)
    {
        super(injector);
        this.registerService = injector.get(UserRegisterService);
        this.changeDetectorRef = injector.get(ChangeDetectorRef);
        this.stateService = injector.get(StateService);
    }

    ngOnInit()
    {
        this.subscription.add(this.profileService.editState$.subscribe(data => {
            if(data.value === false && data.isReset === true || this.stateService.getPaymentNavigationState === "fromDeposit")
            {
                this.resetInitialState();
            }
        }));
    }

    selectRegionOption(region)
    {
        this.profileService[this.formControlName + 'Pattern'] = region.Name;
        switch (this.type)
        {
            case 'CountryId':
                switch (this.subItem)
                {
                    case 'DistrictId':
                        if(region.Id)
                            this.registerService.getDistrict(region.Id);
                        break;
                    case 'CityId':
                        if(region.Id)
                            this.registerService.getCity(region.Id);
                        break;
                    default:
                        if(region.Id)
                            this.registerService.getDistrict(region.Id);
                }
                this.updateRegionOptions(this.profileService.districts, []);
                this.updateRegionOptions(this.profileService.cities, []);
                this.updateRegionOptions(this.profileService.towns, []);
                this.profileService['DistrictIdPattern'] = '';
                this.profileService['CityIdPattern'] = '';
                this.profileService['TownIdPattern'] = '';
                this.formGroup.get(this.formControlName).setValue(region.Id);
                break;
            case 'DistrictId':
                this.updateRegionOptions(this.profileService.cities, []);
                this.updateRegionOptions(this.profileService.towns, []);
                this.profileService['CityIdPattern'] = '';
                this.profileService['TownIdPattern'] = '';
                if(region.Id)
                    this.registerService.getCity(region.Id);
                this.formGroup.get(this.formControlName).setValue(region.Id);
                break;
            case 'CityId':
                this.updateRegionOptions(this.profileService.towns, []);
                this.profileService['TownIdPattern'] = '';
                if(region.Id)
                    this.registerService.getTown(region.Id);
                this.formGroup.get(this.formControlName).setValue(region.Id);
                break;
            case 'TownId':
                this.formGroup.get(this.formControlName).setValue(region.Id);
                break;
        }
    }

    onFocusPattern()
    {
        this.profileService[this.formControlName + 'Pattern'] = '';
    }
    ngOnDestroy()
    {
        this.subscription.unsubscribe();
    }

    private updateRegionOptions(source, data)
    {
        if(data.length === 0)
            source.splice(0,source.length)
        else
            source.splice(0, data.length, ...data);
    }

    private setInitialData()
    {
        if(this.isFirstTime)
        {
            this.changeDetectorRef.detectChanges();
            const defaultValue = this.profileService.initialData[this.formControlName];
            this.formGroup.get(this.formControlName).setValue(defaultValue);
            if(defaultValue)
            {
                const region = this.regionOptions.find(region => region.Id == defaultValue);
                if(region)
                    this.selectRegionOption(region);
            }
            this.isFirstTime = false;
        }
    }

    private resetInitialState()
    {
        this.isFirstTime = true;
        switch (this.type)
        {
            case 'CountryId':
                this.regionOptions = this.profileService.countries;
                this.subscription.add(this.registerService.notifyGetCountry.subscribe(data => {
                    this.updateRegionOptions(this.regionOptions, data);
                    this.setInitialData();
                }));
                this.registerService.getCountry({TypeId:RegionTypes.Country});
                break;
            case 'DistrictId':
                this.regionOptions = this.profileService.districts;
                this.subscription.add(this.registerService.notifyGetDistrict.subscribe(data => {
                    this.updateRegionOptions(this.regionOptions, data);
                    this.setInitialData();
                }));
                break;
            case 'CityId':
                this.regionOptions = this.profileService.cities;
                this.subscription.add(this.registerService.notifyGetCity.subscribe(data => {
                    this.updateRegionOptions(this.regionOptions, data);
                    this.setInitialData();
                }));
                break;
            case 'TownId':
                this.regionOptions = this.profileService.towns;
                this.subscription.add(this.registerService.notifyGetTown.subscribe(data => {
                    this.updateRegionOptions(this.regionOptions, data);
                    this.setInitialData();
                }));
                break;
        }
    }
}