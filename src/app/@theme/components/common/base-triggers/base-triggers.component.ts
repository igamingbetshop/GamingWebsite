import {Component, inject, OnInit} from "@angular/core";
import {Bonus, Trigger} from "@core/models";
import {BonusesService} from "@core/services/api/bonuses.service";
import {take} from "rxjs/operators";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {FontAwesomeIcons} from "../../../font-awsome/font-awesome-icons";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'triggers',
    templateUrl: './base-trigger.component.html',
    standalone:true,
    imports:[
        TranslateModule,
        FontAwesomeIcons,
        CommonModule
    ]
})
export class BaseTriggersComponent implements OnInit {
    triggers: Array<Trigger> = [];
    bonusInfo: any = {};
    isVisible: boolean = false;
    data:any = inject(MAT_DIALOG_DATA);
    dialogRef = inject(MatDialogRef<BaseTriggersComponent>);
    private bonusesService = inject(BonusesService);

    ngOnInit() {
        this.getTriggers(this.data.bonus);
    }

    getTriggers(bonus:Bonus) {
        this.bonusesService.getTriggers(bonus).pipe(take(1)).subscribe(data => {
            // this.triggers = data.Triggers;
            this.triggers = data.Triggers.map(trigger => {
                return {
                    ...trigger,
                    RoundedMinAmount: Math.ceil(trigger.MinAmount * 10) / 10
                };
            });
            this.bonusInfo = data.Bonus;
            this.isVisible = true;
        });
    }

    close()
    {
        this.dialogRef.close();
    }
}
