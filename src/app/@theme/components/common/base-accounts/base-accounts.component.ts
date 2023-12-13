import {Directive, EventEmitter, Injector, Input, Output, SimpleChanges} from "@angular/core";
import {BaseComponent} from "../../base/base.component";
import {LocalStorageService, SaveData} from "@core/services";
import {ActivatedRoute} from "@angular/router";
import {PaymentControllerService} from "@core/services/app/paymentController.services";
import {BaseApiService} from "@core/services/api/base-api.service";
import {Controllers, Methods} from "@core/enums";

@Directive()

export class BaseAccountsComponent extends BaseComponent {
    public paymentControllerService: PaymentControllerService;
    private savedDateService: SaveData;
    public baseApiService: BaseApiService;
    public localStorageService: LocalStorageService;
    private route: ActivatedRoute;
    public Accounts: any;
    public mappedAccounts: any;
    public TotalAvailableBalance: number = 0;
    public BonusBalance:any;
    public CurrencyId;
    public currencySymbol: any;
    public selectedAccount;
    @Input() useAccountType;
    @Input() balances;
    @Output() selectedAccountChange = new EventEmitter<any>();

    @Input() hideUnusedAvailableBalance: boolean = false;
    @Input() templateType:number = 1;

    constructor(public injector: Injector) {
        super(injector);
        this.paymentControllerService = injector.get(PaymentControllerService);
        this.savedDateService = injector.get(SaveData);
        this.localStorageService = injector.get(LocalStorageService);
        this.route = injector.get(ActivatedRoute);
        this.baseApiService = injector.get(BaseApiService);
    }

    ngOnChanges(changes: SimpleChanges)
    {
        if (changes.balances && changes.balances.currentValue && this.selectedAccount)
        {
            this.Accounts.forEach(account => {
                const matchingBalance = changes.balances.currentValue.find(balance => balance.Id === account.Id);
                if (matchingBalance) {
                    account.Balance = matchingBalance.Balance;
                }
            });
            const selectedAccount = changes.balances.currentValue.find(account => account.Id === this.selectedAccount.Id);
            if (selectedAccount) {
                this.selectedAccount.Balance = selectedAccount.Balance;
                this.selectedAccountChange.emit(this.selectedAccount);
            }
        }
    }

    ngOnInit() {

        this.paymentControllerService.getUserAccountData();

        this.paymentControllerService.notifyGetUserAccountData.subscribe((data) =>
        {
            this.Accounts = [...data];
            let withdrawableBalance = 0;
            this.TotalAvailableBalance = 0;
            for (let i = 0; i < this.Accounts.length; i++) {

                this.Accounts[i].Percent = Math.round(this.Accounts[i].Balance <= 0 ? 0 : 100 - this.Accounts[i].WithdrawableBalance * 100 / this.Accounts[i].Balance);
                this.Accounts[i].Info = this.Accounts[i].AccountTypeName;
                this.Accounts[i].CommonInfo = this.Accounts[i].Percent;
                this.Accounts[i].AvailableBalance = this.Accounts[i].WithdrawableBalance;
                this.TotalAvailableBalance += this.Accounts[i].WithdrawableBalance;
                this.CurrencyId = this.Accounts[i].CurrencyId;
                if (this.Accounts[i].TypeId != 3)
                    withdrawableBalance += this.Accounts[i].WithdrawableBalance;
                if (this.Accounts[i].BetShopId !== null) {
                    this.Accounts[i].hasBetShop = 'BS';
                }
            }
            this.mappedAccounts = this.Accounts.find((item) => item.TypeId === 3);
            this.BonusBalance = this.Accounts.find((item) => item.TypeId === 12);
            this.savedDateService.TotalAvailableBalance = Number(withdrawableBalance.toFixed(2));
            this.Accounts = this.groupBalances(this.Accounts);
            if (this.useAccountType)
            {
                const storedAccountId = JSON.parse(localStorage.getItem('selectedAccountId'));
                if (storedAccountId)
                {
                    const account = this.Accounts.find(acc => acc.Id === storedAccountId.Id);
                    if (account)
                    {
                        this.selectSessionAccount(account);
                    }
                    else
                    {
                        this.selectSessionAccount(this.Accounts[0]);
                    }
                }
                else
                {
                    this.selectSessionAccount(this.Accounts[0]);
                }
            } else {
                if(this.templateType == 2)
                {
                    this.hideUnusedAvailableBalance = true;
                    const realBalance:any = {AccountTypeName:'Real Balance', Balance:0, CurrencyId:''};
                    for (let i = 0; i < this.Accounts.length; i++)
                    {
                        if(this.Accounts[i].TypeId === 1 || this.Accounts[i].TypeId === 2)
                        {
                            realBalance.Balance += this.Accounts[i].Balance;
                            realBalance.CurrencyId = this.Accounts[i].CurrencyId;
                            this.Accounts.splice(i,1);
                            i--;
                        }
                    }
                    this.Accounts.unshift(realBalance);
                }
            }
        });
    }

    selectedAccountBalance(event, account)
    {
        event.stopPropagation();
        if (this.useAccountType) {
            this.selectSessionAccount(account, event);
        }
    }

    isSelectedAccount(account): boolean {
        return this.selectedAccount === account;
    }

    selectSessionAccount(account, event?)
    {
        this.baseApiService.apiRequest(account.Id, Controllers.CLIENT, Methods.SELECT_SESSION_ACCOUNT).subscribe((responseData) => {
            if (responseData.ResponseCode == 0)
            {
                this.selectedAccount = account;
                localStorage.setItem('selectedAccountId', JSON.stringify({ TypeId: account.TypeId, Id: account.Id, BetShopId: account.BetShopId }));
                this.selectedAccountChange.emit(account);
                if(event)
                    location.reload();
            }
        });
    }

    /*TO DO refactor logic after merge with craft_fixed branch*/
    protected groupBalances(balances):any[]
    {
        let groupedBalances = [];

        for(let i = 0; i < balances.length; i++)
        {
            let balance = balances[i];

            if(!Array.isArray(balance.Ids))
                balance.Ids = [];

            if(balance.TypeId !== 3)
            {
                if(balance.BetShopId === null && balance.PaymentSystemId === null)
                {
                    if (balance.TypeId === 1 || balance.TypeId === 2)
                    {
                        let b = groupedBalances.find(b => !b.BlockForGroup && (b.TypeId === 1 || b.TypeId === 2));
                        if(b)
                        {
                            b.Balance += balance.Balance;
                            b.Ids.push(balance.Id);
                        }
                        else
                        {
                            balance.Ids.push(balance.Id);
                            groupedBalances.push(balance);
                        }
                    }
                    else
                    {
                        balance.Ids.push(balance.Id);
                        groupedBalances.push(balance);
                    }
                }
                else
                {
                    balance.BlockForGroup = true;
                    balance.Ids.push(balance.Id);
                    groupedBalances.push(balance);
                }
            }
        }
        return groupedBalances;
    }
}
