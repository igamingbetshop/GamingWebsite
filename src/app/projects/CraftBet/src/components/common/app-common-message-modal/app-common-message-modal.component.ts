import {Component, inject, OnInit} from '@angular/core';
import {DefaultService} from '../../../../../../@core/services';
import {TicketsService} from "@core/services/api/tickets.service";
import {Subscription} from "rxjs";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-app-common-message-modal',
  templateUrl: './app-common-message-modal.component.html',
  styleUrls: ['./app-common-message-modal.component.scss']
})
export class AppCommonMessageModalComponent implements OnInit {

  public showMessage: boolean;
  public closeMessage: boolean;
  public faTimes = faTimes;
  protected subscriptions: Subscription[] = [];
  data:any = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<AppCommonMessageModalComponent>);
  defaultService = inject(DefaultService);
  ticketsService = inject(TicketsService);

  ngOnInit() {
    this.subscriptions.push(this.ticketsService.notifyDeleteTicket.subscribe(() => {
        this.close();
    }));

    this.subscriptions.push(this.ticketsService.notifyGetCloseTicketMessages.subscribe(() => {
      this.close();
    }));

    if (this.data.title === 'Delete-ticket') {
      this.showMessage = true;
      this.closeMessage = false;
    } else if (this.data.title === 'close-ticket') {
      this.showMessage = false;
      this.closeMessage = true;
    }
  }

  public saveChange() {
    if (this.data.title === 'Delete-ticket') {
      this.ticketsService.DeleteTicket(this.data.ticket);
    } else {
      this.ticketsService.CloseTicket(this.data.ticket);
    }
  }

  close()
  {
    this.dialogRef.close();
  }

}
