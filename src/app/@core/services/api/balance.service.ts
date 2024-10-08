import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../app/config.service';
import {Balance, Request} from "@core/models";
import {LocalStorageService} from "@core/services/app/localStorage.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Controllers, Methods} from "@core/enums";
import {SignalRService} from "@core/services/soket/signal-r.service";
import {BaseApiService} from "@core/services/api/base-api.service";
import {take} from "rxjs/operators";

@Injectable()
export class BalanceService {

    public userData: any;
    public showBalance: boolean = true;

    public notifyUpdateBalance: BehaviorSubject<Balance> = new BehaviorSubject<any>(new Balance());
    public notifyUpdateBalanceError: Subject<any> = new Subject<any>();
    public notifyGetBonusBalance: Subject<any> = new Subject<any>();
    public notifyGetBonusBalanceError: Subject<any> = new Subject<any>();

    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService,
        private configService: ConfigService,
        private signalRService: SignalRService,
        private baseApiService:BaseApiService
    ) {
        this.userData = this.localStorageService.get('user');
        this.subscribeSocketBalance();
    }

    private subscribeSocketBalance(): void {
        this.signalRService.clientBalance$.subscribe(balanceData => {
            this.notifyUpdateBalance.next(this.parseBalance(balanceData));
        });
    }

    public getSettings() {
        return this.configService.defaultOptions;
    }

    public toggleShowBalance() {
        this.showBalance = !this.showBalance;
    }

    public getBalance() {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.PartnerId = PartnerId;
        request.Loader = false;
        request.RequestData = JSON.stringify({
            CurrencyId: this.userData.CurrencyId
        });

        this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/GetClientBalance`, request).pipe(take(1)).subscribe(data => {
            if (data["ResponseCode"] == 0)
                this.notifyUpdateBalance.next(this.parseBalance(data));
            else this.notifyUpdateBalanceError.next((data["Description"]));
        });
    }


    public getClimeToCampaignBonus(id)
    {
        return this.baseApiService.apiPost( '', {RequestData:JSON.parse(id), Controller:Controllers.CLIENT, Method:Methods.CLIME_TO_CAMPAIGN_BONUS}, null,true);
    }

    public spendComplimentaryPoints(points)
    {
        return this.baseApiService.apiPost( '', {RequestData:JSON.stringify({CompPoints:points}), Controller:Controllers.CLIENT, Method:Methods.SPEND_COMPLIMENTARY_POINTS}, null,true);
    }

    get currentBalance(): string {
        return this.notifyUpdateBalance.getValue().TotalBalance;
    }

    public getBonusBalance(Id) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Controller = Controllers.DOCUMENT;
        request.Method = Methods.GET_BONUS_Balance;
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.PartnerId = PartnerId;
        request.RequestData = JSON.stringify(Id);

        return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).toPromise();
    }

    public parseBalance(resp): Balance
    {
        let balance: Balance = resp;
        for (let i = 0, count = balance.Balances?.length; i < count; i++) {
            switch (balance.Balances[i].TypeId)
            {
                case 1:
                    balance.UnusedBalance = balance.Balances[i].Balance;
                    break;
                case 2:
                    balance.UsedBalance = balance.Balances[i].Balance;
                    break;
                case 3:
                    balance.BookingBalance = balance.Balances[i].Balance;
                    break;
                case 15:
                    balance.AffiliateManagerBalance = balance.Balances[i].Balance;
                    break;
                case 12:
                    balance.BonusBalance = balance.Balances[i].Balance;
                    break;
            }
        }
        balance.BonusBalance = balance.BonusBalance || "0";
        balance.UsedBalance = balance.UsedBalance || "0";
        balance.BookingBalance = balance.BookingBalance || "0";
        balance.AffiliateManagerBalance = balance.AffiliateManagerBalance || "0";
        balance.UnusedBalance = balance.UnusedBalance || "0";
        balance.TotalBalance = (Number(balance.AvailableBalance) + Number(balance.BonusBalance)).toString();
        return balance;
    }

    getPartnerCurrenciesByType(): Observable<any> {
        return this.baseApiService.apiRequest(null, Controllers.MAIN, Methods.GET_PARTNER_CURRENCIES, false);
    }
}

