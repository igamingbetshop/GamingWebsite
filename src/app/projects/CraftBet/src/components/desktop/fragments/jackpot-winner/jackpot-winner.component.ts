import {Component, inject, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'jackpot-winner',
    templateUrl: './jackpot-winner.component.html',
    styleUrls: ['./jackpot-winner.component.scss']
})
export class JackpotWinnerComponent  implements OnInit{
    dialogRef = inject(MatDialogRef<JackpotWinnerComponent>);

    ngOnInit()
    {

    }

    close()
    {
        this.dialogRef.close();
    }
}

