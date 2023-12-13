import {Component, Injector, OnInit} from '@angular/core';
import {BaseMobileOpenGameComponent} from "../../../../../../@theme/components/common/base-mobile-open-game/base-mobile-open-game.component";

@Component({
    selector: 'mobile-open-games',
    templateUrl: 'mobile-open-games.component.html',
    styleUrls: ['./mobile-open-games.component.scss']
})
export class MobileOpenGamesComponent extends BaseMobileOpenGameComponent implements OnInit{

    constructor(public injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

}