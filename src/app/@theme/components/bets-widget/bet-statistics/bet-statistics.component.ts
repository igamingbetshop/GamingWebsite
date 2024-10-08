import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OnlyNumberDirectiveModule} from "../../../directives/only-number/only-number.directive.module";
import {ReactiveFormsModule} from "@angular/forms";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {Bet} from "../base-bets-widgets";
import {DropdownDirectiveModule} from "../../../directives/dropdown/dropdown-directive.module";
import {BalanceService} from "@core/services/api/balance.service";
import {Currency} from "@core/types";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Controllers, CurrencyTypes, Methods} from "@core/enums";
import {BaseApiService} from "@core/services/api/base-api.service";
import {TooltipDirective} from "../../../directives/tooltip";

type Tab = 'statistics' | 'trophies' | 'races';
type Type = 'all' | 'sport' | 'casino';
type BetCommonStatistics = {
  Username:string;
  VIPLevel:number;
  CreationTime:Date;
  TotalBetAmount:number;
  TotalBetCount:number;
  TotalWinCount:number;
  TotalLossCount:number;
  SportBetAmount:number;
  SportBetCount:number;
  SportWinCount:number;
  SportLossCount:number;
}

type BetStatistics = Pick<BetCommonStatistics, 'TotalBetAmount' | 'TotalBetCount' | 'TotalWinCount' | 'TotalLossCount' | 'VIPLevel' | 'CreationTime'>;

@Component({
  selector: 'bet-statistics',
  templateUrl: './bet-statistics.component.html',
  styleUrls: ['./bet-statistics.component.scss'],
  imports: [
      TranslateModule,
      OnlyNumberDirectiveModule,
      ReactiveFormsModule,
      NgOptimizedImage,
      DatePipe,
      DropdownDirectiveModule,
      TooltipDirective],
  standalone:true,
  changeDetection:ChangeDetectionStrategy.OnPush
})


export class BetStatisticsComponent implements OnInit{

  data:any = inject(MAT_DIALOG_DATA);
  bet:Bet = this.data.bet;
  tooltip = signal<boolean>(false);
  tabs = signal<Tab[]>(['statistics', 'trophies', 'races']);
  selectedTab = signal<Tab>(this.tabs()[0]);
  #dialogRef = inject(MatDialogRef<BetStatisticsComponent>);
  #balanceService = inject(BalanceService);

  types = signal<Type[]>(["all","casino", "sport"]);
  selectedType = signal<Type>(this.types()[0]);

  #allCurrency:Currency = {Id:"All", Name:"All", Type:2, Symbol:"", CurrentRate:1, ImageUrl:""};
  currencies = signal<Currency[]>([]);
  selectedCurrency = signal<Currency>(this.#allCurrency);
  betStatistics = signal<BetStatistics>({TotalBetCount:0,TotalBetAmount:0,TotalLossCount:0,TotalWinCount:0, VIPLevel:0, CreationTime:new Date()})
  #destroyRef = inject(DestroyRef);
  #apiService = inject(BaseApiService);
  #betId = this.data.bet.BetId;
  #betStatistics:BetCommonStatistics | null = null;


  selectType(type:Type)
  {
    this.selectedType.set(type);
    this.#updateStatistics();
  }

  selectCurrency(currency:Currency)
  {
    this.selectedCurrency.set(currency);
    this.#getClientStatistics();
  }

  ngOnInit()
  {
    this.#getClientStatistics();
    this.#balanceService.getPartnerCurrenciesByType()
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe(data => {
          if (data.ResponseCode === 0)
          {
            let currencies = [this.#allCurrency];
            const allCurrencies = data.ResponseObject as Currency[];
            allCurrencies.forEach(c => {
              currencies.push({...c, ImageUrl:`${window['debugPath']}/assets/images/currencies/${c.Id}.svg`});
            });
            this.currencies.set(currencies);
          }
        });
  }

  close()
  {
    this.#dialogRef.close();
  }

  selectTab(tab:Tab)
  {
    this.selectedTab.set(tab);
  }

  #getClientStatistics()
  {
    const payload:any = {BetId:this.#betId};
    if(this.selectedCurrency().Id !== "All")
      payload.CurrencyId = this.selectedCurrency().Id;

    this.#apiService.apiRequest(payload, Controllers.CLIENT, Methods.GET_CLIENT_STATISTICS).subscribe(data => {
        if(data.ResponseCode === 0)
        {
          this.#betStatistics = data.ResponseObject;
          this.#updateStatistics();
        }
    });
  }

  #updateStatistics() {
    if (this.#betStatistics) {
      const { TotalBetCount, TotalBetAmount, TotalLossCount, TotalWinCount, SportBetCount, SportBetAmount, SportLossCount, SportWinCount , VIPLevel, CreationTime} = this.#betStatistics;

      let statistics: BetStatistics = {
        TotalBetCount,
        TotalBetAmount,
        TotalLossCount,
        TotalWinCount,
        CreationTime,
        VIPLevel
      };

      switch (this.selectedType()) {
        case "casino":
          statistics =  {...statistics,
            TotalBetCount: TotalBetCount - SportBetCount,
            TotalBetAmount: TotalBetAmount - SportBetAmount,
            TotalLossCount: TotalLossCount - SportLossCount,
            TotalWinCount: TotalWinCount - SportWinCount
          };
          break;
        case "sport":
          statistics = {...statistics,
            TotalBetCount: SportBetCount,
            TotalBetAmount: SportBetAmount,
            TotalLossCount: SportLossCount,
            TotalWinCount: SportWinCount
          };
          break;
      }
      this.betStatistics.set({...statistics});
    }
  }

}
