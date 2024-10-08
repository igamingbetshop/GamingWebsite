import {OnInit, Injector, Injectable} from '@angular/core';
import {SaveData, ConfigService} from '@core/services';
import {UserLogined} from "@core/services/app/userLogined.service";
import {BalanceService} from "@core/services/api/balance.service";
import {TranslateService} from "@ngx-translate/core";


@Injectable()
export class UserAccountStatmentComponent implements OnInit {
    public balanceService: BalanceService;
    public userLogined: UserLogined;
    public saveData: SaveData;
    public configService: ConfigService;
    public translate: TranslateService;

    public isLogin: boolean;
    public userInfo: any;
    public availableBalance: string;
    public balanceInfo: any;
    public pageTitle: any;
    public pageSubTitle: any;

    constructor(public injector: Injector) {
        this.balanceService = injector.get(BalanceService);
        this.userLogined = injector.get(UserLogined);
        this.saveData = injector.get(SaveData);
        this.configService = injector.get(ConfigService);
        this.translate = injector.get(TranslateService);
    }

    async ngOnInit() {

        this.isLogin = this.userLogined.isAuthenticated;
        this.userInfo = this.userLogined.getUserInfo();

        this.balanceService.notifyUpdateBalance.subscribe(data => {
            this.balanceInfo = data;
            this.availableBalance = data.AvailableBalance;
        });

        this.saveData.userPageInfo.subscribe((data) => {
            this.pageTitle = data['title'];
            this.pageSubTitle = data['subTitle'];
        });

    }

    protected formatValue(value:number):string
    {
        if(Number.isInteger(value))
            return value.toFixed(2);
        else return (Math.trunc(value * 100) / 100).toFixed(2);
    }

}
