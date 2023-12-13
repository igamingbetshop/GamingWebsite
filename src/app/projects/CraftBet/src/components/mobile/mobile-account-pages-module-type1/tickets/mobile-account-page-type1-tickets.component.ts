import {Component, Injector} from '@angular/core';
import {AppCommonTicketsComponent} from "../../../common/app-common-tickets/app-common-tickets.component";
import {LayoutService} from "@core/services/app/layout.service";
import {MobileAccountPageType1OpenTicketsComponent} from "../open-tickets/mobile-account-page-type1-open-tickets.component";

@Component({
  selector: 'app-mobile-account-page-type1-tickets',
  templateUrl: './mobile-account-page-type1-tickets.component.html',
})
export class MobileAccountPageType1TicketsComponent extends AppCommonTicketsComponent {

  constructor(public injector: Injector, public layoutService: LayoutService) {
    super(injector);
  }


  public openNewTicket() {
    this.sendMessageForm.reset();
    this.simpleModalService.addModal(MobileAccountPageType1OpenTicketsComponent, {
      title: 'Open ticket',
      message: true
    }).subscribe(() => {
    });
  }

}
