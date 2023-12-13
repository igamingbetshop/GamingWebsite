import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultSimpleModalOptionConfig, defaultSimpleModalOptions, SimpleModalModule} from 'ngx-simple-modal';
import {ThemeModule} from "../../../../../@theme/theme.module";

@NgModule({
  imports: [
    SimpleModalModule.forRoot({container: 'modal-container'}, { ...defaultSimpleModalOptions}),
    ThemeModule
  ],
  exports: [
    CommonModule,
    ThemeModule
  ],

  providers: [
    {
      provide: DefaultSimpleModalOptionConfig,
      useValue: {...defaultSimpleModalOptions, ...{ closeOnEscape: true, closeOnClickOutside: true, animated: false }}
    }
  ]
})
export class DesktopMobileCommonModule
{

}
