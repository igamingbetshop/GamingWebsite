import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OnlyNumberDirectiveModule} from "../../../directives/only-number/only-number.directive.module";
import {ReactiveFormsModule} from "@angular/forms";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {Bet} from "../base-bets-widgets";
import {TooltipDirective} from "../../../directives/tooltip";
import {Router} from "@angular/router";

@Component({
  selector: 'bets-widget-info',
  templateUrl: './bets-widget-info.component.html',
  styleUrls: ['./bets-widget-info.component.scss'],
  imports: [TranslateModule, OnlyNumberDirectiveModule, ReactiveFormsModule, NgOptimizedImage, DatePipe, TooltipDirective],
  standalone:true,
  changeDetection:ChangeDetectionStrategy.OnPush
})


export class BetsWidgetInfoComponent implements OnInit{

  data:any = inject(MAT_DIALOG_DATA);
  bet:Bet = this.data.bet;
  #dialogRef = inject(MatDialogRef<BetsWidgetInfoComponent>);
  #router = inject(Router);

  ngOnInit()
  {
    this.bet.ImageUrl = `${window['debugPath']}/assets/images/currencies/${this.bet.CurrencyId}.svg`;
  }

  close()
  {
    this.#dialogRef.close();
  }

  copyAddress(value:number)
  {
    navigator.clipboard.writeText(value.toString());
  }

  shareAddress()
  {
    const url = new URL(window.location.href);
    url.searchParams.append('bet', this.bet.BetId.toString());
    navigator.clipboard.writeText(url.toString());
  }

  openGame()
  {
    this.#router.navigate([`/casino/all-games/${this.bet.ProductId}/demo`]);
    this.close();
  }

}
