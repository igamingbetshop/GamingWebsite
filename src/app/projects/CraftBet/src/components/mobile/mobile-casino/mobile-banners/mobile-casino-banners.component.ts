import { Component, Injector } from '@angular/core';
import { BaseBanners } from '../../../../../../../@theme/fragments/banners/base-banners';
@Component({
    selector: 'app-mobile-casino-banners',
    templateUrl: './mobile-casino-banners.component.html',
    styleUrls: ['./mobile-casino-banners.component.scss']
})
export class MobileCasinoBannersComponent extends BaseBanners {
    constructor(
        protected injector: Injector
    ) {
        super(injector);
    }

    onLoginOpen() {
        this.router.navigate(['/login']).then(() => {});
    }

    onRegisterOpen() {
        this.router.navigate(['/signup']).then(() => {});
    }

}

