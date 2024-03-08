import { Component, Injector } from '@angular/core';
import { AppCommonOpenTicketComponent } from '../../../common/app-common-open-ticket/app-common-open-ticket.component';

@Component({
  selector: 'app-mobile-account-page-type3-open-tickets',
  templateUrl: './mobile-account-page-type3-open-tickets.component.html',
  styleUrls: ['./mobile-account-page-type3-open-tickets.component.scss']
})
export class MobileAccountPageType3OpenTicketsComponent extends AppCommonOpenTicketComponent {

  constructor(public injector: Injector) {
    super(injector);
  }

}
