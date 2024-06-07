import {Component} from '@angular/core';
import {BaseBetsWidgets} from "../../../../../../../@theme/components/bets-widget/base-bets-widgets";

@Component({
    selector: 'bets-widget',
    templateUrl: './bets-widget.component.html',
    styleUrls: ['./bets-widget.component.scss']
})
export class BetsWidgetComponent extends BaseBetsWidgets
{
   ngOnInit() {
       super.ngOnInit();
   }


}
