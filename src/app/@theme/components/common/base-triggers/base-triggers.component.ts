import {Component, Injectable, OnInit} from "@angular/core";
import {Bonus, Trigger} from "@core/models";
import {BonusesService} from "@core/services/api/bonuses.service";
import {take} from "rxjs/operators";
import {SimpleModalComponent} from "ngx-simple-modal";
import {ConfirmModel} from "@core/interfaces";

@Component({
    selector: 'triggers',
    templateUrl: './base-trigger.component.html'
})
export class BaseTriggersComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
    public title: string;
    public data: any;
    triggers: Array<Trigger> = [];
    bonusInfo: any = {};

    constructor(private bonusesService: BonusesService) {
        super();
    }

    ngOnInit() {
        this.getTriggers(this.data)
    }

    getTriggers(bonus:Bonus) {
        this.bonusesService.getTriggers(bonus).pipe(take(1)).subscribe(data => {
            this.triggers = data.Triggers;
            this.bonusInfo = data.Bonus;
        });
    }
}
