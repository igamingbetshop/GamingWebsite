import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalLogoutModule } from '../global-logout/global-logout.module';
import { SessionTimerComponent } from './session-timer.component';

@NgModule({
    declarations: [SessionTimerComponent],
    exports: [SessionTimerComponent],
    imports: [
        CommonModule,
        GlobalLogoutModule
    ]
})

export class SessionTimerModule {

}
