import {Directive, inject } from '@angular/core';
import {AppCommonMessageModalComponent} from '../../common/app-common-message-modal/app-common-message-modal.component';
import {BaseTicketsComponent} from '../../../../../../@theme/components/common/base-tickets/base-tickets.component';
import {MatDialog} from "@angular/material/dialog";

@Directive()
export class AppCommonTicketsComponent extends BaseTicketsComponent {

  newTicket = false;
  dialog = inject(MatDialog);

  openNewTicketContent() {
    this.newTicket = true;
    this.sendMessageForm.reset();
  }

  closeNewTicketContent() {
    this.newTicket = false;
  }

  public deleteTicket(item:any)
  {
    this.dialog.open(AppCommonMessageModalComponent, {data:{title: 'Delete-ticket',message: true, ticket:item}});
  }


  public closeTicket(item:any)
  {
    this.dialog.open(AppCommonMessageModalComponent, {data:{title: 'close-ticket',message: true, ticket:item}});
  }

}
