import {Component, Injector, Input} from '@angular/core';
import {BaseProgressBar} from "../../../../../../../@theme/fragments/casino/progress-bar/base-progress-bar";
import {Fragment} from "../../../../../../../@core/models";
import {FragmentSource, FragmentType} from "../../../../../../../@core/enums";
import {getFragmentsByType} from "../../../../../../../@core/utils";

@Component({
    selector: 'mobile-progress-bar',
    templateUrl: './mobile-progress-bar.component.html',
    styleUrls: ['./mobile-progress-bar.component.scss']
})
export class MobileProgressBarComponent extends BaseProgressBar
{
    @Input('position') position:string;
    fragments: {[key: string]: Fragment};

    progressBarStates:number[] = [0, 7, 27, 34, 68, 80, 95, 100];

    constructor(protected injector:Injector,
               )
    {
        super(injector);
    }

    ngOnInit()
    {
        super.ngOnInit();
        const block = this.configService.defaultOptions[FragmentSource.Mobile];
        this.fragments = getFragmentsByType(block, this.position, FragmentType.ProgressBar);
    }
}
