import {LoaderComponent} from "./loader.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations:[LoaderComponent],
  exports:[LoaderComponent],
  imports:[
      CommonModule
  ]
})

export class LoaderModule
{

}
