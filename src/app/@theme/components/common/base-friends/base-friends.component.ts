import {Directive, ElementRef, Injector, OnInit, ViewChild} from '@angular/core';
import {ConfigService, LocalStorageService} from "@core/services";
import {FriendsService} from "@core/services/api/friends.service";
import {TranslateService} from "@ngx-translate/core";
import {Subject, Subscription} from "rxjs";
import {BalanceService} from "@core/services/api/balance.service";

@Directive()
export class BaseFriendsComponent implements OnInit {
  protected subscriptions:Subscription[] = [];
  balanceService: BalanceService;
  balances = {};
  currencyId: any;
  friends: Array<any> = [];

  email: string = "";

  inviteMessage: string;
  showError: number = 0;

  @ViewChild("name") name: ElementRef;

  public friendsTimeFilter: Array<any> = [
    {"Id": 0, "Name": "Filter_Period.24 hours", Range: 24},
    {"Id": 1, "Name": "Filter_Period.3 days", Range: 72},
    {"Id": 2, "Name": "Filter_Period.7 days", Range: 168},
    {"Id": 3, "Name": "Filter_Period.1 month", Range: 720}
  ];
  selectedTimeFilter = this.friendsTimeFilter[0];
  private userData: any;
  private defaultOptions: any;
  private localStorageService: LocalStorageService;
  private friendsService: FriendsService;
  private configService: ConfigService;
  private translate: TranslateService;
  public referralLink: string;
  public inviteFriend$ = new Subject<any>();

  constructor(protected injector: Injector)
  {
    this.friendsService = injector.get(FriendsService);
    this.translate = injector.get(TranslateService);
    this.localStorageService = injector.get(LocalStorageService);
    this.configService = injector.get(ConfigService);
    this.userData = this.localStorageService.get('user');
    this.currencyId = this.userData ? this.userData.CurrencyId : '';
    this.balanceService = this.injector.get(BalanceService);

    this.subscriptions.push(
        this.balanceService.notifyUpdateBalance.subscribe(data => this.balances = data)
    );
  }

  ngOnInit() {
    this.defaultOptions = this.configService.defaultOptions;
    const platformId = this.defaultOptions.PartnerId * 100;
    console.log(this.userData, 'userData')
    this.referralLink = window.location.origin +  '/signup' + "/?ReferenceCode=" + this.userData.Id + "&AffiliatePlatformId=" + platformId;
    this.getFriends(this.selectedTimeFilter.Range);
  }

  getFriends(range) {
    this.friendsService.getFriends(range).subscribe(data => {
      this.friends = data;
    });
  }

  inviteFriend() {
    this.friendsService.inviteFriend(this.email).subscribe(data => {
      if (data['ResponseCode'] == 0) {
        this.showError = 1;
        this.translate.get("Friends.EmailSuccess").subscribe((res: string) => {
          this.inviteMessage = res;
          this.inviteFriend$.next({ message: res, type: 'Success' });
        });
      } else {
        this.inviteMessage = data['Description'];
        this.showError = 2;
        this.inviteFriend$.next({ message: data['Description'], type: 'Error' });
      }

      setTimeout(() => {
        this.email = "";
        this.inviteMessage = '';
        this.showError = 0;
      }, 3000);
    });
  }

  onTimeFilterChange(data) {
    this.getFriends(data.Range);
  }
  ngOnDestroy()
  {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
