import {Component, Injector} from '@angular/core';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {BaseWithdrawComponent} from "../../../../../../../../@theme/components/common/base-withdraw/base-withdraw.component";

@Component({
    selector: 'app-withdraw-block-default',
    templateUrl: './withdraw-block-default.component.html'
})
export class WithdrawBlockDefaultComponent extends BaseWithdrawComponent {
    public faCaretDown = faCaretDown;
    constructor(public injector: Injector) {
        super(injector);
    }

    ngOnInit()
    {
        super.ngOnInit();
        this.openFirstItemByDefault = false;
    }
}
