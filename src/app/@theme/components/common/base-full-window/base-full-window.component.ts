import {Directive, HostListener, Injectable, Injector, Input, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BaseComponent} from "../../base/base.component";
import {LocalStorageService} from "@core/services/app/localStorage.service";
import {ConfigService} from '@core/services/app/config.service';
import {UserLogined} from '@core/services/app/userLogined.service';
import {Router} from "@angular/router";
import {DeviceDetectorService} from "ngx-device-detector";
import {SaveData, SharedService} from "@core/services";
import {Location} from "@angular/common";
import {getParsedUrl} from "@core/utils";
import {GamesUrlService} from "@core/services/app/gamesUrl.service";
import {take} from "rxjs/operators";

@Directive()
export class BaseFullWindowComponent extends BaseComponent {

    @Input('routeData') routeData:any;
    public route: ActivatedRoute;
    public gamesUrlService: GamesUrlService;
    public localStorageService: LocalStorageService;
    public configService: ConfigService;
    public saveData1: SaveData;
    public userLogined: UserLogined;
    public deviceDetectorService: DeviceDetectorService;
    public router: Router;
    public showiFrame: boolean;
    public userData: any;
    public path: any;
    public partnerId: number;
    public scrollBar: string = "no";
    openProductErrorMessage = signal<string>("");
    protected productId: string;
    protected isGamePage: boolean;
    protected location: Location;
    private sharedService: SharedService;
    private isHashChangeFromExternal = false;

    constructor(public injector: Injector) {
        super(injector);

        this.route = injector.get(ActivatedRoute);
        this.gamesUrlService = injector.get(GamesUrlService);
        this.localStorageService = injector.get(LocalStorageService);
        this.configService = injector.get(ConfigService);
        this.userLogined = injector.get(UserLogined);
        this.router = injector.get(Router);
        this.deviceDetectorService = injector.get(DeviceDetectorService);
        this.saveData1 = injector.get(SaveData);
        this.location = injector.get(Location);

        this.sharedService = injector.get(SharedService);
        this.userData = this.localStorageService.get('user');
        this.partnerId = this.configService.defaultOptions['PartnerId'];
    }

    @HostListener('window:popstate', ['$event'])
    onPopState(event) {
        if (this.isHashChangeFromExternal) {
            this.isHashChangeFromExternal = false;
            if (this.deviceDetectorService.isDesktop()) {
                if ((location.href.match(/asianweb/g) || []).length == 1)
                    this.router.navigateByUrl('/home');
            }
        } else {
            const hash = window.location.hash;
            const url = hash.indexOf("#") > -1 ? hash.split("#")[1] : hash;
            const iframe = document.getElementById('main-game-iframe') as HTMLIFrameElement;
            iframe.contentWindow.postMessage({"from": "website", "updateRoute": url}, "*");
        }
    }

    ngOnInit()
    {
        super.ngOnInit();
        this.subscriptions.push(this.sharedService.onRouteChangeForSport$.subscribe(url => {
            const iframe = document.getElementById('main-game-iframe') as HTMLIFrameElement;
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage({"from": "website", "openRoute": url}, "*");
            }
        }));

        let flag = 0;
        this.route.params.subscribe(val => {
            if (!!val.sportType) {
                if (val.sportType === 'prematch' || val.sportType === 'live') {
                    flag++;
                }
            }
            const iframe = document.getElementById('main-game-iframe') as HTMLIFrameElement;
            if (flag > 1 && val.sportType !== 'chart') {
                if (iframe && iframe.contentWindow) {
                    iframe.contentWindow.postMessage({"from": "website", "openRoute": val.sportType}, "*");
                }
            } else {
                this.initFunction();
            }
        });
    }

    public initFunction() {

        const routeParams = this.route.snapshot.params;
        const queryParams = this.route.snapshot.queryParams;
        this.route.data.subscribe((data) => {

            this.isGamePage = data.position === 'casino' || data.position === 'livecasino' || data.position === 'category';

            let productPosition;
            if(this.routeData)
            {
                this.productId = this.routeData.productId;
                productPosition = this.isGamePage ? null : this.routeData.position;
            }
            else
            {
                this.productId = data.productId ? data.productId : JSON.parse(routeParams.productId);
                productPosition = queryParams.position ? queryParams.position :  (data.position && !this.isGamePage ? data.position : routeParams.sportType);
            }
            let type = routeParams.type ? routeParams.type.split('?')[0] : null;
            if(data.productId == 6)
                type = this.userLogined.isAuthenticated ? 'real' : 'demo';

            this.gamesUrlService.getGameHref(this.productId, productPosition, type);
            this.scrollBar = queryParams.scroll ? queryParams.scroll  : 'auto';
        });

        this.openGame();
        window.removeEventListener('message', this.pageChangePath);
        window.addEventListener('message', this.pageChangePath);

    }


    openGame()
    {
        const iframe = document.getElementById('main-game-iframe') as HTMLIFrameElement;

        this.gamesUrlService.notifyGetGameUrl.pipe(take(1)).subscribe((resData) => {
            if (resData['ResponseCode'] === 0 && resData['ResponseObject'])
            {
                this.showiFrame = true;
                this.onProductUrlError("");
                let defaultUrl:string = resData['ResponseObject'];
                let frameUrl;
                let hash = window.location.hash;
                if(hash && defaultUrl.includes('sportsbookwebsite'))
                {
                    hash =  hash.substr(1);
                    let url = new URL(defaultUrl);
                    let params:any = new URLSearchParams(url.search.slice(1));
                    let hashParams = getParsedUrl(hash);
                    Object.entries(hashParams).forEach(([key, value])=> {
                        if(value)
                            params.append(key, value.toString());
                    });
                    let cut_str = defaultUrl.substring(0, (defaultUrl.lastIndexOf("/")));
                    let newUrl = new URL(cut_str + hash);
                    newUrl.search = params;
                    frameUrl= newUrl.href;
                }
                else frameUrl = defaultUrl;
                /*iframe.onload = () => {
                    iframe.style.visibility = 'visible';
                }*/
                iframe['src'] = frameUrl.replace('localhost:4200', window['HostNameUrl']);
                //iframe['src'] = frameUrl.replace('https://sportsbookwebsite.localhost:4200/website', 'http://localhost:4201');
            }
            else
            {
                iframe.style.visibility = 'visible';
                this.onProductUrlError(resData.Description);
            }
        });

    }
    protected onProductUrlError(data)
    {
        this.showiFrame = false;
        this.openProductErrorMessage.set(data);
    }


    pageChangePath = (event) =>
    {
        this.isHashChangeFromExternal = true;
        if (event.data['popup'] === 'not-login')
        {
            if (typeof event.data['origin'] !== 'undefined')
            {
                if (event.data['origin'] == 'sportsbook')
                {
                    if (event.data['url'] !== 'undefined')
                    {
                        localStorage.setItem('product-url', event.data['url'] ? event.data['url'] : location.pathname + '/' + location.hash);
                    }
                }
            }
            this.saveData1.openPopup.next('1');
        }
        else if (event.data['popup'] === 'register')
        {
            this.saveData1.openPopup.next('2');
        }

        if (typeof event.data['origin'] !== 'undefined')
        {
            if (event.data['origin'] == 'sportsbook' || event.data['origin'] == 'lottery' ||  event.data['origin'] == 'backgammon')
            {
                if (typeof event.data.path !== 'undefined')
                {
                    window.location.hash = event.data.path;
                }
            }
            else if (event.data['origin'] === 'parent' && event.data['page'] === 'parent')
            {
                if(String(event.data['path']).startsWith('http'))
                    window.open(event.data['path'], '_blank');
                else
                {
                    let state: any,
                        params = [];
                    if (event.data['path'].indexOf('?') > -1) {
                        state = event.data['path'].split('?')[0];
                        params = event.data['path'].split('?')[1].split('=');
                    } else {
                        state = event.data['path'];
                    }

                    if (params.length) {
                        let paramName = params[0],
                            paramValue = params[1],
                            paramsObj = {};
                        paramsObj[paramName] = paramValue;
                    } else {
                        this.router.navigate(['/' + state]);
                    }
                }
            }
            else if (event.data['page'] === 'direct')
            {
                this.router.navigateByUrl(event.data['path']);
            }

        }
    }


    ngOnDestroy() {
        super.ngOnDestroy();
        window.removeEventListener("message", this.pageChangePath);
    }

}
