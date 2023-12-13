import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeviceDetectorService} from 'ngx-device-detector';
import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, VKLoginProvider} from "@core/social-network";
import {getDomain, getParsedUrl, loadExternalScript} from "@core/utils";
import {environment} from "../../../../environments/environment";
import {User} from "@core/models";
import {Subject} from "rxjs";


@Injectable()
export class ConfigService {
    public baseUrl: string;
    private _settings: Object;
    private _device: any;
    private _products: Object;
    private _defaultOptions:any;
    private _promotionList: Object;
    private _timeZone:number;

    private _notifyConfigLoaded:Subject<any> = new Subject();
    public onConfigLoaded$ = this._notifyConfigLoaded.asObservable();

    constructor(private http: HttpClient,
                private deviceService: DeviceDetectorService)
    {
        const arr = window.location.href.split('/');
        this.baseUrl = arr[0] + '//' + arr[2];
    }

    async load()
    {
        this._device = this.deviceService.isMobile() || this.deviceService.isTablet();
        let lang = localStorage.getItem('lang');
        const externalToken = getParsedUrl(location.toString().substr(location.toString().indexOf('?')))['token'];
        await loadExternalScript(window['debugPath'] + "/assets/js/version.js?=" + Math.random());
        let geolocationData;
        try
        {
           geolocationData =  await this.getGeolocationData();
        }
        catch (e) {
            console.error(e);
        }
        lang = lang ? lang : geolocationData ? geolocationData["ResponseObject"]["LanguageId"] : 'en';
        const config = await this.http.get(window['debugPath'] + '/assets/json/config.json' + '?=' + window['VERSION']).toPromise();
        this.setConfigData(config, lang, geolocationData);

        const user:User =  JSON.parse(localStorage.getItem(`${environment.projectPath}-user`));
        if((user && user.Token) || externalToken)
        {
            const input = {
                LanguageId : localStorage.getItem('lang'),
                Token: externalToken ? externalToken :  user.Token
            };
            const updatedTokenData = await this.http.post<any>(`${config['WebApiUrl']}/${config['PartnerId']}/api/Main/GetClientByToken`, input).toPromise();
            localStorage.setItem(`${environment.projectPath}-user`, JSON.stringify(updatedTokenData));
            localStorage.setItem('token', updatedTokenData.Token);
        }

        this._settings = await this.http.get(window['debugPath'] + '/assets/json/menu.json' + '?=' + window['VERSION']).toPromise();
    }

    get settings(): any {
        return this._settings;
    }

    get products(): any {
        return this._products;
    }

    get defaultOptions(): any {
        return this._defaultOptions;
    }

    get promotionList(): any {
        return this._promotionList;
    }

    get timeZone()
    {
        if(this._timeZone)
        {
            return this._timeZone;
        }
        else
        {
            const d = new Date();
            return -1 * d.getTimezoneOffset() / 60;
        }
    }

    set timeZone(value:number)
    {
        this._timeZone = value;
    }

    get device() {
        return this._device;
    }

    get socialProvidersConfig()
    {
        const config = new AuthServiceConfig([
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(this.defaultOptions.SocialNetworkProviders.find(item => item.Title == "Google").ProviderId)
            },
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider(this.defaultOptions.SocialNetworkProviders.find(item => item.Title == "Facebook").ProviderId)
            },
            {
                id: VKLoginProvider.PROVIDER_ID,
                provider: new VKLoginProvider(this.defaultOptions.SocialNetworkProviders.find(item => item.Title == "VK").ProviderId)
            }
        ]);
        return config;
    }

    private getGeolocationData()
    {
        let replaceUrl = `${location.protocol}//websitewebapi.${getDomain()}`;
        replaceUrl = replaceUrl.replace("www.", "");
        return this.http.post(replaceUrl + '/1/api/Main/GeolocationData', {
            BrowserWidth: window.innerWidth,
            BrowserHeight: window.innerHeight,
            ScreenWidth: window.screen.width,
            ScreenHeight: window.screen.height
        }).toPromise();
    }

    private setConfigData(configData, lang,  geolocationData)
    {
        this._defaultOptions = configData;
        this._defaultOptions['WebApiUrl'] = this._defaultOptions['WebApiUrl'].replace("{ws}", environment.hostName);
        this._defaultOptions['Domain'] = this._defaultOptions['Domain'].replace("{ws}", environment.hostName);
        this._defaultOptions["ServerDefaultLang"] = lang;
        /*this._defaultOptions["CheckPortrait"] = 1;*/
        if(geolocationData)
        {
            this._defaultOptions["ServerDefaultCurrencyId"] = geolocationData["ResponseObject"]["CurrencyId"];
            this._defaultOptions["ServerDefaultCountryCode"] = geolocationData["ResponseObject"]["CountryCode"];
        }
        if(this._defaultOptions["ServerDefaultCountryCode"])
            localStorage.setItem("ServerDefaultCountryCode", JSON.stringify(this._defaultOptions["ServerDefaultCountryCode"]));
        if(this._defaultOptions["ServerDefaultCurrencyId"])
            localStorage.setItem("ServerDefaultCurrencyId", JSON.stringify(this._defaultOptions["ServerDefaultCurrencyId"]));
        /*const oldRoute = localStorage.getItem('defaultRoute');
        if (oldRoute === null)
        {
            localStorage.setItem('defaultRoute', this.defaultOptions['HomePageType']);
        }*/
        localStorage.setItem('defaultRoute', this.defaultOptions['HomePageType']);
        const timezone = localStorage.getItem("timezone")
        if(timezone)
            this.timeZone = Number(timezone);
        else if(this._defaultOptions.TimeZone)
            this.timeZone = this._defaultOptions.TimeZone;

        this._notifyConfigLoaded.next(true);
    }

}
