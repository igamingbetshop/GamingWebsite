import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfigService} from '../app/config.service';
import {Bonus, Request} from "@core/models";
import {LocalStorageService} from "@core/services/app/localStorage.service";
import {Controllers, Methods, Products} from "@core/enums";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class BonusesService {

    public userData: any;

    public notifyGetBonuses: Subject<any> = new Subject<any>();
    public notifyGetBonusesError: Subject<any> = new Subject<any>();

    public notifyGetBonuBets: Subject<any> = new Subject<any>();
    public notifyGetBonuBetsError: Subject<any> = new Subject<any>();

    public notifyGetDepositBonusInfo: Subject<any> = new Subject<any>();

    notifyDeleteBonus: Subject<any> = new Subject<any>();
    notifyDeleteBonusError: Subject<any> = new Subject<any>();

    public isBonusActivated: boolean = false;
    public bonusesInfo: any;
    public selectedBonusPercentTranslation: any;
    public calculatedBonusAmount: number;

    public selectedBonusInfo: any;

    constructor(private http: HttpClient,
                private localStorageService: LocalStorageService,
                private configService: ConfigService,
                translate: TranslateService) {
        this.userData = this.localStorageService.get("user");
    }

    public getSettings() {
        return this.configService.defaultOptions;
    }

    SelectBonusInfo(bonusInfo) {
        this.selectedBonusInfo = bonusInfo;
        this.selectedBonusPercentTranslation = {value: this.selectedBonusInfo.Percent};
    }

    GetBonuses(data)
    {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Controller = Controllers.DOCUMENT;
        request.Method = Methods.GET_BONUSES;
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.PartnerId = PartnerId;
        request.RequestData = JSON.stringify(data);

        this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).subscribe(data => {
            if (data["ResponseCode"] == 0)
                this.notifyGetBonuses.next(data["ResponseObject"]);
            else this.notifyGetBonusesError.next((data["Description"]));
        });
    }

    DeleteBonus(bonus: Bonus, data)
    {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Controller = Controllers.DOCUMENT;
        request.Method = Methods.DELETE_BONUS;
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.RequestData = JSON.stringify({...{BonusId:bonus.Id}, ...data});

        this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).subscribe(data => {
            if (data["ResponseCode"] == 0)
            {
                this.notifyDeleteBonus.next(data["ResponseObject"]);
                bonus.State = data["ResponseObject"].State;
                bonus.StateName = data["ResponseObject"].StateName;
            }
            else this.notifyDeleteBonusError.next((data["Description"]));

        });
    }

    /*GetDepositBonusInfo() {
      const {WebApiUrl, PartnerId} = this.getSettings();
      let request = new Request();
      request.Controller = Controllers.DOCUMENT;
      request.Method = Methods.GET_DEPOSIT_BONUS_INFO;
      request.Token = this.userData.Token;
      request.ClientId = this.userData.Id;
      return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request, {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
      }).toPromise();
    }*/

    GetDepositBonusInfo(paymentSystemId?): Promise<any> {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Controller = Controllers.DOCUMENT;
        request.Method = Methods.GET_DEPOSIT_BONUS_INFO;
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.RequestData = paymentSystemId;
        return this.http.post<any>(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request, {
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
        }).pipe(map(data => {
            this.bonusesInfo = data.ResponseObject;
            this.notifyGetDepositBonusInfo.next(data.ResponseObject);
            if (this.bonusesInfo && this.bonusesInfo.length > 0) {
                this.SelectBonusInfo(this.bonusesInfo[0]);
            }

            return data;
        })).toPromise();
    }


    GetBonusBets(bonus: Bonus, productId?: number) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Controller = Controllers.DOCUMENT;
        request.Method = Methods.GET_BONUS_BETS;
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.PartnerId = PartnerId;
        request.RequestData = JSON.stringify({
            BonusId: bonus.Id,
            ProductId: productId ? productId : Products.SPORTSBOOK
        });

        this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).subscribe(data => {
            if (data["ResponseCode"] == 0) {
                this.notifyGetBonuBets.next(data["ResponseObject"]);
            } else this.notifyGetBonuBetsError.next((data["Description"]));
        });
    }

    getTriggers(bonus:Bonus) {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Controller = Controllers.CLIENT;
        request.Method = Methods.GET_CLIENT_BONUS_TRIGGERS;
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.PartnerId = PartnerId;
        request.RequestData = JSON.stringify({BonusId:bonus.BonusId, ReuseNumber:bonus.ReuseNumber});

        return this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request).pipe(map(data => {
            return data['ResponseCode'] == 0 ? data['ResponseObject'] : {Triggers: [], Bonus: {}};
        }));
    }

    ActivatePromoCode(promoCode): Observable<any> {
        const {WebApiUrl, PartnerId} = this.getSettings();
        let request = new Request();
        request.Controller = Controllers.CLIENT;
        request.Method = Methods.ACTIVATE_PROMO_CODE;
        request.TimeZone = this.configService.timeZone;
        request.Token = this.userData.Token;
        request.ClientId = this.userData.Id;
        request.PartnerId = PartnerId;
        request.RequestData = promoCode;
        return this.http.post(`${WebApiUrl}/${PartnerId}/api/Main/ApiRequest`, request);
    }

    toggleActivateBonus() {
        this.isBonusActivated = !this.isBonusActivated;
    }

    calculateBonusAmount(amount) {
        this.calculatedBonusAmount = null;
        if (amount > 0 && this.selectedBonusInfo) {
            this.calculatedBonusAmount = 0;
            let currentBonusAmount = amount * this.selectedBonusInfo.Percent / 100;
            this.calculatedBonusAmount = currentBonusAmount < this.selectedBonusInfo.MaxAmount ? currentBonusAmount : this.selectedBonusInfo.MaxAmount;
        }
    }


}

