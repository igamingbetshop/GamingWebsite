import {Component, Injector} from '@angular/core';
import {AppCommonFilterProductsComponent} from "../../common/app-common-filter-products/app-common-filter-products.component";
import {Router} from "@angular/router";
import {LocalStorageService, SaveData} from "@core/services";
import {LayoutService} from "@core/services/app/layout.service";

@Component({
  selector: 'app-mobile-filter-game',
  templateUrl: './mobile-filter-game.component.html',
  styleUrls: ['./mobile-filter-game.component.scss']
})
export class MobileFilterGameComponent extends AppCommonFilterProductsComponent {
  public currentUrl: string;
  public slideConfig = {
    rows: 1,
    dots: false,
    enabled: false,
    autoplay: true,
    arrows: false,
    vertical: false,
    infinite: true,
    speed: 400,
    slidesPerRow: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  public selectedProductId: any;

  constructor(public injector: Injector,
              public router: Router,
              private savedData: SaveData,
              private localStorageService: LocalStorageService,
              public layoutService: LayoutService) {
    super(injector);
    this.currentUrl = router.url;
  }

  public openGame(typeId, type, routeName) {
    localStorage.setItem('opened-url', this.router.url);
    this.savedData.isGameOpenFromInternal.next(true);
    this.router.navigate([this.currentUrl, typeId, type], {queryParams: {redirect: true}}).then(data => {
      localStorage.setItem('product-url', this.router.url);
    });
  }

  chooseGame(item) {
    this.selectedProductId = item.productId;
  }

}
