import {Component, inject, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-logout-popup',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './logout-popup.component.html',
    styleUrl: './logout-popup.component.scss'
})
export class LogoutPopupComponent implements OnInit {
    dialogRef = inject(MatDialogRef<LogoutPopupComponent>, {optional:true});
    constructor() {
    }

    ngOnInit() {

    }

    close()
    {
        this.dialogRef.close();
    }

    confirm() {
        this.dialogRef.close(true);
    }
}
