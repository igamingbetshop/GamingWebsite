import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '@core/services';
import { UserLogined } from '@core/services/app/userLogined.service';
import { DropdownDirectiveModule } from '../../../../../../@theme/directives/dropdown/dropdown-directive.module';
import { ToNumberPipeModule } from '../../../../../../@theme/pipes/to-number/to-number-pipe.module';
import {
  AccountPageType1StatementComponent
} from '../account-pages-module-type1/statement/account-page-type1-statement.component';

@Component({
  selector: 'account-statement',
  standalone: true,
  imports: [CommonModule, TranslateModule, ToNumberPipeModule, RouterLink, DropdownDirectiveModule, AccountPageType1StatementComponent],
  templateUrl: './account-statement.component.html',
  styleUrl: './account-statement.component.scss'
})
export class AccountStatementComponent implements OnInit {
  @Input() menuItem: any;
  @Input() balance: any;
  public currencySymbol: any;
  public currencyId: any;
  public userData: any;
  public isLogin: boolean;

  constructor(public router: Router, public localStorageService: LocalStorageService,
              public userLogined: UserLogined) {
    this.userData = this.localStorageService.get('user');
    this.currencySymbol = this.userData ? this.userData.CurrencySymbol : '';
    this.currencyId = this.userData ? this.userData.CurrencyId : '';
    this.isLogin = this.userLogined.isAuthenticated;
  }

  ngOnInit() {
  }

  navigateByHref(item, event) {
    if (item.Href) {
      this.router.navigate(['/' + item.Href]);
    }

  }

}
