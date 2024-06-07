import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { VerifyCodeComponent } from './verify-code.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {DefaultImageFallBackDirective} from "../../../directives/default-image-fall-back.directive";

@NgModule({
  declarations: [VerifyCodeComponent],
    imports: [
        CommonModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        FontAwesomeModule,
        DefaultImageFallBackDirective
    ],
  exports: [
      VerifyCodeComponent
  ]
})
export class VerifyCodeModule
{
  getComponent()
  {
    return VerifyCodeComponent;
  }
}
