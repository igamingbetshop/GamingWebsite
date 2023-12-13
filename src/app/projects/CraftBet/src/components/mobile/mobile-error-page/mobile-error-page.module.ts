import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MobileErrorPageComponent} from "./mobile-error-page.component";
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
  {
    path:"",
    component:MobileErrorPageComponent,
  }
];
@NgModule({
  declarations:[MobileErrorPageComponent],
  imports:[
    CommonModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ]
})

export class MobileErrorPageModule
{

}