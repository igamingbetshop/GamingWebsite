import { Component, Injector } from '@angular/core';
import { BaseBanners } from '../../../../../../../@theme/fragments/banners/base-banners';

@Component({
    selector: 'app-mobile-home-banners',
    templateUrl: './home-banners.component.html',
    styleUrls: ['./home-banners.component.scss']
})
export class HomeBannersComponent extends BaseBanners {

    constructor(protected injector: Injector) {
        super(injector);
    }

    onLoginOpen() {
        this.router.navigate(['/login']).then(() => {});
    }

    onRegisterOpen() {
        this.router.navigate(['/signup']).then(() => {});
    }

}

