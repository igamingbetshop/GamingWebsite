import {Component, Injector} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {
  AppCommonTransactionsComponent
} from "../../../../common/app-common-transactions/app-common-transactions.component";

@Component({
  selector: 'app-agents-transactions',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, FormsModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './account-page-type2-agents-transactions.component.html',
  styleUrl: './account-page-type2-agents-transactions.component.scss'
})
export class AccountPageType2AgentsTransactionsComponent extends AppCommonTransactionsComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

}
