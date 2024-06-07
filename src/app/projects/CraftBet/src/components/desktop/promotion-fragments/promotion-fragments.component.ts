import {Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BasePromotionFragments} from "../../../../../../@theme/components/common/promotions/base-promotion-fragments";
import {PromotionFragmentComponent} from "../fragments/fragment-promotions/promotion-fragment.component";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {SanitizerModule} from "../../../../../../@theme/pipes/sanitizer/sanitizer.module";
import {TranslateModule} from "@ngx-translate/core";
import {RouterModule} from "@angular/router";
import {AppConfirmComponent} from "../app-confirm/app-confirm.component";
import {MobilePromotionFragmentComponent} from "../../mobile/mobile-promotion/mobile-promotion-fragment.component";
import {PromotionContentComponent} from "./promotion-content/promotion-content.component";
import {Promotion} from "@core/models";

@Component({
  selector: 'app-promotion-fragments',
  standalone: true,
  imports: [CommonModule, PromotionFragmentComponent, SlickCarouselModule, SanitizerModule, TranslateModule, RouterModule, MobilePromotionFragmentComponent, PromotionContentComponent],
  templateUrl: './promotion-fragments.component.html',
  styleUrls: ['./promotion-fragments.component.scss']
})
export class PromotionFragmentsComponent extends BasePromotionFragments{
  @ViewChild("sliderComponent") sliderComponent;
  public slideConfig = {
    infinite: true,
    slidesToShow: 4,
    dots: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
    speed: 1200,
    vertical: true,
    arrows: true,
  };

  ngOnInit() {
    super.ngOnInit();
  }

  public getBonuses()
  {
    if(!this.loginService.isAuthenticated) {
      localStorage.setItem('product-url', this.router.url);
      this.dialog.open(AppConfirmComponent,{data:{title: 'open_login',message: true}});
    } else {
      this.router.navigate(['/user/' + (this.configService.defaultOptions.AccountTemplateType == undefined ? '1' : this.configService.defaultOptions.AccountTemplateType) + '/' + 'bonuses']);
    }
  }

  onSelectPromotion(promotion:Promotion, fragment:any)
  {
    if(fragment.Style?.popup)
    {
      this.getPromotionById(promotion.Id).subscribe(data => {
        promotion.Content = data.content;
        promotion.Title = data.title;
        promotion.Description = data.description;
        promotion.Id = data.id;
        promotion.Date = data.date;
        promotion.ImageName = data.image;
        promotion.Type = data.type;
        this.dialog.open(PromotionContentComponent, {data:promotion});
      });
    }
    else
    {
      this.router.navigate(["/promotions"], {queryParams:{id:promotion.Id}});
    }


  }

  ngOnDestroy()
  {
    super.ngOnDestroy();
    localStorage.removeItem('product-url');
  }
}
