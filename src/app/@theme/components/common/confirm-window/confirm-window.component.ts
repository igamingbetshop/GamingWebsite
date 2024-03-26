import {Component, inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'confirm-window',
  templateUrl: 'confirm-window.component.html',
})

export class ConfirmWindowComponent
{
  data:any = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ConfirmWindowComponent>);
  constructor()
  {

  }

  confirm()
  {
    this.dialogRef.close(true);
  }
  cancel()
  {
    this.dialogRef.close();
  }
}
