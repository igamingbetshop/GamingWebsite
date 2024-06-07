import {Component, inject, input, OnInit} from '@angular/core';
import {SanitizerModule} from "../../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {TranslateModule} from "@ngx-translate/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Promotion} from "@core/models";

@Component({
  selector: 'promotion-content',
  standalone: true,
  imports: [SanitizerModule, TranslateModule],
  templateUrl: './promotion-content.component.html',
  styleUrls: ['./promotion-content.component.scss']
})
export class PromotionContentComponent implements OnInit{
 promotion = input<any>();
 data = inject(MAT_DIALOG_DATA, {optional:true});
 promotionData:Promotion;

 ngOnInit()
 {
   this.promotionData = this.data || this.promotion();
 }
}
