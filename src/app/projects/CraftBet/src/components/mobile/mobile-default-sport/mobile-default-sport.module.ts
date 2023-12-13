import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MobileDefaultSportComponent} from "./mobile-default-sport.component";

const routes: Routes = [
  {
    path:"",
    component:MobileDefaultSportComponent,
  }
];
@NgModule({
  declarations:[
    MobileDefaultSportComponent,
    ],
  imports:[
    CommonModule,
    RouterModule.forChild(routes)
  ],
})

export class MobileDefaultSportModule
{

}