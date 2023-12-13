import {Component, Injector} from '@angular/core';
import {AppCommonFilterProductsComponent} from '../../common/app-common-filter-products/app-common-filter-products.component';
import {AppConfirmComponent} from "../app-confirm/app-confirm.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-app-filter-game',
  templateUrl: './app-filter-game.component.html',
  styleUrls: ['./app-filter-game.component.scss']
})
export class AppFilterGameComponent extends AppCommonFilterProductsComponent {

  public currentUrl: string;

  constructor(public injector: Injector, public router: Router) {
    super(injector);
    this.currentUrl = router.url;
  }

  public openGame(productId, type, openMode = 2) {
    localStorage.setItem('opened-url', this.router.url);
    if(type == 'real' && !this.isLogined) {
      this.simpleModalService.addModal(AppConfirmComponent, {
        title: 'open_login',
        message: true
      }).subscribe((isConfirmed) => {
        if(!isConfirmed)
          localStorage.removeItem('product-url');
      });
    }else {
      this.router.navigate([this.currentUrl, productId,  type, openMode]);
    }
  }



}
