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
  selector: 'app-clients-transactions',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, FormsModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './mobile-account-page-type1-clients-transactions.component.html',
  styleUrl: './mobile-account-page-type1-clients-transactions.component.scss'
})
export class MobileAccountPageType1ClientsTransactionsComponent extends AppCommonTransactionsComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

}
