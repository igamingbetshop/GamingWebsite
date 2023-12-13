import {Directive, HostBinding, Injector, Input, OnDestroy, OnInit} from "@angular/core";
import { take } from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import { Subscription } from "rxjs";
import {BaseApiService} from "../../../../@core/services/api/base-api.service";
import {ConfigService} from "../../../../@core/services";
import {MenuType, Methods} from "../../../../@core/enums";
import {getMappedGame} from "../../../../@core/utils";
import {UserLogined} from "../../../../@core/services/app/userLogined.service";
import {FragmentData} from "../../../../@core/models";
import {CasinoFilterService} from "../../../../@core/services/app/casino-filter.service";

@Directive()
export class BaseCasinoCategory implements OnInit, OnDestroy
{
    @Input('fragmentConfig') fragmentConfig:FragmentData;
    @HostBinding("style.order") order;

    categoryId;
    categoryName;
    games: any[] = [];
    leftGamesCount: number =0;

    protected router:Router;
    protected userLogged:UserLogined;
    protected configService:ConfigService;
    private subscription:Subscription;
    private apiService: BaseApiService;
    protected route:ActivatedRoute;
    casinoFilterService:CasinoFilterService;

    constructor(protected injector:Injector)
    {
        this.apiService = injector.get(BaseApiService);
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.configService = injector.get(ConfigService);
        this.userLogged = injector.get(UserLogined);
        this.casinoFilterService = injector.get(CasinoFilterService);
    }

    getGames(filter, concatData = false): void
    {
        if(filter.CategoryId === -1)
            filter.CategoryId = null;

        this.apiService.apiRequest(filter, undefined, Methods.GET_GAMES, false).pipe(take(1))
            .subscribe(data => {
                if (data.ResponseCode === 0)
                 {
                     const games = data.ResponseObject.Games.map(game => {
                         game.style = this.fragmentConfig.Config.itemStyle;
                         game = getMappedGame(game);
                         return game;
                     });
                     this.games = concatData ? [...this.games, ...games] : games;
                     this.leftGamesCount = data.ResponseObject.LeftGamesCount;
                }
            });
    }

    ngOnInit()
    {
        this.order = this.fragmentConfig.Config.style.order;
        this.subscription = new Subscription();
        this.categoryId = this.fragmentConfig.Config.id;
        if(this.fragmentConfig.Config.type === 'filter' || this.fragmentConfig.Config.type === 'search')
        {
            this.subscription.add(this.casinoFilterService.onFilterChange$.subscribe(filter => {
                let req:any;

                if(filter)
                {
                     req = {
                        Name:filter.gamePattern,
                        ProviderIds:filter.providers.map(p => p.Id),
                        CategoryId:this.categoryId || filter.categoryId,
                        PageIndex:filter.pageIndex,
                        PageSize:filter.pageSize,
                    }
                }


                if(this.fragmentConfig.Config.type === 'search')
                {
                    const isAll = filter.categoryId === null;
                    if(isAll && filter.providers.length === 0 && !filter.gamePattern)
                    {
                        this.games = [];
                        return;
                    }
                    if(isAll && this.fragmentConfig.Config.hasOwnProperty('categories'))
                    {
                        req.CategoryIds = this.fragmentConfig.Config.categories;
                    }
                }

                if(filter.categoryId || filter.categoryId === 0)
                {
                    this.getCategoryName(filter.categoryId);
                }
                else this.getCategoryName(-1);
                this.getGames(req, filter.concatData);
            }));
        }
        else
        {
            this.getGames({CategoryId:this.categoryId, PageSize:this.fragmentConfig.Config.count || 100});
        }
    }

    getCategoryName(categoryId)
    {
        if(categoryId === -1)
            this.categoryName = null;
        else
        {
            const category = this.configService.settings.MenuList.find(elem => elem.Type == MenuType.CASINO_MENU).Items.find(el => el.Type == categoryId);
            if(category)
                this.categoryName =  category.Title;
        }
    }

    ngOnDestroy()
    {
        this.subscription.unsubscribe();
    }

    openGame(typeId, type, openMode = 1)
    {
        localStorage.setItem('opened-url', this.router.url);
    }
}
