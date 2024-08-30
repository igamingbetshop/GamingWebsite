import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-base-question-tab',
  templateUrl: './base-question-tab.component.html',
  styleUrls: ['./base-question-tab.component.scss']
})
export class BaseQuestionTabComponent {

  data:any = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<BaseQuestionTabComponent>);

  close()
  {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close(true);
  }

}
