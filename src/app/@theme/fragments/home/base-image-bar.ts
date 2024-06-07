import {Directive, Injector, Input, OnDestroy, OnInit} from "@angular/core";
import {FragmentData} from "../../../@core/models";
import {Router} from "@angular/router";
import {getParsedUrl} from "../../../@core/utils";
import {ConfigService, SharedService} from "../../../@core/services";


@Directive()
export class BaseImageBar implements OnInit, OnDestroy
{
    @Input('fragmentConfig') fragmentConfig:FragmentData;

    private router:Router;
    private sharedService:SharedService;
    private configService:ConfigService;

    constructor(protected injector:Injector)
    {
        this.router = injector.get(Router);
        this.sharedService = injector.get(SharedService);
        this.configService = injector.get(ConfigService);
    }

    ngOnInit()
    {

    }
    ngOnDestroy()
    {

    }

    navigateByBanner(url:string)
    {
        if(url.includes('http'))
        {
            window.open(url, '_blank');
        }
        else
        {
            const params = getParsedUrl(url);
            if(params.redirect)
            {
                localStorage.setItem('opened-url', this.router.url);
            }
            window.scrollTo(0, 0);
            url = url.startsWith("/") ? url : `/${url}`;
            this.router.navigateByUrl(url);
            if(url == 'prematch' || url == 'live' || url == 'sport/prematch' || url == 'sport/live')
            {
                if(this.configService.defaultOptions.SportOpenMode === 'migrated')
                {
                    this.sharedService.notifyMigratedSportRouteChange(url);
                }
            }
        }
    }
}
