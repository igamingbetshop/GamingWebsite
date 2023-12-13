import {Component, OnInit, Input} from '@angular/core';
import {SaveData} from "@core/services";
import {PaymentControllerService} from "../../../../../../@core/services/app/paymentController.services";

@Component({
    selector: 'app-common-bonuses',
    templateUrl: './app-common-bonuses.component.html',
    styleUrls: ['./app-common-bonuses.component.scss']
})
export class AppCommonBonusesComponent implements OnInit {

    @Input() bonusesList: Array<any> = [];

    constructor(public saveData: SaveData, public paymentControllerService: PaymentControllerService) {
    }
    public opened = false;
    public currentItem;

    ngOnInit() {}


    radioChecked(id, i) {
        let value = 0;
        this.bonusesList.forEach(item => {
            if ((item.Id == id) && !item.selected) {
                item.selected = true;
                value = item['Id'];
                this.paymentControllerService.bonusRefused = false;
            } else {
                item.selected = false;
            }
        });
        this.saveData.changeBonus.next(value);
    }
    openPopup(item) {
        this.currentItem = item;
        this.opened = true;
        console.log(this.bonusesList);
    }
    closePopup() {
        this.opened = !this.opened;
    }

}
