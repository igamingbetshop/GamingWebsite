import {Component, inject} from '@angular/core';
import { SignalRService } from '../../../../@core/services/soket/signal-r.service';
import {TranslateService} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-limit-notifications',
  templateUrl: './limit-notifications.component.html',
  styleUrls: ['./limit-notifications.component.scss']
})
export class LimitNotificationsComponent  {

  data:any = inject(MAT_DIALOG_DATA);
  signalRService = inject(SignalRService);
  translate = inject(TranslateService);
  dialogRef = inject(MatDialogRef<LimitNotificationsComponent>);
  close()
  {
    this.dialogRef.close();
  }
}
