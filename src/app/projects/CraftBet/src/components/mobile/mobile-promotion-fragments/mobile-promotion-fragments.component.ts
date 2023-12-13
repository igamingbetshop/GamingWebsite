import {Component, Input} from '@angular/core';
import {BasePromotionFragments} from "../../../../../../@theme/components/common/promotions/base-promotion-fragments";
import {PromotionFragment} from "../../../../../../@core/models";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {RouterModule} from "@angular/router";
import {MobilePromotionFragmentComponent} from "../mobile-promotion/mobile-promotion-fragment.component";
import {SanitizerModule} from "../../../../../../@theme/pipes/sanitizer/sanitizer.module";

@Component({
  selector: 'app-mobile-promotion-fragments',
  templateUrl: './mobile-promotion-fragments.component.html',
  imports:[CommonModule, TranslateModule, RouterModule, SanitizerModule, MobilePromotionFragmentComponent],
  standalone:true
})
export class MobilePromotionFragmentsComponent extends BasePromotionFragments {

  @Input() promotionFragment:PromotionFragment;

}
