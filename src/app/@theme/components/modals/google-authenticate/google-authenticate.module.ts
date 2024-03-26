import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleAuthenticateComponent } from './google-authenticate.component';

@NgModule({
    declarations: [GoogleAuthenticateComponent],
    exports: [GoogleAuthenticateComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class GoogleAuthenticateModule {
    getComponent() {
        return GoogleAuthenticateComponent;
    }
}
