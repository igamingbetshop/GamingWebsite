import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {HomeComponent} from "./home.component";
import {FragmentBannersModule} from "../fragments/banners/fragment-banners.module";
import {CharactersModule} from "../fragments/characters/characters.module";
import {RouterModule, Routes} from "@angular/router";
import {ImageBarModule} from "../fragments/image-bar/image-bar.module";
import {SanitizerModule} from "../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {FragmentCharactersModule} from "../fragments/fragment-characters/fragment-characters.module";
import {CasinoSearchFragmentComponent} from "../../common/fragments/search/casino-search-fragment.component";

const routes:Routes = [{
  path: '',
  component:HomeComponent
}];
@NgModule({
  declarations:[HomeComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FragmentBannersModule,
        ImageBarModule,
        CharactersModule,
        SanitizerModule,
        CasinoSearchFragmentComponent,
        RouterModule.forChild(routes),
        FragmentCharactersModule
    ],
  exports:[
    RouterModule
  ]
})

export class HomeModule
{

}
