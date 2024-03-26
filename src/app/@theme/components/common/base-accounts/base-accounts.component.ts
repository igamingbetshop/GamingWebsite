import {Directive, EventEmitter, inject, Injector, Input, Output, SimpleChanges} from "@angular/core";
import {BaseComponent} from "../../base/base.component";
import {LocalStorageService, SaveData} from "@core/services";
import {ActivatedRoute} from "@angular/router";
import {PaymentControllerService} from "@core/services/app/paymentController.services";
import {BaseApiService} from "@core/services/api/base-api.service";
import {Controllers, Methods} from "@core/enums";
import {MatDialog} from "@angular/material/dialog";

@Directive()

export class BaseAccountsComponent extends BaseComponent {
    public paymentControllerService: PaymentControllerService;
    protected savedDateService: SaveData;
    public baseApiService: BaseApiService;
    public localStorageService: LocalStorageService;
    dialog = inject(MatDialog);
    private route: ActivatedRoute;
    public Accounts: any;
    public mappedAccounts: any;
    public TotalAvailableBalance: number = 0;
    public BonusBalance:any;
    public CurrencyId;
    public currencySymbol: any;
    public selectedAccount;
    public clientAccounts = [];
    public openedItems: any[] = [];
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
            this.clientAccounts = data;
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
                    const realBalance:any = {AccountTypeName:'Real Balance', Balance:0, CurrencyId:'', Id: this.Accounts[0].Id};
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
        this.selectSessionAccount(account, event);
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
                localStorage.setItem('selectedAccountId', JSON.stringify(
                    {
                        TypeId: account.TypeId,
                        Id: account.Id,
                        BetShopId: account.BetShopId,
                        PaymentSystemId: account.PaymentSystemId,
                        AccountTypeName: account.AccountTypeName,
                        Balance: account.Balance
                    }
                    ));
                this.selectedAccountChange.emit(account);
                if (this.selectedAccount) {
                    this.openedItems.push(this.selectedAccount);
                }
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
            this.balanceByBetShopId(balance, this.clientAccounts);

            if(!Array.isArray(balance.Ids))
                balance.Ids = [];

            if(balance.TypeId !== 3 && balance.TypeId !== 12 && balance.TypeId !== 16 && balance.TypeId !== 17 && balance.TypeId !== 18)
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
                    balance.AccountTypeName = 'Web Wallet';
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

    protected balanceByBetShopId(balance, clientAccounts): void {
        balance.notWithdrawable = 0;
        balance.withdrawable = 0;
        balance.bonus = 0;
        balance.withdrawalRequest = 0;
        balance.compBalance = 0;
        balance.coinBalance = 0;
        balance.bonusWin = 0;
        balance.compBalanceName = '';
        balance.coinBalanceName = '';
        balance.bonusWinName = '';
        if (balance.BetShopId === null) {
            clientAccounts.forEach(account => {
                if (account.BetShopId === null) {
                    switch (account.TypeId) {
                        case 1:
                            balance.notWithdrawable += account.Balance;
                            break;
                        case 2:
                            balance.withdrawable += account.Balance;
                            break;
                        case 12:
                            balance.bonus += account.Balance;
                            break;
                        case 3:
                            balance.withdrawalRequest += account.Balance;
                            break;
                        case 16:
                            balance.compBalanceName = account.AccountTypeName;
                            balance.compBalance += account.Balance;
                            break;
                        case 17:
                            balance.coinBalanceName = account.AccountTypeName;
                            balance.coinBalance += account.Balance;
                            break;
                        case 18:
                            balance.bonusWinName = account.AccountTypeName;
                            balance.bonusWin += account.Balance;
                            break;
                        default:
                            break;
                    }
                }
            });
        } else {
            switch (balance.TypeId) {
                case 1:
                    balance.withdrawable = balance.Balance;
                    break;
                case 2:
                    balance.notWithdrawable = 0;
                    break;
                case 12:
                    balance.bonus = balance.Balance;
                    break;
                case 3:
                    balance.withdrawalRequest = balance.Balance;
                    break;
                case 16:
                    balance.compBalanceName = balance.AccountTypeName;
                    balance.compBalance += balance.Balance;
                    break;
                case 17:
                    balance.coinBalanceName = balance.AccountTypeName;
                    balance.coinBalance += balance.Balance;
                    break;
                case 18:
                    balance.bonusWinName = balance.AccountTypeName;
                    balance.bonusWin += balance.Balance;
                    break;
                default:
                    break;
            }
        }
    }
}
