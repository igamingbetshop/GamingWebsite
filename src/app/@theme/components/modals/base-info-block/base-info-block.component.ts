import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";



@Component({
    selector: 'app-base-info-block',
    templateUrl: './base-info-block.component.html',
    styleUrls: ['./base-info-block.component.scss']
})
export class BaseInfoBlockComponent implements OnInit {

    data:any = inject(MAT_DIALOG_DATA);
    dialogRef = inject(MatDialogRef<BaseInfoBlockComponent>);

    ngOnInit() {}

    confirm()
    {
        this.dialogRef.close(true);
    }
    close()
    {
        this.dialogRef.close();
    }

}
