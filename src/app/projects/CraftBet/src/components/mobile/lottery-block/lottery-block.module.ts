import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LotteryBlockComponent} from "./lottery-block.component";
import {MobileFullWindowModule} from "../mobile-full-window/mobile-full-window.module";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {
    path:"",
    component:LotteryBlockComponent,
  }
];
@NgModule({
  declarations:[LotteryBlockComponent],
  imports:[
    CommonModule,
    MobileFullWindowModule,
    RouterModule.forChild(routes)
  ]
})

export class LotteryBlockModule
{

}