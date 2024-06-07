import {Component, OnInit} from '@angular/core';
import {BaseWinnersWidgets} from "../../../../../../../@theme/components/winners-widget/base-winners-widgets";

@Component({
    selector: 'winners-widget',
    templateUrl: './winners-widget.component.html',
    styleUrls: ['./winners-widget.component.scss']
})
export class WinnersWidgetComponent extends BaseWinnersWidgets implements OnInit
{

}
