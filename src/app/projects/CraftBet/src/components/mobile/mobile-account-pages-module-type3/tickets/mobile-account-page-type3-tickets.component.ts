import { Component, Injector } from '@angular/core';
import { AppCommonTicketsComponent } from '../../../common/app-common-tickets/app-common-tickets.component';
import { MobileAccountPageType3OpenTicketsComponent } from '../open-tickets/mobile-account-page-type3-open-tickets.component';

@Component({
  selector: 'app-mobile-account-page-type3-tickets',
  templateUrl: './mobile-account-page-type3-tickets.component.html',
  styleUrls: ['./mobile-account-page-type3-tickets.component.scss']
})
export class MobileAccountPageType3TicketsComponent extends AppCommonTicketsComponent {
  isMessageBlockOpen = false;

  constructor(public injector: Injector) {
    super(injector);
    window.scroll(0,0);
  }

  //
  // ngOnInit(): void {
  //   super.ngOnInit();
  // }
  //
  // ngOnDestroy() {
  //   super.ngOnDestroy();
  // }

  trackByMethod(index, item) {
    return index;
  }

  public openNewTicket() {
    this.sendMessageForm.reset();
    this.simpleModalService.addModal(MobileAccountPageType3OpenTicketsComponent, {
      title: 'Open ticket',
      message: true
    }).subscribe(() => {
    });
  }

  public openMessage(ticket, i) {
    this.messagesFetched = false;
    this.expandedIndex = i;
    this.isMessageBlockOpen = true;
    this.ticketsService.GetTicketMessages(ticket);
    this.saveData.openTicket.next(ticket);
  }

  public closeMessage() {
    this.expandedIndex = -1;
    this.isMessageBlockOpen = false;
    this.sendMessageForm.reset();
  }

}
