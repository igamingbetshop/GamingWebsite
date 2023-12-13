import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FromNowPipe, GroupByPipe} from './pipes';
import {DynamicTabsDirective} from './directives/dynamic-tabs.directive';
import {ClickOutsideDirective} from "./directives/click-outside";
import {DateLongTypePipe} from "./pipes/date-type.pipe";
import {TranslateModule} from "@ngx-translate/core";
import {RemoveAnchorPipe} from "./pipes/remove-anchor.pipe";
import {OnlyEnglish} from "./directives/only-english";
import {FontAwesomeIcons} from "./font-awsome/font-awesome-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SanitizerModule} from "./pipes/sanitizer/sanitizer.module";
import {BaseInfoBlockModule} from "./components/modals/base-info-block/base-info-block.module";
import {ConfirmWindowModule} from "./components/common/confirm-window/confirm-window.module";
import {BaseQuestionTabModule} from "./components/modals/base-question-tab/base-question-tab.module";
import {RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module} from "ng-recaptcha";
import {ConfigService} from "../@core/services";
import {BaseFrameModule} from "./components/modals/base-frame/base-frame.module";
import {OnlyNumberDirectiveModule} from "./directives/only-number/only-number.directive.module";
import {LimitNotificationsModule} from "./components/modals/limit-notifications/limit-notifications.module";
import {getRecaptchaKey} from "@core/utils";
import {GoogleAuthenticateModule} from "./components/modals/google-authenticate/google-authenticate.module";


const BASE_MODULES = [
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
    FontAwesomeIcons,
    SanitizerModule,
    RecaptchaV3Module,
    OnlyNumberDirectiveModule
];

const PIPES = [FromNowPipe, DateLongTypePipe, GroupByPipe, RemoveAnchorPipe];

const DIRECTIVES = [DynamicTabsDirective, ClickOutsideDirective, OnlyEnglish];
/*LAZY LOAD MODALS MODULES REMOVE AFTER IVY*/
const LAZY_LOAD_MODAL_MODULES =  [
    BaseInfoBlockModule,
    ConfirmWindowModule,
    BaseQuestionTabModule,
    BaseFrameModule,
    LimitNotificationsModule,
    GoogleAuthenticateModule
];

@NgModule({
    imports: [...BASE_MODULES, ...LAZY_LOAD_MODAL_MODULES],
    exports: [...BASE_MODULES, ...PIPES, ...DIRECTIVES],
    declarations: [
        ...PIPES,
        ...DIRECTIVES
    ],


    providers:[
        { provide: RECAPTCHA_V3_SITE_KEY, useFactory: getRecaptchaKey, deps: [ConfigService]},
    ]
})
export class ThemeModule
{

}
