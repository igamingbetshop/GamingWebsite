import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {MobileCurrentNewsComponent} from "./mobile-current-news.component";

const routes: Routes = [
  {
    path:"",
    component:MobileCurrentNewsComponent
  }
];
@NgModule({
  declarations:[MobileCurrentNewsComponent],
  imports:[
    CommonModule,
    TranslateModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
  ]
})

export class MobileCurrentNewsModule
{

}