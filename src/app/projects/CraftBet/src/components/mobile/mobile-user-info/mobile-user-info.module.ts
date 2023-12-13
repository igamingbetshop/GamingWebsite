import {ComponentFactory, ComponentFactoryResolver, NgModule} from "@angular/core";
import {MobileUserInfoComponent} from "./mobile-user-info.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {SanitizerModule} from "../../../../../../@theme/pipes/sanitizer/sanitizer.module";


@NgModule({
  declarations:[MobileUserInfoComponent],
  entryComponents:[MobileUserInfoComponent],
  exports:[
    MobileUserInfoComponent
  ],
  imports:[
      CommonModule,
      FontAwesomeModule,
      TranslateModule,
      SanitizerModule
  ]

})

export class MobileUserInfoModule
{
  constructor(private componentFactoryResolver: ComponentFactoryResolver)
  {

  }
  public resolveComponent(): ComponentFactory<MobileUserInfoComponent>
  {
    return this.componentFactoryResolver.resolveComponentFactory(MobileUserInfoComponent);
  }
}