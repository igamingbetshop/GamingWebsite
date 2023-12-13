import {ComponentFactory, ComponentFactoryResolver, NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {SanitizerModule} from "../../../pipes/sanitizer/sanitizer.module";
import {BaseFrameComponent} from "./base-frame.component";

@NgModule({
  declarations:[BaseFrameComponent],
  exports:[BaseFrameComponent],
  entryComponents:[BaseFrameComponent],
  imports:[
    CommonModule,
    SanitizerModule,
    TranslateModule
  ]
})

export class BaseFrameModule
{
  static entry = BaseFrameComponent;

  constructor(private componentFactoryResolver: ComponentFactoryResolver)
  {

  }
  public resolveComponent(): ComponentFactory<BaseFrameComponent>
  {
    return this.componentFactoryResolver.resolveComponentFactory(BaseFrameComponent);
  }
}