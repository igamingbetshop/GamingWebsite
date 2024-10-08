import {Directive, Injector, Input, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../../../../@core/services";
import {FragmentData} from "../../../../@core/models";
import {CasinoFilterService} from "../../../../@core/services/app/casino-filter.service";
import {BaseApiService} from "../../../../@core/services/api/base-api.service";
import {Methods} from "../../../../@core/enums";
import {take} from "rxjs/operators";

@Directive()
export class BaseCasinoMenu implements OnInit
{
    @Input('fragmentConfig') fragmentConfig:FragmentData;
    menuItems: any[];
    type:string = 'vertical';
    allGamesCount:number;
    showAllGamesCount: boolean = true;

    configService: ConfigService;
    casinoFilterService:CasinoFilterService;
    apiService:BaseApiService;

    private readonly route:ActivatedRoute;
    private router:Router;

    private prevPath:string;

    protected resourceFolderName:string = 'webfragments';

    constructor(protected injector: Injector)
    {
        this.configService = injector.get(ConfigService);
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.casinoFilterService = injector.get(CasinoFilterService);
        this.apiService = injector.get(BaseApiService);
    }

    ngOnInit(): void
    {
        this.prevPath = this.router.url.split('/')[1];
        this.type = this.fragmentConfig.Config.type;
        this.showAllGamesCount = (this.fragmentConfig && this.fragmentConfig.Config && this.fragmentConfig.Config.showAllGamesCount) ?? true;
        let menus = this.fragmentConfig.SubMenu ?  this.fragmentConfig.SubMenu.map(menu => {
            if(menu.Icon.includes('.'))
                menu.IconSrc = `${window['debugPath']}/assets/images/${this.resourceFolderName}/${menu.Icon}`;
            const type = parseInt(menu.Type);
            menu.Id = isNaN(type) ? -1 : type;
            menu.style = menu.StyleType ? JSON.parse(menu.StyleType) : this.fragmentConfig.Config.itemStyle;
            menu.Href =  menu.Id === -1 ?  menu.Id : menu.Type;
            return menu;
        }) : [];

        this.casinoFilterService.menuCategoryIds = [];
        for(let i = 0; i < menus.length; i++)
        {
            if(menus[i].Id > -1)
                this.casinoFilterService.menuCategoryIds.push(menus[i].Id);
        }

        if(this.fragmentConfig.Config.hasOwnProperty('menus') && Array.isArray(this.fragmentConfig.Config.menus))
        {
            menus = menus.filter(m => this.fragmentConfig.Config.menus.includes(m.Type));
        }

        this.menuItems = menus;
        this.getAllGames();
    }

    public selectCategory(category, multiselect = false)
    {
        this.casinoFilterService.addCategory(category, multiselect);
        const query = category.Href || 'all-games';
        if(this.prevPath !== "group")
        {
            this.router.navigate([`/${this.prevPath}/` + query]);
        }
    }

    private getAllGames()
    {
        this.apiService.apiRequest({PageSize:10, CategoryIds:this.casinoFilterService.menuCategoryIds}, undefined, Methods.GET_GAMES, false).pipe(take(1))
            .subscribe(data => {
                if (data.ResponseCode === 0)
                {
                    this.allGamesCount = data.ResponseObject.TotalGamesCount;
                }
            });
    }
}
