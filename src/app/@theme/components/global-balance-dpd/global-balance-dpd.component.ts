import {Component, OnInit, Input, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {ConfigService, LocalStorageService} from "@core/services";
import {BalanceService} from "@core/services/api/balance.service";


@Component({
    selector: 'app-global-balance-dpd',
    templateUrl: './global-balance-dpd.component.html',
    styleUrls: ['./global-balance-dpd.component.scss']
})
export class GlobalBalanceDpdComponent implements OnInit {

    @Input() itemClassname: string;
    public balance: string;
    public currencySymbol: any;
    public balanceService: BalanceService;
    public userData: any;
    public localStorageService: LocalStorageService;
    public router: Router;
    public configService: ConfigService;
    public balanceInfo: any;

    constructor(public injector: Injector) {
        this.balanceService = injector.get(BalanceService);
        this.configService = injector.get(ConfigService);
        this.router = injector.get(Router);
        this.currencySymbol = this.userData ? this.userData.CurrencySymbol : '';
        /* this.userData = this.localStorageService.get('user');*/
    }

    ngOnInit() {
        this.balanceService.notifyUpdateBalance.subscribe(data => {
            this.balanceInfo = data;
            this.balance = Number(data.AvailableBalance).toFixed(2);
        });
    }

    changePage(pageName) {
        let url = '/user/' + (this.configService.defaultOptions.AccountTemplateType == undefined ? '1' : this.configService.defaultOptions.AccountTemplateType) + '/' + pageName;
        this.router.navigate([url]);
    }

}
