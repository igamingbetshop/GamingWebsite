import {Component, Injector} from '@angular/core';
import {AppCommonOpenTicketComponent} from "../../../common/app-common-open-ticket/app-common-open-ticket.component";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-mobile-account-page-type2-open-tickets',
  templateUrl: './mobile-account-page-type2-open-tickets.component.html'
})
export class MobileAccountPageType2OpenTicketsComponent extends AppCommonOpenTicketComponent {

  public faTimes = faTimes;
  constructor(public injector: Injector) {
    super(injector);
  }

}
