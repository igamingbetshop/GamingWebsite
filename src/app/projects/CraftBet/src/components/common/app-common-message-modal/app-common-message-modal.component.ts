import {Component, OnInit} from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';
import {DefaultService} from '../../../../../../@core/services';
import {TicketsService} from "@core/services/api/tickets.service";
import {Subscription} from "rxjs";
import {ConfirmModel} from "@core/interfaces";
import {faTimes} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-app-common-message-modal',
  templateUrl: './app-common-message-modal.component.html',
  styleUrls: ['./app-common-message-modal.component.scss']
})
export class AppCommonMessageModalComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {

  public title: string;
  public message: boolean;
  public data: any;
  public showMessage: boolean;
  public closeMessage: boolean;
  public faTimes = faTimes;
  protected subscriptions: Subscription[] = [];

  constructor(public defaultService: DefaultService,
              public ticketsService: TicketsService) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(this.ticketsService.notifyDeleteTicket.subscribe(() => {
        this.close();
    }));

    this.subscriptions.push(this.ticketsService.notifyGetCloseTicketMessages.subscribe(() => {
      this.close();
    }));

    if (this.title === 'Delete-ticket') {
      this.showMessage = true;
      this.closeMessage = false;
    } else if (this.title === 'close-ticket') {
      this.showMessage = false;
      this.closeMessage = true;
    }
  }

  public saveChange() {
    if (this.title === 'Delete-ticket') {
      this.ticketsService.DeleteTicket(this.data);
    } else {
      this.ticketsService.CloseTicket(this.data);
    }
  }

}
