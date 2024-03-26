import {Component, Injector, Input, ViewEncapsulation} from '@angular/core';
import {BaseCasinoCategory} from "../../../../../../../@theme/fragments/casino/category/base-casino-category";
import {AppConfirmComponent} from "../../app-confirm/app-confirm.component";
import {Fragment} from "../../../../../../../@core/models";
import {StateService} from "../../../../../../../@core/services/app/state.service";
import {FragmentSource, FragmentType, FragmentTypes} from "../../../../../../../@core/enums";
import {getFragmentsByType, getParsedUrl} from "../../../../../../../@core/utils";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'casino-category',
    templateUrl: './casino-category.component.html',
    styleUrls: ['./casino-category.component.scss'],
    encapsulation:ViewEncapsulation.None
})
export class CasinoCategoryComponent extends BaseCasinoCategory
{
    @Input('position') position:string;
    fragments: {[key: string]: Fragment};

    hasFilterBox:boolean;

    constructor(protected injector:Injector,
                private stateService:StateService,
                private dialog:MatDialog)
    {
        super(injector);
    }

    ngOnInit()
    {
        super.ngOnInit();
        const block = this.configService.defaultOptions[FragmentSource.Web];
        this.fragments = getFragmentsByType(block, this.position, FragmentType.Category);
        this.hasFilterBox =  this.fragments[FragmentTypes.Menus]?.Items.length > 0 || this.fragments[FragmentTypes.Providers]?.Items.length > 0;
    }

    backFromSearch()
    {
        this.casinoFilterService.clearFilter();
        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: { pattern: null},
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

    public openGame(typeId, type, openMode = 1)
    {
        super.openGame(typeId, type, openMode);

        if (type == 'real' && !this.userLogged.isAuthenticated)
        {
            const url = this.router.url + '/' + typeId  + '/' + type + '/' + openMode;
            localStorage.setItem('product-url', url);

            const dialogRef = this.dialog.open(AppConfirmComponent, {data:{ title: 'open_login',
                    message: true}});
            dialogRef.afterClosed().subscribe(result => {
                if(!result)
                    localStorage.removeItem('product-url');
            });
        } else {
            const result = getParsedUrl(this.router.url);
            this.router.navigate([this.router.url.split('?')[0], typeId, type, openMode], {queryParams:result || null});
        }
    }
    scrollToTop(position = 0)
    {
        window.scrollTo({
            top: position,
            behavior: "smooth"
        });
    }
}
