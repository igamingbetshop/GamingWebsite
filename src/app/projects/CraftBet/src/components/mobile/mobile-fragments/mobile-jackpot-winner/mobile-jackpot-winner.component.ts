import {Component, inject, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'mobile-jackpot-winner',
    templateUrl: './mobile-jackpot-winner.component.html',
    styleUrls: ['./mobile-jackpot-winner.component.scss']
})
export class MobileJackpotWinnerComponent  implements OnInit{
    dialogRef = inject(MatDialogRef<MobileJackpotWinnerComponent>);

    ngOnInit()
    {

    }

    close()
    {
        this.dialogRef.close();
    }
}

