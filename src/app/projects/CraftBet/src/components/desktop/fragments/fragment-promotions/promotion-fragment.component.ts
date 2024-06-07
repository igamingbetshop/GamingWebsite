import {Component, Input, output} from '@angular/core';
import {Promotion, PromotionFragment} from "../../../../../../../@core/models";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'promotion-fragment',
  templateUrl: './promotion-fragment.component.html',
  imports:[CommonModule,TranslateModule, RouterModule],
  standalone:true
})
export class PromotionFragmentComponent{

  @Input() promotionFragment:PromotionFragment;
  onSelect = output<Promotion>();

  selectPromotion(item:any)
  {
    this.onSelect.emit(item);
  }

}
