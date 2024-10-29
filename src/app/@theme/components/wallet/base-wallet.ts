import {DestroyRef, Directive, inject, OnInit, signal} from "@angular/core";
import {Account, Currency, Wallet} from "../../../@core/types";
import {BaseApiService} from "../../../@core/services/api/base-api.service";
import {BalanceService} from "../../../@core/services/api/balance.service";
import {forkJoin} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatDialog} from "@angular/material/dialog";
import {LocalStorageService} from "@core/services";

@Directive()
export class BaseWallet implements OnInit {
    selectedWallet = signal<Wallet | null>(null);
    wallets = signal<Wallet[]>([]);
    pattern = signal<string>("");
    balanceService = inject(BalanceService);
    protected dialog = inject(MatDialog);
    baseApiService = inject(BaseApiService);
    localStorage = inject(LocalStorageService);
    
    #destroyRef = inject(DestroyRef);


    constructor()
    {
        this.#getWalletSource();
    }

    ngOnInit()
    {

    }

    selectWallet(wallet:Wallet)
    {
        const req:any = {CurrencyId:wallet.Currency.Id};
        const hasAccount = wallet.Accounts.length > 0;
        if(hasAccount)
        {
            req.Id = wallet.Accounts[0].Id;
            this.selectedWallet.set(wallet);
            this.localStorage.add("selectedAccountId", wallet.Accounts[0].Id.toString());
        }

        this.balanceService.selectWallet(wallet).subscribe(data => {
            if(!hasAccount && data)
            {
                wallet.Accounts.push(data);
                wallet.Balance += data.Balance;
                this.wallets.update(wallets => [...wallets]);
                this.selectedWallet.set(wallet);
                this.localStorage.add("selectedAccountId", wallet.Accounts[0].Id.toString());
            }
        });
    }

    updatePattern(event: Event | string)
    {
        if(typeof event === 'string')
            this.pattern.set(event);
        else
        {
            const inputElement = event.target as HTMLInputElement;
            this.pattern.set(inputElement.value);
        }
    }

    async openWallets(){}

    #getWalletSource()
    {
        forkJoin( [this.balanceService.getAccounts(), this.balanceService.getPartnerCurrenciesByType()])
            .pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(data => {
                this.#createWallets(data[1], data[0]);
        });
    }

    #createWallets(currencies:Currency[], accounts:Account[])
    {
        const wallets = [];
        currencies.forEach(currency => {
            const wallet:Wallet = {Accounts:[], Currency:currency, Balance:0};
            currency.ImageUrl = `${window['debugPath']}/assets/images/currencies/${currency.Id}.svg`;
            accounts.forEach(account => {
                if(account.CurrencyId === currency.Id)
                {
                    wallet.Accounts.push(account);
                    wallet.Balance += account.Balance;
                }
            });
            wallets.push(wallet);
        });
        this.wallets.set(wallets);

        const selectedAccountId = this.localStorage.get("selectedAccountId");

        let wallet:Wallet;

        if(selectedAccountId)
            wallet = this.wallets().find(w => w.Accounts[0]?.Id === Number(selectedAccountId));
        else
            wallet = this.wallets().find(w => w.Currency.Type === 2);

        this.selectWallet(wallet);
    }
}