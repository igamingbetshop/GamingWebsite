import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LimitNotificationsComponent } from './limit-notifications.component';

@NgModule({
    declarations:[LimitNotificationsComponent],
    exports:[LimitNotificationsComponent],
    entryComponents:[LimitNotificationsComponent],
    imports:[
        CommonModule,
        TranslateModule,
        FontAwesomeModule
    ]
})

export class LimitNotificationsModule {
    
}
