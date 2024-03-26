import {OnInit, Injector, Directive, OnDestroy, inject} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {Fragment} from "../../../../../../@core/models";
import {ConfigService, SaveData} from "../../../../../../@core/services";
import {getFragmentsByType} from "../../../../../../@core/utils";
import {Subscription, take} from "rxjs";
import {CasinoFilterService} from "../../../../../../@core/services/app/casino-filter.service";
import {StateService} from "../../../../../../@core/services/app/state.service";
import {CasinoProvidersService} from "../../desktop/app-casino/providers/casino-providers.service";
import {BaseApiService} from "../../../../../../@core/services/api/base-api.service";
import {MatDialog} from "@angular/material/dialog";
import {filter} from "rxjs/operators";

@Directive()
export class BaseCasino implements OnInit, OnDestroy {

  config: ConfigService;
  fragmentKey: string;
  fragments: {[key: string]: Fragment}
  position:string;

  private readonly route: ActivatedRoute;
  public readonly router: Router;
  private casinoFilterService:CasinoFilterService;
  private casinoProvidersService:CasinoProvidersService;
  private stateService:StateService;
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
    this.position = this.route.snapshot.data['position'];

    this.fragments = getFragmentsByType(block, this.position);
    this.subscription.add(this.route.queryParams.subscribe(params =>
    {
      if(params)
      {
        if(params.pattern)
          this.casinoFilterService.setPatter(params.pattern);
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
    this.subscription.add(this.route.params.subscribe(params =>
    {
        this.casinoFilterService.changeCategoryFromUrl(params.typeId);
    }));
    this.router.events
        .pipe(
            filter( event =>event instanceof NavigationStart)
        )
        .subscribe(
            (event:NavigationStart) => {
              if(!event.url.startsWith("/casino"))
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

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
    this.stateService.changeProvidersPopupState(false);
  }

}
