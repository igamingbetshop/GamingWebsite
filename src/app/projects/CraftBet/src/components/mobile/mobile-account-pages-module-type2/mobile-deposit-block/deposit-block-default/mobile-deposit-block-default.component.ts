import {Component, Injector} from '@angular/core';
import {BaseDepositComponent} from "../../../../../../../../@theme/components/common/base-deposit/base-deposit.component";
import {LayoutService} from "@core/services/app/layout.service";
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';



@Component({
    selector: 'app-mobile-deposit-block-default',
    templateUrl: './mobile-deposit-block-default.component.html'
})
export class MobileDepositBlockDefaultComponent extends BaseDepositComponent {
    public faCaretDown = faCaretDown;
    constructor(public injector: Injector, public layoutService: LayoutService) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

}
