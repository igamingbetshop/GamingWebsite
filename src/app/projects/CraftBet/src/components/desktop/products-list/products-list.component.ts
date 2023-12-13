import {Component, Injector} from '@angular/core';
import {BaseProductsListComponent} from "../../../../../../@theme/components/common/base-products-list/base-products-list.component";
import {AppConfirmComponent} from "../app-confirm/app-confirm.component";

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html'
})
export class ProductsListComponent extends BaseProductsListComponent {

    constructor(public injector: Injector) {
        super(injector)
    }

  ngOnInit() {
      super.ngOnInit();
  }

    public openGame(url:string)
    {
        // localStorage.setItem('product-url', this.router.url);
        if(!this.loginService.isAuthenticated) {
            this.simpleModalService.addModal(AppConfirmComponent, {
                title: 'open_login',
                message: true
            }).subscribe((isConfirmed) => {});
        } else {
            if (url.includes('/parent')) {
                let remainingUrl = url.replace('/parent', '');
                this.router.navigateByUrl(remainingUrl);
            } else {
                this.router.navigate(['/' + this.currentUrl + url]);
            }
        }
    }

}
