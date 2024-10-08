import {OnInit, Injector, Directive, OnDestroy, inject, signal} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {Fragment, FragmentData} from "../../../../../../@core/models";
import {ConfigService, SaveData} from "../../../../../../@core/services";
import {getFragmentsByType} from "../../../../../../@core/utils";
import {Subscription, take} from "rxjs";
import {CasinoFilterService} from "../../../../../../@core/services/app/casino-filter.service";
import {StateService} from "../../../../../../@core/services/app/state.service";
import {CasinoProvidersService} from "../../../../../../@theme/fragments/casino/providers/casino-providers.service";
import {BaseApiService} from "../../../../../../@core/services/api/base-api.service";
import {MatDialog} from "@angular/material/dialog";
import {filter, skip} from "rxjs/operators";
import {FragmentPositions} from "@core/enums";
type LeftMenuFragmentType = "Menus" | "Providers";
type LeftMenuFragment = {
  type:LeftMenuFragmentType;
  fragmentData:FragmentData;
}
@Directive()
export class BaseCasino implements OnInit, OnDestroy {

  config: ConfigService;
  fragmentKey: string;
  fragments: {[key: string]: Fragment}
  position:string;
  leftMenuFragment = signal<LeftMenuFragment>(null);
  private readonly route: ActivatedRoute;
  public readonly router: Router;
  private casinoFilterService:CasinoFilterService;
  private casinoProvidersService:CasinoProvidersService;
  stateService:StateService;
  dialog = inject(MatDialog);
  public baseApiService:BaseApiService;
  private subscribedForFilter:boolean;

  private subscription:Subscription = new Subscription();
  private savedData:SaveData;

  constructor(protected injector: Injector)
  {
    this.config = injector.get(ConfigService);
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.casinoFilterService = injector.get(CasinoFilterService);
    this.casinoProvidersService = injector.get(CasinoProvidersService);
    this.stateService = injector.get(StateService);
    this.baseApiService = injector.get(BaseApiService);
    this.savedData = injector.get(SaveData);
  }

  ngOnInit()
  {
    const block = this.config.defaultOptions[this.fragmentKey];
    this.position = this.getMappedPosition(this.route.snapshot.data['position']);

    this.fragments = getFragmentsByType(block, this.position);

    this.checkLeftMenu();
    this.#checkCategory(this.route.snapshot.params);
    this.subscription.add(this.route.queryParams.subscribe(params =>
    {
      if(params)
      {
        if(params.pattern)
          this.casinoFilterService.setPattern(params.pattern);
        if(params.providers)
        {
          const providerIds = params.providers.split(",");

          this.casinoProvidersService.getProviders().pipe(take(1)).subscribe(allProviders => {
              const providers = allProviders.filter(provider => providerIds.includes(provider.Id.toString()));
              if(providers.length)
                this.casinoFilterService.addProviders(providers);
              this.subscribeForFilter();
          });
        }
        else
        {
          this.subscribeForFilter();
        }
      }
      else
      {
        this.subscribeForFilter();
      }

    }));
    this.subscription.add(this.route.params.pipe(skip(1)).subscribe(params =>
    {
      if(params.groupId)
      {
        /*For the group type, this reloads the same component.*/
        this.router.navigate(['casino/all-games']).then(() => {
          this.router.navigate(['/group', params.groupId]);
        });
      }
      else
      {
        this.#checkCategory(params);
      }
    }));
    this.router.events
        .pipe(
            filter( event =>event instanceof NavigationStart)
        )
        .subscribe(
            (event:NavigationStart) => {
              if(!event.url.startsWith("/casino") && !event.url.startsWith("/livecasino"))
              {
                this.casinoFilterService.clearFilter();
                this.savedData.setCasinoGames(this.savedData.deleteCasinoGames());
              }
            }
        )
  }

  private subscribeForFilter()
  {
    if(!this.subscribedForFilter)
    {
      this.subscribedForFilter = true;
      this.subscription.add(this.casinoFilterService.onFilterChange$.subscribe(filter => {
        if(filter)
        {
          if((filter.categoryId !== null && filter.categoryId >= -1) || filter.providers.length > 0 || filter.gamePattern)
          {
            this.stateService.changeCategoriesSearchViewState(true);
          }
          else
          {
            this.stateService.changeCategoriesSearchViewState(false);
          }
          this.router.navigate(
              [],
              {
                relativeTo: this.route,
                queryParams: { pattern: filter.gamePattern || null, providers: filter.providers && filter.providers.length ? filter.providers.map(p => p.Id).toString() : null}
              });
        }
      }));
    }

  }

  private checkLeftMenu()
  {
    this.findLeftMenuIfNotExist("Menus");
    this.findLeftMenuIfNotExist("Providers");
  }

  private findLeftMenuIfNotExist(type:LeftMenuFragmentType)
  {
    if(this.leftMenuFragment())
      return;

    if(Object.hasOwn(this.fragments, type))
    {
      const items = this.fragments[type].Items;
      for(let i = 0; i < items.length; i++)
      {
        if(items[i].Config?.type === "left-menu")
        {
          this.leftMenuFragment.set({type:type, fragmentData:items[i]});
          items.splice(i, 1);
        }
      }
    }
  }

  private getMappedPosition(position:string):string
  {
    const params = this.route.snapshot.params;

    switch (position)
    {
      case FragmentPositions.Category:
        return params.categoryId ? `${position}_${params.categoryId}` : position;

      case FragmentPositions.Group:
        return params.groupId ? `${position}_${params.groupId}` : position;

      default:
        return position;
    }
  }

  #checkCategory(params:any)
  {
    let categoryId:any;
    if(params.categoryId || params.categoryId == 0)
      categoryId = params.categoryId;
    else if(params.typeId)
      categoryId = params.typeId;
    this.casinoFilterService.changeCategoryFromUrl(categoryId);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
    this.stateService.changeProvidersPopupState(false);
  }

}
