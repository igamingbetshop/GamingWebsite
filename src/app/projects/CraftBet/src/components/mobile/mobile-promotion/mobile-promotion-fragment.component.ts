import {Component,Input, OnInit} from '@angular/core';
import {PromotionFragment} from "../../../../../../@core/models";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {LayoutService} from "../../../../../../@core/services/app/layout.service";

@Component({
  selector: 'mobile-promotion-fragment',
  templateUrl: './mobile-promotion-fragment.component.html',
  imports:[CommonModule, RouterModule, TranslateModule],
  standalone:true
})
export class MobilePromotionFragmentComponent implements OnInit{

  @Input() promotionFragment:PromotionFragment;
  constructor(public layoutService:LayoutService) {

  }
  ngOnInit()
  {

  }

}
