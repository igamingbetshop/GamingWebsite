import {Directive, inject, Injector, OnDestroy, OnInit} from "@angular/core";
import {ConfigService} from "../../../@core/services";
import {Fragment, FragmentData} from "../../../@core/models";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription, take} from "rxjs";
import {BaseControllerService} from "../../../@core/services/app/baseController.service";
import {StateService} from "../../../@core/services/app/state.service";
import {BaseApiService} from "../../../@core/services/api/base-api.service";
import {Methods} from "../../../@core/enums";
import {UserLogined} from "../../../@core/services/app/userLogined.service";
import {MatDialog} from "@angular/material/dialog";


@Directive()
export class BaseHome implements OnInit, OnDestroy
{
    dialog = inject(MatDialog);
    config: ConfigService;
    fragmentKey: string;
    fragments: {[key: string]: Fragment}
    position:string;

    banners:FragmentData[] = [];
    imageBars:FragmentData[] = [];
    iframes: FragmentData[] = [];
    characters: FragmentData[] = [];
    casinoSearch: FragmentData[] = [];
    winnerWidgets: FragmentData[] = [];
    betsWidgets: FragmentData[] = [];

    private readonly route: ActivatedRoute;
    private readonly router: Router;
    private baseControllerService: BaseControllerService;
    private stateService:StateService;

    private subscription:Subscription = new Subscription();
    private baseApiService:BaseApiService;
    public userLogined: UserLogined;

    constructor(protected injector:Injector)
    {
        this.config = injector.get(ConfigService);
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.baseControllerService = injector.get(BaseControllerService);
        this.stateService = injector.get(StateService);
        this.baseApiService  = injector.get(BaseApiService);
        this.userLogined = injector.get(UserLogined);

    }

    ngOnInit()
    {
        this.position = this.route.snapshot.data['position'];
        this.getFragments();
        this.stateService.setProductBackUrl(this.router.url);
    }
    ngOnDestroy()
    {
        window.removeEventListener("message", this.onFrameMessage);
    }

    private async getFragments()
    {
        const menuType = this.fragmentKey === 'WebFragments' ? 'HomeMenu' : 'MobileHomeMenu';
        const settings = await this.config.settings;
        const fragments = settings['MenuList'].find(menu => menu.Type === menuType)['Items'];
        fragments.forEach(menuItem =>
        {
            const fragmentData = new FragmentData();

            if(menuItem.StyleType)
                fragmentData.Config = JSON.parse(menuItem.StyleType);

            fragmentData.Id = menuItem.Id;
            fragmentData.Order = menuItem.Order;
            fragmentData.Position = menuItem.Type;
            fragmentData.Title = menuItem.Title;
            fragmentData.Href = menuItem.Href;
            fragmentData.Items = [];
            if(menuItem.SubMenu.length)
            {
                menuItem.SubMenu.forEach(sbMenuItem => {
                    const subFragmentData = new FragmentData();
                    subFragmentData.Order = sbMenuItem.Order;
                    subFragmentData.Title = sbMenuItem.Title;
                    subFragmentData.Href = sbMenuItem.Href;
                    subFragmentData.Src = window['debugPath'] + `/assets/images/home/home-menu/${sbMenuItem.Icon}`;
                    if(sbMenuItem.StyleType)
                        subFragmentData.Config = JSON.parse(sbMenuItem.StyleType);
                    fragmentData.Items.push(subFragmentData);
                });
            }
            switch (fragmentData.Position)
            {
                case 'imageBar':
                    this.imageBars.push(fragmentData);
                    break;
                case 'banner':
                    this.banners.push(fragmentData);
                    break;
                case 'characters' :
                    this.characters.push(fragmentData);
                    break;
                case 'wins-widget' :
                    this.winnerWidgets.push(fragmentData);
                    break;
                case 'bet-widget' :
                    this.betsWidgets.push(fragmentData);
                    break;
                case 'casino-search' :
                    this.casinoSearch.push(fragmentData);
                    break;
                case 'iframe':
                    this.iframes.push(fragmentData);
                    if(fragmentData.Config && fragmentData.Config.productId)
                    {
                        this.baseApiService.apiPost('', {ProductId:fragmentData.Config.productId}, Methods.GET_PRODUCT_URL, false).pipe(take(1)).subscribe(data => {
                            if(data.ResponseCode === 0)
                            {
                                fragmentData.Href += '?' + data.ResponseObject.split("?")[1];
                            }
                        });
                    }
                    break;
            }
        });
    }

    onLoadFrame(event:Event, fragment:FragmentData)
    {
        /*Check sportsbook*/
        if(fragment.Config.productId === 6)
        {
            window.addEventListener('message', this.onFrameMessage);
        }
    }

    onFrameMessage = (event:MessageEvent) =>
    {
        if (typeof event.data['origin'] !== 'undefined')
        {
            if (event.data['origin'] == 'widget')
            {
                if (typeof event.data.banner !== 'undefined' && event.data.banner.link)
                {
                    this.router.navigateByUrl(event.data.banner.link);
                }
            }
        }
    }
}
