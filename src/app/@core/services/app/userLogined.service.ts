import {createNgModule, EventEmitter, inject, Injectable, Injector} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {DeviceDetectorService} from "ngx-device-detector";
import {User} from "@core/models";
import {AuthService, ConfigService, LocalStorageService} from "@core/services";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";

@Injectable()
export class UserLogined {

    public localStorageService: LocalStorageService;
    public authService: AuthService;
    public configService: ConfigService;
    private route: ActivatedRoute;
    private router: Router;
    private deviceDetectorService: DeviceDetectorService;
    dialog = inject(MatDialog);
    private _firstLoginSbj:Subject<any> = new Subject();
    public onFirstLogin$ = this._firstLoginSbj.asObservable();

    private _characterUpdateSbj:Subject<any> = new Subject();
    public onCharacterUpdate$ = this._characterUpdateSbj.asObservable();

    public returnUrl: string;
    public errorMessage: string;

    private _notifyLoginError: Subject<any> = new Subject<any>();
    public onLoginError$ = this._notifyLoginError.asObservable();

    public defaultOptions: any;

    constructor(public injector: Injector, private http: HttpClient) {
        this.localStorageService = injector.get(LocalStorageService);
        this.authService = injector.get(AuthService);
        this.configService = injector.get(ConfigService);
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.defaultOptions = this.configService.defaultOptions;
        this.returnUrl = this.defaultOptions.RedirectUrl;
        this.deviceDetectorService = injector.get(DeviceDetectorService);
    }

    get isAuthenticated() {
        const userData = this.localStorageService.get('user');
        return !!(userData && userData['Token']);
    }

    public getUserInfo() {
        const userData = this.localStorageService.get('user');
        if (userData && userData['Token']) {
            return userData;
        }
    }

    get user(): User {
        const user: User = this.localStorageService.get('user');
        return user;
    }

    public userLogin(params, isClear: boolean = false, rememberMe = false): any {

        params.PartnerId = this.defaultOptions.PartnerId;
        params.LanguageId = this.defaultOptions.DefaultLanguage;
        params.DeviceType = this.deviceDetectorService.isMobile() ? 2 : 1;
        this.authService.login(params).then(async (responseData) => {
            if (responseData['ResponseCode'] === 0) {
                // this.localStorageService.add('user', responseData);
                if (responseData.IsTwoFactorEnabled) {
                    const {GoogleAuthenticateModule} = await import('../../../@theme/components/modals/google-authenticate/google-authenticate.module');
                    const moduleRef = createNgModule(GoogleAuthenticateModule);
                    const component = moduleRef.instance.getComponent();
                    const callback = new EventEmitter();
                    callback.subscribe(data => {
                        const validateTwoFactor = {
                            Pin: data.code,
                            ClientId: responseData.Id,
                            Token: responseData.Token
                        };
                        const {WebApiUrl, PartnerId} = this.defaultOptions;
                        return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/ValidateTwoFactorPIN`, validateTwoFactor).subscribe((res) => {
                            if (res['ResponseCode'] == 0) {
                                data.callBack({});
                                this.localStorageService.add('user', responseData);
                                this.nextPartLoginLogic(isClear, responseData);
                            } else {
                                data.callBack({ error: res['Description'] });
                            }
                        });
                    });
                    this.dialog.open(component, {data:{ error: this.errorMessage, onVerified: callback, prefixTitle: 'Enable-TwoFactor'}});
                } else {
                    this.localStorageService.add('user', responseData);
                    if (rememberMe) {
                        this.localStorageService.add('identifier', btoa(params.Password));
                        this.localStorageService.add('login', params.ClientIdentifier);
                    } else {
                        this.localStorageService.remove('identifier');
                        this.localStorageService.remove('login');
                    }
                    this.nextPartLoginLogic(isClear, responseData);
                }
                // this.nextPartLoginLogic(isClear, responseData);

            } else {
                this._notifyLoginError.next({
                    message: responseData['Description'],
                    statusCode: responseData['ResponseCode']
                })
            }
        });
    }

    nextPartLoginLogic(isClear: boolean = false, loginData = {})
    {
        const productUrl = localStorage.getItem('product-url');
        const paymentUrl = localStorage.getItem('payment-url');
        if (productUrl != undefined)
        {
            this.router.navigateByUrl(productUrl);
        }
        else
        {
            this.router.navigate([this.returnUrl]);

           // localStorage.setItem('defaultRoute', this.returnUrl);
        }
        localStorage.removeItem('product-url');
        localStorage.removeItem('payment-url');

        if (isClear)
            history.replaceState(null, null, ' ');

        if (!loginData['ResetPassword'] && !loginData['ResetNickName'])
        {
            localStorage.setItem('reload', "1");
            if(productUrl)
                window.location.href = productUrl;
            else if (paymentUrl)
                window.location.href = paymentUrl;
            else{
                const url = new URL(window.location.href);
                url.search = "";
                if(window.location.href === url.href)
                {
                   window.location.reload();
                }
                else
                    window.location.href = url.href;
            }
        } else {
            let infoArray = [];
            if (loginData['ResetPassword'] && loginData['ResetNickName']) {
                infoArray.push(...['resetPassword', 'resetNickName']);
            } else if (loginData['ResetPassword']) {
                infoArray.push('resetPassword');
            } else if (loginData['ResetNickName']) {
                infoArray.push('resetNickName');
            }

           this._firstLoginSbj.next(infoArray);
        }
    }

    notifyUpdateCharacter()
    {
        this._characterUpdateSbj.next(true);
    }

}


