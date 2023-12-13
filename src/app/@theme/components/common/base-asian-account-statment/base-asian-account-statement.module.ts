import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {BaseAsianAccountStatmentComponent} from "./base-asian-account-statment.component";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations:[BaseAsianAccountStatmentComponent],
    imports: [
        CommonModule,
        TranslateModule,
    ]
})

export class BaseAsianAccountStatementModule
{
    getComponent()
    {
        return BaseAsianAccountStatmentComponent;
    }
}