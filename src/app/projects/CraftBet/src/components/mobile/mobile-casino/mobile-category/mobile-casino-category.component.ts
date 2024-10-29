import { Component, Injector, Input } from '@angular/core';
import { BaseCasinoCategory } from '../../../../../../../@theme/fragments/casino/category/base-casino-category';
import { Fragment } from '../../../../../../../@core/models';
import { StateService } from '../../../../../../../@core/services/app/state.service';
import { FragmentSource, FragmentType } from '../../../../../../../@core/enums';
import { getFragmentsByType } from '../../../../../../../@core/utils';

@Component({
    selector: 'app-mobile-casino-category',
    templateUrl: './mobile-casino-category.component.html',
    styleUrls: ['./mobile-casino-category.component.scss']
})
export class MobileCasinoCategoryComponent extends BaseCasinoCategory {
    @Input('position') position: string;
    fragments: { [key: string]: Fragment };
    selectedProductId: number;

    constructor(
        protected injector: Injector,
        private stateService: StateService
    ) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        const block = this.configService.defaultOptions[FragmentSource.Mobile];
        this.fragments = getFragmentsByType(block, this.position, FragmentType.Category, this.userLogged);
    }

    backFromSearch() {
        this.casinoFilterService.clearFilter();
        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: { pattern: null, providers:null},
                skipLocationChange:false,
                queryParamsHandling:'merge'
            }).then(() => {
            if(this.router.url == `/${this.position}/all-games`)
            {
                this.stateService.changeCategoriesSearchViewState(false);
            }
            else
            {
                this.router.navigate([`/${this.position}/all-games`]);
            }
        });
    }

    public openGame(typeId, type, openType = 1) {

        localStorage.setItem('opened-url', this.router.url);
        const url = this.router.url + '/' + typeId + '/' + type + '/' + openType;

        this.router.navigate([this.router.url.split('?')[0], typeId, type, openType], {queryParams: {redirect: true}}).then(data => {
            localStorage.setItem('product-url', url);
        });

    }

    scrollToTop(position = 0)
    {
        window.scrollTo({
            top: position,
            behavior: "smooth"
        });
    }
}
