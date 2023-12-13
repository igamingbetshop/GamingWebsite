import {Directive,  Injector} from '@angular/core';
import {SimpleModalService} from 'ngx-simple-modal';
import {AppCommonMessageModalComponent} from '../../common/app-common-message-modal/app-common-message-modal.component';
import {BaseTicketsComponent} from '../../../../../../@theme/components/common/base-tickets/base-tickets.component';

@Directive()
export class AppCommonTicketsComponent extends BaseTicketsComponent {


  public newTicket = false;

  public simpleModalService: SimpleModalService;

  constructor(public injector: Injector) {
    super(injector);
    this.simpleModalService = injector.get(SimpleModalService);
  }

  ngOnInit()
  {
    super.ngOnInit();
  }
  openNewTicketContent() {
    this.newTicket = true;
    this.sendMessageForm.reset();
  }

  closeNewTicketContent() {
    this.newTicket = false;
  }

  public deleteTicket(item) {
    this.simpleModalService.addModal(AppCommonMessageModalComponent, {
      title: 'Delete-ticket',
      data: item,
      message: true
    });
  }


  public closeTicket(item)
  {
    this.simpleModalService.addModal(AppCommonMessageModalComponent, {
      title: 'close-ticket',
      data: item,
      message: true
    });
  }

}
