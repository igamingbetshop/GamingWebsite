import {Component, Injector} from '@angular/core';
import {AppCommonTicketsComponent} from "../../../common/app-common-tickets/app-common-tickets.component";
import {AccountPageType2OpenTicketsComponent} from "../open-tickets/account-page-type2-open-tickets.component";


@Component({
  selector: 'app-account-page-type2-tickets',
  templateUrl: './account-page-type2-tickets.component.html'
})
export class AccountPageType2TicketsComponent extends AppCommonTicketsComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

  public openNewTicket()
  {
    this.dialog.open(AccountPageType2OpenTicketsComponent, {data:{ title: 'Open ticket',
        message: true}});
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
