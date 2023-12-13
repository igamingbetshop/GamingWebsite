import {Component, Injector} from '@angular/core';
import {AppCommonTicketsComponent} from "../../../common/app-common-tickets/app-common-tickets.component";
import {AccountPageType1OpenTicketsComponent} from "../open-tickets/account-page-type1-open-tickets.component";

@Component({
  selector: 'app-account-page-type1-tickets',
  templateUrl: './account-page-type1-tickets.component.html',
})
export class AccountPageType1TicketsComponent extends AppCommonTicketsComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

  public openNewTicket() {
    this.simpleModalService.addModal(AccountPageType1OpenTicketsComponent, {
      title: 'Open ticket',
      message: true
    }).subscribe(() => {
    });
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  trackByMethod(index, item)
  {
    return index;
  }

}
