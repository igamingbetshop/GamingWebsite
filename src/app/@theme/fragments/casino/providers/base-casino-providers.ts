import {Directive, Injector, Input, OnInit} from "@angular/core";
import { take } from "rxjs/operators";
import {BaseApiService} from "../../../../@core/services/api/base-api.service";
import {Methods} from "../../../../@core/enums";
import {FragmentData} from "../../../../@core/models";
import {CasinoFilterService} from "../../../../@core/services/app/casino-filter.service";
import {getMappedGame} from "../../../../@core/utils";
import {ConfigService} from "../../../../@core/services";
import {
    CasinoProvidersService
} from "../../../../projects/CraftBet/src/components/desktop/app-casino/providers/casino-providers.service";

@Directive()
export class BaseCasinoProviders implements OnInit {

    @Input('fragmentConfig') fragmentConfig:FragmentData;
    providers: any[] = [];
    type:string = 'vertical';
    providerFilter: any = {name: ''};
    selectedProvider: any = {};

    apiService: BaseApiService;
    configService: ConfigService;
    casinoFilterService:CasinoFilterService;
    casinoProvidersService:CasinoProvidersService;

    constructor( protected injector: Injector )
    {
        this.apiService = injector.get(BaseApiService);
        this.casinoFilterService = injector.get(CasinoFilterService);
        this.configService = injector.get(ConfigService);
        this.casinoProvidersService = injector.get(CasinoProvidersService);
    }

    ngOnInit()
    {
        this.type = this.fragmentConfig.Config.type;
        this.getProviders();
    }

    getProviders()
    {
        let req = null;

        if(this.fragmentConfig.Config.hasOwnProperty('categories'))
            req = {CategoryIds:this.fragmentConfig.Config.categories};

        this.casinoProvidersService.getProviders(req).subscribe(providers => {
            if(this.fragmentConfig.Config.count)
            {
                this.providers = providers.slice(1, this.fragmentConfig.Config.count);
            }
            else
            {
                this.providers = providers;
            }
            this.providers.forEach(provider => {
                provider.style = this.fragmentConfig.Config.itemStyle;
                provider.imageSrc = `../../../../../../../assets/images/providers/${provider?.Id}.png`;
            });
        });


    }

    public selectProvider(provider)
    {
        this.casinoFilterService.addProvider(provider, !!this.fragmentConfig.Config.multiSelect);
    }
}