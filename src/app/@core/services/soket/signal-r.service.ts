import {Injectable} from "@angular/core";
import * as signalR from "@microsoft/signalr";
import {Subject} from "rxjs";
import {ConfigService, LocalStorageService} from "@core/services";
import {User} from "@core/models";

@Injectable()
export class SignalRService {
    connection: any;

    private notifyConnection: Subject<boolean> = new Subject<boolean>();
    public onConnected = this.notifyConnection.asObservable();
    public connectionExists: boolean = false;

    private notifyUpdateWinWidget: Subject<any> = new Subject();
    public onUpdateWinWidget$ = this.notifyUpdateWinWidget.asObservable();

    private clientBalanceNotifier$: Subject<any> = new Subject<any>();
    public clientBalance$ = this.clientBalanceNotifier$.asObservable();

    private depositLimitInfo: Subject<any> = new Subject<any>();
    public onDepositLimitInfo$ = this.depositLimitInfo.asObservable();

    private betLimitInfo: Subject<any> = new Subject<any>();
    public onBetLimitInfo$ = this.betLimitInfo.asObservable();

    private cmsPopupInfo: Subject<any> = new Subject<any>();
    public onCmsPopupInfo$ = this.cmsPopupInfo.asObservable();

    private notifyLogout: Subject<any> = new Subject<any>();
    public onLogout$ = this.notifyLogout.asObservable();

    #notifyEmailVerified: Subject<any> = new Subject<any>();
    onEmailVerified$ = this.#notifyEmailVerified.asObservable();

    constructor(
        private configService: ConfigService,
        private localStorageService: LocalStorageService
    ) {
        this.configService.onConfigLoaded$.subscribe(data => {
            this.init();
        })
    }

    init() {
        const timeZone = this.configService.timeZone;
        const lang = localStorage.getItem('lang') || this.configService.defaultOptions.DefaultLanguage;
        const user:User = this.localStorageService.get("user");
        const token = user && user.Token || "";
        const isAgent = user && user.IsAgent || "";
        const socketQueryString = `/basehub?PartnerId=${this.configService.defaultOptions["PartnerId"]}&Token=${token}&LanguageId=${lang}&TimeZone=${timeZone}&IsAgent=${isAgent}`;

        this.connection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Information)
            .withUrl(this.configService.defaultOptions["WebApiUrl"] + socketQueryString)
            .withAutomaticReconnect()
            .build();

        this.connection.start()
            .then(() => {
                this.connectionExists = true;
                this.notifyConnection.next(true);
            })
            .catch(function (err) {
                return console.error(err.toString());
            });

        this.connection.on("onWin", (data) => {
            this.notifyUpdateWinWidget.next(data);
        });

        this.connection.on("onBalance", (data) => {
            this.clientBalanceNotifier$.next(data);
        });

        this.connection.on("onDepositLimit", (data) => {
            this.depositLimitInfo.next(data);
        });

        this.connection.on("onBetLimit", (data) => {
            this.betLimitInfo.next(data);
        });

        this.connection.on("onPopup", (data) => {
            this.cmsPopupInfo.next(data);
        });

        this.connection.on("onLogout", (data) => {
            this.notifyLogout.next(data);
        });
        this.connection.on("onEmailVerified", (data) => {
            this.cmsPopupInfo.next(data);
        });
    }

    sendMessage(messageName: string, ...args: any[]) {
        this.connection.invoke(messageName, args)
            .then(data => {

            })
            .catch(err => {
                console.error(err);
            });
    }

    public getSettings() {
        return this.configService.defaultOptions;
    }
}
