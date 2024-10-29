import {Directive, inject, Injector, OnDestroy, OnInit, signal} from "@angular/core";
import {ConfigService} from "../../../@core/services";
import {FragmentData} from "../../../@core/models";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription, take} from "rxjs";
import {StateService} from "../../../@core/services/app/state.service";
import {BaseApiService} from "../../../@core/services/api/base-api.service";
import {Methods} from "../../../@core/enums";
import {UserLogined} from "../../../@core/services/app/userLogined.service";
import {MatDialog} from "@angular/material/dialog";
import {checkVisibility} from "@core/utils";


@Directive()
export class BaseHome implements OnInit, OnDestroy
{
    dialog = inject(MatDialog);
    config: ConfigService;
    fragmentKey: string;
    position:string;
    fragments = signal<FragmentData[]>([]);

    private readonly route: ActivatedRoute;
    private readonly router: Router;
    private stateService:StateService;

    private subscription:Subscription = new Subscription();
    private baseApiService:BaseApiService;
    public userLogined: UserLogined;

    constructor(protected injector:Injector)
    {
        this.config = injector.get(ConfigService);
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
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
        const fragmentsObj = this.config.defaultOptions[this.fragmentKey];
        const fragments = Object.entries(fragmentsObj).reduce((obj, [key, val]) => {
            if (Array.isArray(val))
            {
                const items =  val.filter(item => item.Position === this.position);
                items.forEach(item => obj = [...obj, ...item.Items.map(item => {
                    const fragmentData = new FragmentData();

                    if(item.StyleType)
                        fragmentData.Config = JSON.parse(item.StyleType);

                    fragmentData.Id = item.Id;
                    fragmentData.Order = item.Order;
                    fragmentData.Position = key;
                    fragmentData.Title = `WebFragments.${item.Title}`;
                    fragmentData.Href = item.Href;
                    fragmentData.Items = [];
                    if(item.SubMenu && item.SubMenu.length)
                    {
                        item.SubMenu.forEach(sbMenuItem => {
                            const subFragmentData = new FragmentData();
                            subFragmentData.Order = sbMenuItem.Order;
                            subFragmentData.Title = sbMenuItem.Title;
                            subFragmentData.Href = sbMenuItem.Href;
                            subFragmentData.Src = window['debugPath'] + `/assets/images/${this.fragmentKey.toLowerCase()}/${sbMenuItem.Icon}`;
                            if(sbMenuItem.StyleType)
                                subFragmentData.Config = JSON.parse(sbMenuItem.StyleType);
                            fragmentData.Items.push(subFragmentData);
                        });
                    }
                    if(fragmentData.Config && fragmentData.Config.productId)
                    {
                        this.baseApiService.apiPost('', {ProductId:fragmentData.Config.productId}, Methods.GET_PRODUCT_URL, false).pipe(take(1)).subscribe(data => {
                            if(data.ResponseCode === 0)
                            {
                                fragmentData.Href += '?' + data.ResponseObject.split("?")[1];
                            }
                        });
                    }
                    return fragmentData;
                })]);
            }
            return obj;
        }, []);
        this.fragments.set(fragments.filter((f:FragmentData) => checkVisibility(f.Config.visibility, this.userLogined)));
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
