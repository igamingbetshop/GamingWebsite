import {Component, Injector} from '@angular/core';
import {BaseNewsComponent} from "../../../../../../../@theme/components/common/news/base-news.component";
import {LayoutService} from "../../../../../../../@core/services/app/layout.service";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MobileCurrentNewsComponent} from "../mobile-current-news/mobile-current-news.component";

@Component({
  selector: 'mobile-all-news',
  templateUrl: './mobile-all-news.component.html',
  standalone:true,
  imports:[CommonModule, RouterModule, TranslateModule, MobileCurrentNewsComponent],
})
export class MobileAllNewsComponent extends BaseNewsComponent {

  constructor(public injector: Injector, public layoutService:LayoutService) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
