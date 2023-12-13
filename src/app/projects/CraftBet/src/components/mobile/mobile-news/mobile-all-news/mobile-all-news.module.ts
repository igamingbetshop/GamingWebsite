import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {MobileAllNewsComponent} from "./mobile-all-news.component";
import {NgxPaginationModule} from "ngx-pagination";

const routes: Routes = [
  {
    path:"",
    component:MobileAllNewsComponent,
  }
];
@NgModule({
  declarations:[MobileAllNewsComponent],
  imports:[
    CommonModule,
    TranslateModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
  ]
})

export class MobileAllNewsModule
{

}