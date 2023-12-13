import {Component, Input, OnInit} from '@angular/core';
import {PromotionFragment} from "../../../../../../../@core/models";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'promotion-fragment',
  templateUrl: './promotion-fragment.component.html',
  imports:[CommonModule,TranslateModule, RouterModule],
  standalone:true
})
export class PromotionFragmentComponent  implements OnInit{

  @Input() promotionFragment:PromotionFragment;



  constructor()
  {
  }

  ngOnInit()
  {

  }
}
