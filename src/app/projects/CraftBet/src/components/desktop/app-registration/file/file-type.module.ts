import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FileTypeComponent} from "./file-type.component";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        CommonModule,
        FormsModule,
        RouterModule
    ],
  exports: [
    FileTypeComponent
  ],
  declarations: [
    FileTypeComponent
  ]
})
export class FileTypeModule
{

}