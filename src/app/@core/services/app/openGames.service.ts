import {Injectable, Injector} from '@angular/core';
import {BaseControllerService} from './baseController.service';
import {LocalStorageService} from './localStorage.service';
import {ConfigService} from './config.service';
import {ActivatedRoute, Router} from "@angular/router";
import {UtilityService} from "@core/services/app/utility.service";
import {DeviceDetectorService} from 'ngx-device-detector';
import {UserLogined} from "@core/services/app/userLogined.service";
import {HttpClient} from "@angular/common/http";
import {BaseApiService} from "@core/services/api/base-api.service";
import {Controllers, Methods} from "@core/enums";
import {Subject, take} from "rxjs";

@Injectable()
export class OpenGamesService {

    private baseControllerService: BaseControllerService;
    private userLogined: UserLogined;
    private localStorageService: LocalStorageService;
    private configService: ConfigService;
    public route: ActivatedRoute;
    public router: Router;
    public utilityService: UtilityService;
    public deviceDetectorService: DeviceDetectorService;
    private http: HttpClient;


    public baseApiService: BaseApiService;


    public isLogined: boolean;
    public gameRatio: any;
    public openType: any;
    public defaultOption: any;
    public userData: any;

    public notifyGetIframUrl: Subject<any> = new Subject<any>();
    public notifyGetIframUrlError: Subject<any> = new Subject<any>();
    public notifyGetProductInfo: Subject<any> = new Subject<any>();
    public notifyGetProductInfoError: Subject<any> = new Subject<any>();
    public notifySpecialGamesList: Subject<any> = new Subject<any>();
    public notifySpecialGamesError: Subject<any> = new Subject<any>();
    public notifyGetBannersList: Subject<any> = new Subject<any>();
    public notifyGetBannersError: Subject<any> = new Subject<any>();

    constructor(public injector: Injector) {
        this.baseApiService = injector.get(BaseApiService);
        this.baseControllerService = injector.get(BaseControllerService);
        this.userLogined = injector.get(UserLogined);
        this.localStorageService = injector.get(LocalStorageService);
        this.configService = injector.get(ConfigService);
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.utilityService = injector.get(UtilityService);
        this.http = injector.get(HttpClient);

        this.isLogined = this.userLogined.isAuthenticated;
        this.defaultOption = this.configService.defaultOptions;
        this.userData = this.localStorageService.get('user');
        this.deviceDetectorService = injector.get(DeviceDetectorService);
    }


    public getSlideUrl() {
        return window.location.protocol + '//' + this.defaultOption.Domain + '/banners/';
    }


    public async getGameUrl(gameId, playType) {
        playType = typeof playType === 'undefined' ? (this.isLogined ? 'real' : 'demo') : playType;
        const game = this.baseControllerService.GetProductById(gameId);

        if (game === false) {
            return;
        }

        const ratio = game['ratio'];
        const s = ratio.split(':');

        this.gameRatio = s.length > 1 ? [parseInt(s[0], 10), parseInt(s[1], 10)] : [16, 9];
        this.openType = typeof game['openType'] === 'undefined' ? this.baseControllerService.params.gameOpenTypes.Popup : game['openType'];

        const user = this.localStorageService.get('user');

        if (this.isLogined) {
            const token = user['Token'];
            let dateResponseObject;
            if (playType === 'real' && this.baseControllerService.GetOpenType(game, playType) === 'local') {
            } else if (playType === 'real') {
                dateResponseObject = await this.baseControllerService.drawGame(game, token, playType);
            } else {
                dateResponseObject = await this.baseControllerService.drawGame(game, '', playType);
            }

            return dateResponseObject;
        }
    }

    public getSettings() {
        return this.configService.defaultOptions;

    }

    public getProductUrl(productId, position?) {
        const input = {
            'IsForDemo': !this.router.url.includes('/real'),
            'IsForMobile': (this.deviceDetectorService.isMobile() || this.deviceDetectorService.isTablet()),
            'ProductId': productId,
            'Position': position ? position : '',
            'DeviceType': 1
        };

        this.baseApiService.apiRequest({}, Controllers.MAIN, Methods.GET_PRODUCT_URL, false, input).pipe(take(1)).subscribe((responseData) => {
            if (responseData.ResponseCode == 0) {
                this.notifyGetIframUrl.next(responseData.ResponseObject);
            } else {
                this.notifyGetIframUrlError.next(responseData.Description);
            }
        });
    }

    public getProductInfo(productId) {
        const input = {'ProductId': productId};
        this.baseApiService.apiRequest({}, Controllers.MAIN, Methods.GET_PRODUCT_INFO, false, input).pipe(take(1)).subscribe((responseData) => {
            if (responseData.ResponseCode == 0) {
                this.notifyGetProductInfo.next(responseData.ResponseObject);
            }else {
                this.notifyGetProductInfoError.next(responseData.Description);
            }
        });
    }

    public getPartnerProductInfo(productId: number)
    {
        return this.baseApiService.apiRequest({ ProductId: productId }, '', Methods.GET_PARTNER_PRODUCT_INFO, false);
    }

}
