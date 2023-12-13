import {Directive, Injector, Input, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import { Subscription } from "rxjs";
import {BaseApiService} from "../../../../@core/services/api/base-api.service";
import {ConfigService} from "../../../../@core/services";
import {UserLogined} from "../../../../@core/services/app/userLogined.service";
import {FragmentData} from "../../../../@core/models";
import {CasinoFilterService} from "../../../../@core/services/app/casino-filter.service";

@Directive()
export class BaseCasinoSearch implements OnInit, OnDestroy
{
    @Input('fragmentConfig') fragmentConfig:FragmentData;

    categoryId;
    categoryName;
    games: any[] = [];

    casinoFilterService:CasinoFilterService;
    protected router:Router;
    protected userLogged:UserLogined;
    private subscription:Subscription;
    private apiService: BaseApiService;
    private route:ActivatedRoute;
    private configService:ConfigService;

    constructor(protected injector:Injector)
    {
        this.apiService = injector.get(BaseApiService);
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.configService = injector.get(ConfigService);
        this.userLogged = injector.get(UserLogined);
        this.casinoFilterService = injector.get(CasinoFilterService);
    }

    ngOnInit()
    {
        this.subscription = new Subscription();
    }

    ngOnDestroy()
    {
        this.subscription.unsubscribe();
    }
}
