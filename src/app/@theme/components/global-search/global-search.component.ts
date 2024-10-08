import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal} from "@angular/core";
import {DropdownDirectiveModule} from "../../directives/dropdown/dropdown-directive.module";
import {TranslateModule} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Subject} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {debounceTime, take} from "rxjs/operators";
import {BaseApiService} from "@core/services/api/base-api.service";
import {Methods} from "@core/enums";
import {environment} from "../../../../environments/environment";
import {DeviceDetectorService} from "ngx-device-detector";
import {Router} from "@angular/router";
import {LocalStorageService} from "@core/services";

type Game = {Id:number, N:string, ImageUrl:string};

@Component({
    selector: 'global-search',
    templateUrl: './global-search.component.html',
    styleUrls: ['./global-search.component.scss'],
    standalone: true,
    imports: [
        DropdownDirectiveModule,
        TranslateModule
    ],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class GlobalSearchComponent implements OnInit {

    dialogRef = inject(MatDialogRef<GlobalSearchComponent>, {optional:true});
    dialogData = inject(MAT_DIALOG_DATA, {optional:true});
    #apiService = inject(BaseApiService);
    #deviceDetector = inject(DeviceDetectorService);
    #router = inject(Router);
    #localStorageService = inject(LocalStorageService);
    isModal = !!this.dialogRef;
    options = signal<string[]>(["Casino", "Sports"]);
    selectedOption = signal<string>(this.options()[0]);

    recentSearches = signal<string[]>(this.#localStorageService.get("recent-searches") || []);
    noRecentSearches = computed(() => {
        return this.recentSearches().length === 0;
    });
    pattern = signal<string>("");
    loading = signal(false);
    #patternSbj:Subject<string> = new Subject<string>();
    games = signal<Game[]>([]);
    noResult = signal(false);

    constructor()
    {
        this.#patternSbj.pipe(takeUntilDestroyed(), debounceTime(500)).subscribe(value => {

            if(value.length > 2)
            {
                this.loading.set(true);
                this.#apiService.apiRequest({
                    Pattern: this.pattern()
                }, undefined, Methods.SEARCH_CONTENT_INFO, false).pipe(take(1)).subscribe(
                    data => {
                        if (data.ResponseCode === 0)
                        {
                            let games:any[] = data.ResponseObject.Games || [];
                            games.forEach(g => {
                                g.ImageUrl = (g["I"] && g["I"].startsWith('http')) ? g["I"] : 'https://resources.' + environment.hostName + '/products/' + g["I"];
                                return g;
                            })
                            this.games.set(games);
                            if(this.games().length)
                            {
                                let recentSearches = this.recentSearches();
                                const index = recentSearches.indexOf(this.pattern());
                                if(index > -1)
                                {
                                    recentSearches.splice(index, 1);
                                    recentSearches.unshift(this.pattern());
                                }
                                else
                                {
                                    recentSearches = [this.pattern(),...recentSearches.slice(0, 4)];
                                }
                                this.setRecentSearches(recentSearches);
                            }
                            else this.noResult.set(true);
                        }
                        this.loading.set(false);
                    }
                )
            }
            else{
                this.noResult.set(false);
                this.games.set([]);
            }
        });
    }

    setRecentSearches(value:string[])
    {
        this.recentSearches.update(value =>  [...value]);
        this.#localStorageService.add("recent-searches", value);
    }

    updatePattern(event: Event)
    {
        const inputElement = event.target as HTMLInputElement;
        this.setPattern(inputElement.value);
    }

    setPattern(pattern:string)
    {
        this.pattern.set(pattern);
        this.#patternSbj.next(pattern);
    }

    selectOption(option:string)
    {
        this.selectedOption.set(option);
    }

    removeRecent(index:number)
    {
        const recentSearches = this.recentSearches();
        recentSearches.splice(index, 1);
        this.setRecentSearches(recentSearches);
    }

    openGame(game:Game)
    {
        const url = this.#deviceDetector.isDesktop() ? `/casino/all-games/${game.Id}/real/2` : `/casino/all-games/${game.Id}/real/1?redirect=true`
        this.#router.navigateByUrl(url).then(() => {
            window.scrollTo({
                top: 0
            });
        });
    }

    focusIn()
    {
        this.recentSearches.set(this.#localStorageService.get("recent-searches") || []);
    }

    close()
    {
        this.dialogRef.close();
    }

    ngOnInit() {

    }
}
