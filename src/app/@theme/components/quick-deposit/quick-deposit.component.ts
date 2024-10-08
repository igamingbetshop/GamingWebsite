import {ChangeDetectionStrategy, Component, HostBinding, inject, input, OnInit, signal} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {BaseApiService} from "../../../@core/services/api/base-api.service";
import {ConfigService} from "@core/services";
import {Router} from "@angular/router";
import {FragmentData} from "@core/models";

export type Nominal = {Amount:number, CurrencyId:string};
@Component({
  selector: 'quick-deposit',
  templateUrl: './quick-deposit.component.html',
  styleUrls: ['./quick-deposit.component.scss'],
  imports: [TranslateModule],
  standalone:true,
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class QuickDepositComponent implements OnInit{

  fragmentConfig = input<FragmentData>();
  @HostBinding('style') style = {};
  nominals = signal<Nominal[]>([{Amount:20, CurrencyId:'EUR'}, {Amount:50, CurrencyId:'EUR'}, {Amount:100, CurrencyId:'EUR'}, {Amount:200, CurrencyId:'EUR'}])
  selectedAmount = signal<number>(this.nominals()[1].Amount);
  #apiService = inject(BaseApiService);
  #config = inject(ConfigService);
  #router = inject(Router);
  currencyId = this.#config.defaultOptions.CurrencySymbol;

  ngOnInit()
  {
    this.#getNominals();
    this.#setCurrentNominal();
    this.style = this.fragmentConfig().Config?.style || {};
  }

  selectNominal(nominal:Nominal)
  {
    this.selectedAmount.set(nominal.Amount);
  }

  deposit()
  {
    localStorage.setItem("quickDepositAmount", this.selectedAmount().toString());
    const accountTemplateType = this.#config.defaultOptions.AccountTemplateType;
    const path = `/user/${accountTemplateType || '1'}/deposit`;
    this.#router.navigate([path]);
  }

  updateInput(v: string) {
    this.selectedAmount.set(+v);
  }

  #setCurrentNominal()
  {
    const savedAmount = localStorage.getItem("quickDepositAmount");
    if(savedAmount)
    {
      const nominal  =  this.nominals().find(n => n.Amount.toString() === savedAmount);
      if(nominal)
        this.selectedAmount.set(nominal.Amount);
    }
  }

  #getNominals()
  {
    /*this.#apiService.apiGet("GetProfilePicture").subscribe(data => {

    });*/
  }
}
