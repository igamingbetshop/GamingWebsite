import {OnInit, Injector, Injectable} from '@angular/core';
import {SaveData, ConfigService} from '@core/services';
import {UserLogined} from "@core/services/app/userLogined.service";
import {BalanceService} from "@core/services/api/balance.service";


@Injectable()
export class UserAccountStatmentComponent implements OnInit {
    public balanceService: BalanceService;
    public userLogined: UserLogined;
    public saveData: SaveData;
    public configService: ConfigService;


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

}
