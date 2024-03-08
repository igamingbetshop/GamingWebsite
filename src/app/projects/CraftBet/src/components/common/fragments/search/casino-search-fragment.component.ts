import {Component, Input} from '@angular/core';
import {FragmentData} from "@core/models";
import {Subject} from "rxjs";
import {Methods} from "@core/enums";
import {debounceTime, take} from "rxjs/operators";
import {BaseApiService} from "@core/services/api/base-api.service";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {ClickOutsideModule} from "ng-click-outside";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {FontAwesomeIcons} from "../../../../../../../@theme/font-awsome/font-awesome-icons";

@Component({
    selector: 'casino-search-fragment',
    standalone:true,
    imports:[CommonModule, TranslateModule, FormsModule, ClickOutsideModule, FontAwesomeIcons],
    templateUrl: './casino-search-fragment.component.html',
    styleUrls: ['./casino-search-fragment.component.scss'],
})
export class CasinoSearchFragmentComponent
{
    @Input('fragmentConfig') fragmentConfig:FragmentData;
    pattern = '';
    readonly patternSbj:Subject<string> = new Subject<string>();
    onPatternChange$ = this.patternSbj.asObservable();
    showAutocomplete = false;
    termMinlength = 3;
    items: any[] = [];
    providers: any[] = [];
    categories: any[] = [];

    constructor(private apiService: BaseApiService, private router:Router)
    {
        this.onPatternChange$.pipe(debounceTime(500)).subscribe(pattern => {
            if(pattern && pattern.trim().length >= this.termMinlength)
            {
                this.apiService.apiRequest({
                    Pattern: this.pattern.trim()
                }, undefined, Methods.SEARCH_CONTENT_INFO, false).pipe(take(1)).subscribe(
                    data => {
                        if (data.ResponseCode === 0)
                        {
                            this.items = data.ResponseObject.Games || [];
                            this.providers = data.ResponseObject.Providers || [];
                            this.categories = data.ResponseObject.Categories || [];
                            this.openAutoComplete();
                        }
                    }
                )
            }
        });
    }

    openGame(game)
    {
        this.router.navigate([`/casino/all-games/${game.Id}/real/2`]).then(() => {
            window.scrollTo({
                top: 0
            });
        });
    }

    openProvider(provider:any)
    {
        this.router.navigateByUrl(`/casino/all-games?providers=${provider.Id}`).then(() => {
            window.scrollTo({
                top: 0
            });
        });
    }

    openCategory(category:any)
    {
        this.router.navigateByUrl(`/casino/${category.Id}`).then(() => {
            window.scrollTo({
                top: 0
            });
        });
    }

    openAutoComplete() {
        this.showAutocomplete = this.pattern && (this.pattern.trim().length >= this.termMinlength) && !!this.items.length;
    }

    closeAutoComplete() {
        this.showAutocomplete = false;
    }
}
