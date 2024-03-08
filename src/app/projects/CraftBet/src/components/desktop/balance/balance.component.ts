import { Component, Input, OnInit } from '@angular/core';
import {BalanceService} from "../../../../../../@core/services/api/balance.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../../../../../@core/services";
import {UserLogined} from "../../../../../../@core/services/app/userLogined.service";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  @Input() menuItem;
  public balance: string;
  public unusedBalance: string;
  public bonus: string;
  public currencySymbol: any;
  public userData: any;
  public isLogin: boolean;
  public selectedAccount;
  public selectedAccountBalance;
  public accountBalances;

  constructor(public balanceService: BalanceService, public router: Router, public localStorageService: LocalStorageService,
               public userLogined: UserLogined) {
    this.userData = this.localStorageService.get('user');
    this.currencySymbol = this.userData ? this.userData.CurrencySymbol : '';
    this.isLogin = this.userLogined.isAuthenticated;
  }

  ngOnInit(): void {
    if (this.menuItem['useAccountType'] != undefined) {
      this.menuItem['useAccountType'] = this.menuItem['useAccountType'] === '1' ? true : false;
    }
    this.balanceService.notifyUpdateBalance.subscribe(data => {
      this.accountBalances = this.groupBalances(data?.Balances);
      this.balance = Number(data.AvailableBalance).toFixed(2);
      this.unusedBalance = Number(data.UnusedBalance).toFixed(2);
      this.bonus = Number(data.BonusBalance) > 0 ? Number(data.BonusBalance).toFixed(2) : "0.00";
    });
  }

  private groupBalances(balances):any[]
  {
    let groupedBalances = [];

    for(let i = 0; i < balances?.length; i++)
    {
      let balance = {...balances[i]};

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

  navigateByHref(item, event)
  {
    if(item.Href)
      this.router.navigate(['/' + item.Href]);
  }

  onSelectedAccountChange(event)
  {
    this.selectedAccount = event.Ids;
    for (let i = 0; i <  this.accountBalances.length; i++)
    {
      if(this.accountBalances[i].Ids.find(b => this.selectedAccount.includes(b)))
      {
        this.selectedAccountBalance = this.accountBalances[i].Balance;
      }
    }
  }

}
