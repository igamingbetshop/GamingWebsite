import {Component, Injector, Input} from '@angular/core';
import {BaseSettingsComponent} from "../common/base-settings/base-settings.component";
import { Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-global-change-password',
    templateUrl: './global-change-password.component.html',
    styleUrls: ['./global-change-password.component.scss']
})

export class GlobalChangePasswordComponent extends BaseSettingsComponent {

    @Input() className: string = '';
    @Input() showPlaceHolder: boolean = false;
    @Input() showTogglePassTypeCheckbox: boolean = false;
    @Input() showIcons: boolean = false;


    @Output() requestData = new EventEmitter<string>();

    public changePasswordType: boolean = false;

    constructor(public injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    public changePassType() {
        this.changePasswordType = !this.changePasswordType;
    }

}
