import {NgModule} from "@angular/core";
import {TimeComponent} from "./time.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations:[TimeComponent],
  imports:[
    CommonModule
  ]
})

export class TimeModule
{
  getComponent()
  {
    return TimeComponent;
  }
}