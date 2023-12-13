import {NgModule} from "@angular/core";
import {MobileFullWindowComponent} from "./mobile-full-window.component";


@NgModule({
  declarations:[MobileFullWindowComponent],
  exports:[MobileFullWindowComponent]
})

export class MobileFullWindowModule
{
  getComponent()
  {
    return MobileFullWindowComponent;
  }
}