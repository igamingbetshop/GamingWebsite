import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from "../../../../../@theme/theme.module";
import {MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material/dialog";

@NgModule({
  imports: [
    ThemeModule
  ],
  exports: [
    CommonModule,
    ThemeModule
  ],

  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ]
})
export class DesktopMobileCommonModule
{

}
