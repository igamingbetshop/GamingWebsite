import {Injectable, Injector} from '@angular/core';
import {AuthService, ConfigService, LocalStorageService} from "@core/services";
import {UserLogined} from "@core/services/app/userLogined.service";
import {Subject} from "rxjs";

declare var PasswordCredential: any;
@Injectable()
export class UserRegisterService {

    public notifyGetUserRegisterError: Subject<any> = new Subject<any>();
    public notifyGetUserRegisterData: Subject<any> = new Subject<any>();
    public notifyGetRegion: Subject<any> = new Subject<any>();
    public notifyGetLands: Subject<any> = new Subject<any>();
    public notifyGetDistrict: Subject<any> = new Subject<any>();
    public notifyGetCountry: Subject<any> = new Subject<any>();
    public notifyGetCity: Subject<any> = new Subject<any>();
    public notifyGetTown: Subject<any> = new Subject<any>();
    public defaultOptions: any;
    public paramsLogin: {[key: string]: any};

    public localStorageService: LocalStorageService;
    public authService: AuthService;
    public configService: ConfigService;
    public userLogined: UserLogined;
    public errorMessage:string;
    public checkboxStates:any = {};



    constructor(public injector: Injector) {

        this.localStorageService = injector.get(LocalStorageService);
        this.authService = injector.get(AuthService);
        this.configService = injector.get(ConfigService);
        this.userLogined = injector.get(UserLogined);

        this.defaultOptions = this.configService.defaultOptions;
    }


    public getUserRegister(params, login, firstLoginUrl: boolean): any
    {
        this.authService.registration(params).subscribe((responceData) => {
            if (responceData['ResponseCode'] !== 0) {
                this.notifyGetUserRegisterError.next((responceData['Description']));
            } else {
                this.notifyGetUserRegisterData.next(responceData['ResponseCode']);
                if (responceData.WelcomeBonusActivationKey)
                    this.localStorageService.add("welcome-bonus-key", responceData.WelcomeBonusActivationKey);
                this.localStorageService.remove('AffiliateData');
                this.paramsLogin = {'ClientIdentifier': responceData.UserName, 'Password': params.Password};
                if (this.defaultOptions.FirstLoginUrl && this.defaultOptions.FirstLoginUrl !== '') {
                    firstLoginUrl = true;
                }
                console.log(firstLoginUrl);
                login && this.userLogined.userLogin(this.paramsLogin, firstLoginUrl);
            }
        });
    }


    public getQuickSmsRegistration(params, login): any {
        this.authService.quickSmsRegistration(params).subscribe((responceData) => {
            if (responceData['ResponseCode'] !== 0) {
                this.notifyGetUserRegisterError.next((responceData['Description']));
            } else {
                this.notifyGetUserRegisterData.next(responceData['ResponseCode']);
                this.localStorageService.remove('AffiliateData');
                /*if ("PasswordCredential" in window)
                {
                    let credential = new PasswordCredential({
                        id: responceData.MobileNumber,
                        password: params.Password
                    });

                    navigator.credentials.store(credential).then(() => {
                        console.info("Credential stored in the user agent's credential manager.");
                    }, (err) => {
                        console.error("Error while storing the credential: ", err);
                    });
                }*/
                const loginData = {'ClientIdentifier': responceData.MobileNumber, 'Password': responceData.Password};
                login && this.userLogined.userLogin(loginData);
            }
        });
    }


    public getQuickEmailRegistration(params, login): any {
        this.authService.quickEmailRegistration(params).subscribe((responceData) => {
            if (responceData['ResponseCode'] !== 0) {
                this.notifyGetUserRegisterError.next((responceData['Description']));
            } else {
                this.notifyGetUserRegisterData.next(responceData['ResponseCode']);
                this.localStorageService.remove('AffiliateData');
                let paramsLogin = {'ClientIdentifier': params.Email, 'Password': responceData.Password};
                login && this.userLogined.userLogin(paramsLogin);
            }
        });
    }

    public getCountry(params): any {
        params.LanguageId = this.defaultOptions.DefaultLanguage;
        this.authService.getRegion(params).then((response) => {
            this.notifyGetCountry.next((response['ResponseObject']));
        });
    }


    public getRegion(id): any {
        let requestData = {
            LanguageId: this.defaultOptions.DefaultLanguage,
            ParentId: JSON.parse(id),
            TypeId: 4
        };
        this.authService.getRegion(requestData).then((response) => {
            this.notifyGetRegion.next((response['ResponseObject']));
        });
    }

    public getDistrict(id): any {
        let requestData = {
            LanguageId: this.defaultOptions.DefaultLanguage,
            ParentId: JSON.parse(id),
            TypeId: 2
        };
        this.authService.getRegion(requestData).then((response) => {
            this.notifyGetDistrict.next((response['ResponseObject']));
        });
    }

    public getCity(id): any {
        let requestData = {
            LanguageId: this.defaultOptions.DefaultLanguage,
            ParentId: JSON.parse(id),
            TypeId: 3
        };

        this.authService.getRegion(requestData).then((response) => {
            this.notifyGetCity.next((response['ResponseObject']));
        });
    }
    public getTown(id): any {
        let requestData = {
            LanguageId: this.defaultOptions.DefaultLanguage,
            ParentId: JSON.parse(id),
            TypeId: 8
        };

        this.authService.getRegion(requestData).then((response) => {
            this.notifyGetTown.next((response['ResponseObject']));
        });
    }

    public getLands(id): any {
        let requestData = {
            LanguageId: this.defaultOptions.DefaultLanguage,
            ParentId: JSON.parse(id),
            TypeId: 6
        };
        this.authService.getRegion(requestData).then((response) => {
            this.notifyGetLands.next((response['ResponseObject']));
        });
    }
}
