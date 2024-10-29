import {Component, Injector, Input} from '@angular/core';
import {BaseProgressBar} from "../../../../../../../@theme/fragments/casino/progress-bar/base-progress-bar";
import {Fragment} from "../../../../../../../@core/models";
import {FragmentSource, FragmentType} from "../../../../../../../@core/enums";
import {getFragmentsByType} from "../../../../../../../@core/utils";

@Component({
    selector: 'progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent extends BaseProgressBar
{
    @Input('position') position:string;
    fragments: {[key: string]: Fragment};

    constructor(protected injector:Injector,

               )
    {
        super(injector);
    }

    ngOnInit()
    {
        super.ngOnInit();
        const block = this.configService.defaultOptions[FragmentSource.Web];
        this.fragments = getFragmentsByType(block, this.position, FragmentType.ProgressBar, this.userLogged);

    }
}
