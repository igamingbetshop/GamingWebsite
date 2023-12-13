import {Component, Injector} from '@angular/core';
import {BaseProductsListComponent} from "../../../../../../@theme/components/common/base-products-list/base-products-list.component";

@Component({
    selector: 'app-mobile-products',
    templateUrl: './mobile-products.component.html'
})
export class MobileProductsComponent extends BaseProductsListComponent {

    constructor(public injector: Injector) {
        super(injector);
    }

   ngOnInit() {
       super.ngOnInit();
   }

    public openGame(item) {
        this.localStorageService.add("opened-url", this.router.url);
        this.savedData.isGameOpenFromInternal.next(true);
        this.router.navigateByUrl('/' + this.currentUrl + item.Href + '&redirect=true');
    }
}
