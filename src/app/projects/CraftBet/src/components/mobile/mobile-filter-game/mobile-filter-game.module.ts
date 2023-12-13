import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {BannersModule} from "../../common/common-banner/banners.module";
import {MobileFilterGameComponent} from "./mobile-filter-game.component";

const routes: Routes = [
  {
    path:"",
    component:MobileFilterGameComponent,
  }
];
@NgModule({
  declarations:[MobileFilterGameComponent],
  imports:[
    CommonModule,
    TranslateModule,
    BannersModule,
    RouterModule.forChild(routes)
  ]
})

export class MobileFilterGameModule
{

}